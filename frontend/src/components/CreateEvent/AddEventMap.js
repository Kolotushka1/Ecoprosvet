import React, { useRef, useState, useEffect } from "react";
import { YMaps, useYMaps } from "@pbe/react-yandex-maps";
import { YMaps_API_KEY } from "../../utils/constants";

const CustomAddEventMap = ({ address, onCoordsChange }) => {
  const mapRef = useRef(null);
  const ymaps = useYMaps(["Map", "geocode", "Placemark", "control.ZoomControl", "control.GeolocationControl"]);
  const [map, setMap] = useState(null);
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckAddress = () => {
    if (!address) {
      alert("Введите адрес!");
      return;
    }
    setLoading(true);

    ymaps.geocode(address).then((res) => {
      const firstGeoObject = res.geoObjects.get(0);
      const coordinates = firstGeoObject.geometry.getCoordinates();

      setCoords(coordinates);
      onCoordsChange(coordinates[0], coordinates[1]); 
      map.setCenter(coordinates, 14);
      setLoading(false);
    }).catch(() => {
      alert("Не удалось найти адрес");
      setLoading(false);
    });
  };

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    const initMap = new ymaps.Map(mapRef.current, {
      center: [55.76, 37.64], // Default center
      zoom: 10,
      controls: [],
    });
    setMap(initMap);

    return () => initMap.destroy();
  }, [ymaps]);

  useEffect(() => {
    if (!map || !coords) return;

    const placemark = new ymaps.Placemark(coords, {
      balloonContent: address,
      hintContent: address,
    }, {
      preset: "islands#greenDotIcon",
    });

    map.geoObjects.add(placemark);
  }, [map, coords, address]);

  return (
    <div style={{ position: "relative" }}>
      <div>
        <h3>Добавление мероприятия</h3>
        <form>
          <button type="button" onClick={handleCheckAddress} style={{ padding: "10px 15px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>
            {loading ? "Загрузка..." : "Проверить адрес"}
          </button>
        </form>
      </div>
      <div ref={mapRef} style={{ width: "100%", height: "500px" }} />
    </div>
  );
};

const AddEventMap = ({ address, onCoordsChange }) => (
  <YMaps query={{ apikey: YMaps_API_KEY }}>
    <CustomAddEventMap address={address} onCoordsChange={onCoordsChange} />
  </YMaps>
);

export default AddEventMap;
