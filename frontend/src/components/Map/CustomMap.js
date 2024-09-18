import React, { useRef, useEffect, useState } from "react";
import { useYMaps, ObjectManager } from "@pbe/react-yandex-maps";

const CustomMap = () => {
  const mapRef = useRef(null);
  const ymaps = useYMaps(["Map", "geocode", "Placemark", "ObjectManager"]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    const initMap = new ymaps.Map(mapRef.current, {
      center: [55.76, 37.64],
      zoom: 10,
    });
    setMap(initMap);

    return () => initMap.destroy();
  }, [ymaps]);

  useEffect(() => {
    if (!map || !ymaps) return;

    const objectManager = new ymaps.ObjectManager({
      clusterize: true,
      gridSize: 32,
      clusterDisableClickZoom: true,
    });

    const addresses = [
      {name: "Москва", address: "Москва, Кремль"},
      {name: "Химки", address: "Химки, ул. Ленина, 1"}
    ];

    addresses.forEach((item, index) => {
      ymaps.geocode(item.address).then((result) => {
        const coords = result.geoObjects.get(0).geometry.getCoordinates();
        const object = {
          type: "Feature",
          id: index,
          geometry: {
            type: "Point",
            coordinates: coords,
          },
          properties: {
            balloonContent: item.address,
            hintContent: item.address,
            iconContent: item.name
          },
          options: {
            preset: "islands#blueStretchyIcon",
          },
        };
        objectManager.add(object);
      });
    });

    map.geoObjects.add(objectManager);
  }, [map, ymaps]);

  return <div ref={mapRef} style={{ width: "320px", height: "240px" }} />;
};

export default CustomMap;
