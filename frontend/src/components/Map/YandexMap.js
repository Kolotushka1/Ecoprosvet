
import React, { useRef, useEffect, useState } from "react";
import { fetchEvents, fetchOrganizations } from '../../services/Api';
import { useYMaps } from "@pbe/react-yandex-maps";
import { YMaps } from '@pbe/react-yandex-maps'
import { YMaps_API_KEY } from "../../utils/constants";

const CustomMap = () => {
  const [events, setEvents] = useState([]); // Хук для хранения данных событий
  const [organizations, setOrganizations] = useState([]); // Хук для хранения данных организаций
  const [loading, setLoading] = useState(true); // Хук для состояния загрузки
  const [error, setError] = useState(null); // Хук для состояния ошибок

  const mapRef = useRef(null);
  const ymaps = useYMaps([
    "Map", 
    "geocode", 
    "Placemark", 
    "ObjectManager", 
    "control.FullscreenControl",
    "control.ZoomControl",
    "control.GeolocationControl",
  ]);

  const [map, setMap] = useState(null);
  const [info, setInfo] = useState({ visible: false, content: "", x: 0, y: 0 });

  // Функция для генерации контента для баллона
  const generateBalloonContent = (id, name, address, tags) => {
    return (
      <>
        <strong>{name}</strong>
        <p>{address}</p>
        <p>{tags.join(' ')}</p>
        <a href={`evets/${id}`}>Открыть мероприятие</a>

      </>
    );
  };
  const generateBalloonContentForOrganizations = (name, address) => {
    return (
      <>
        <strong>{name}</strong>
        <p>{address}</p>
      </>
    );
  };

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    const initMap = new ymaps.Map(mapRef.current, {
      center: [55.76, 37.64],
      zoom: 10,
      controls: [],
    });
    setMap(initMap);

    const loadEvents = async () => {
      try {
        const eventsData = await fetchEvents(); // Получаем данные с API
        setEvents(eventsData); // Устанавливаем данные в состояние
        console.log(eventsData);
      } catch (error) {
        setError(error.message); // Устанавливаем ошибку
        console.log(error.message);
      } finally {
        setLoading(false); // Останавливаем состояние загрузки
      }
    };
    const loadOrganization = async () => {
      try {
        const organizationsData = await fetchOrganizations(); // Получаем данные с API
        setOrganizations(organizationsData); // Устанавливаем данные в состояние
        console.log(organizationsData);
      } catch (error) {
        setError(error.message); // Устанавливаем ошибку
        console.log(error.message);
      } finally {
        setLoading(false); // Останавливаем состояние загрузки
      }
    };

    loadEvents();
    loadOrganization();
    return () => initMap.destroy();
  }, [ymaps]);

  useEffect(() => {
    if (!map || !ymaps || loading || events.length === 0 || organizations.length === 0) return; // Проверяем, что карта загружена и данные событий тоже

    const objectManager = new ymaps.ObjectManager({
      clusterize: true,
      gridSize: 32,
      clusterDisableClickZoom: true,
    });

    const loadPoints = async () => {
      try {
        // Создаем массив промисов для организаций
        const organizationPromises = organizations
          .filter(item => item.is_eco_centre)
          .filter(item => item.is_active)
          .map((item, index) =>
            ymaps.geocode(item.address).then((result) => {
              const coords = [item.pointx, item.pointy];
              return {
                type: "Feature",
                id: `org_${index}`,
                geometry: {
                  type: "Point",
                  coordinates: coords,
                },
                properties: {
                  balloonContent: generateBalloonContentForOrganizations(item.organization_name, item.address),
                  hintContent: item.title,
                },
                options: {
                  preset: "islands#greenIcon",
                },
              };
            })
          );


        // Создаем массив промисов для событий
        const eventPromises = events.map((item, index) =>
          ymaps.geocode(item.address).then((result) => {
            const coords = [item.point_x, item.point_y];
            return {
              type: "Feature",
              id: `event_${index}`,
              geometry: {
                type: "Point",
                coordinates: coords,
              },
              properties: {
                balloonContent: generateBalloonContent(item.id, item.title, item.address, item.tags),
                hintContent: item.title,
              },
              options: {
                preset: "islands#blueIcon",
              },
            };
          })
        );

        // Дожидаемся всех промисов
        const allPoints = await Promise.all([...organizationPromises, ...eventPromises]);

        // Добавляем все точки на карту
        objectManager.add(allPoints);
        map.geoObjects.add(objectManager);
      } catch (error) {
        console.error('Ошибка при загрузке точек на карту:', error);
      }
    };

    loadPoints();

    objectManager.objects.events.add("click", (e) => {
      const objectId = e.get("objectId");
      const object = objectManager.objects.getById(objectId);

      if (object) {
        const coords = object.geometry.coordinates;
        const pageCoords = map.converter.globalToPage(coords);

        setInfo({
          visible: true,
          content: object.properties.balloonContent,
        });
      }
    });

    map.controls.add(new ymaps.control.ZoomControl());
    map.controls.add(new ymaps.control.GeolocationControl());
  }, [map, ymaps, events, organizations, loading]); // Обновляем карту только после загрузки данных

  return (
    <div style={{ position: "relative" }}>
      <div ref={mapRef} style={{ width: "100%", height: "500px"}} />
      {info.visible && (
        <div className="CardData"
          style={{
            position: "absolute",
            top: "0",
            left: "75%",
            height: "500px",
            width: "25%",
            background: "white",
            border: "1px solid black",
            padding: "10px",
          }}
        >
          {info.content}
        </div>
      )}
    </div>
  );
};

export const YandexMap = () => {
  return(
      <YMaps query={{ apikey: `${YMaps_API_KEY}` }}>
        <CustomMap />
      </YMaps>
  )
}
