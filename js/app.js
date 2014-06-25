var map = L.mapbox.map('map', 'examples.map-h67hf2ic')
  .setView([61.189100,-149.873723], 12);

var pickColor = (function() {
  var colors = ['#AD0101', '#0D7215', '#4E0963', '#0071CA'];
  var colorIndex = Math.floor((Math.random() * colors.length) + 1);

  return function() {
    colorIndex++;
    if (colorIndex >= colors.length) colorIndex = 0;
    return colors[colorIndex];
  };
})();

function load() {
  // Iterate the geojson objects from the data found in data.js.
  $.each(data, function(index, geojson) {
    $.each(geojson.features, function(index, value) {
      $.extend(geojson.features[index].properties, {
        'stroke': pickColor(),
        'stroke-opacity': 0.5,
        'stroke-width': 5
      });
    });

    L.mapbox.featureLayer(geojson)
      .eachLayer(function(layer) {
        if(layer.feature.properties && layer.feature.properties.desc) {
          layer.bindPopup(layer.feature.properties.desc);
         }
      }).addTo(map);
  })
}

$(load);
