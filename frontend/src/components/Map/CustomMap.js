import React, { useRef, useEffect, useState } from "react";
import { fetchEvents } from '../../services/Api';
import { useYMaps } from "@pbe/react-yandex-maps";

export const CustomMap = () => {
  const [events, setEvents] = useState([]); // Хук для хранения данных событий
  const [organizations, setOrganizations] = useState([]); // Хук для хранения данных событий
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
  const generateBalloonContent = (id, name, address) => {
    return (
      <>
        <strong>{name}</strong>
        <p>{address}</p>
        <a href={`evets/${id}`}>Открыть мероприятие</a>
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
    

    loadEvents();

    return () => initMap.destroy();
  }, [ymaps]);

  useEffect(() => {
    if (!map || !ymaps || loading || events.length === 0) return; // Проверяем, что карта загружена и данные событий тоже

    const objectManager = new ymaps.ObjectManager({
      clusterize: true,
      gridSize: 32,
      clusterDisableClickZoom: true,
    });

    events.forEach((item, index) => {
      ymaps.geocode(item.address).then((result) => {
        // Получаем координаты адреса с помощью geocode
        //const coords = result.geoObjects.get(0).geometry.getCoordinates();      
        const coords = [item.point_x, item.point_y];      
        const object = {
          type: "Feature",
          id: index,
          geometry: {
            type: "Point",
            coordinates: coords,
          },
          properties: {
            balloonContent: generateBalloonContent(item.id, item.title, item.address), // правильное свойство
            hintContent: item.title,
          },
          options: {
            preset: "islands#blueStretchyIcon",
          },
        };
        objectManager.add(object);
      });
    });

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

    map.geoObjects.add(objectManager);

    map.controls.add(new ymaps.control.ZoomControl());
    map.controls.add(new ymaps.control.GeolocationControl());
  }, [map, ymaps, events, loading]); // Обновляем карту только после загрузки событий

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
