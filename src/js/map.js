export default function map() {
  const maps = document.querySelectorAll(".map");

  if (maps.length) {
    maps.forEach((map) => {
      const center = JSON.parse(map.dataset.center);
      const zoom = Number(map.dataset.zoom);
      const iconHref = map.dataset.icon;

      let objectMark = {};

      if (iconHref) {
        objectMark = {
          iconLayout: "default#image",
          iconImageHref: iconHref,
          iconImageSize: [50, 50],
          iconImageOffset: [-25, -35],
        };
      }

      function init() {
        const htmlMap = new ymaps.Map(map, {
          center,
          zoom,
        });

        const placemark = new ymaps.Placemark(center, {}, objectMark);

        htmlMap.geoObjects.add(placemark);

        htmlMap.controls.remove("geolocationControl"); // удаляем геолокацию
        htmlMap.controls.remove("searchControl"); // удаляем поиск
        htmlMap.controls.remove("trafficControl"); // удаляем контроль трафика
        htmlMap.controls.remove("typeSelector"); // удаляем тип
        htmlMap.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
        // htmlMap.controls.remove("zoomControl"); // удаляем контрол зуммирования
        htmlMap.controls.remove("rulerControl"); // удаляем контрол правил
        htmlMap.behaviors.disable(["scrollZoom"]);
      }

      ymaps.ready(init);
    });
  }
}