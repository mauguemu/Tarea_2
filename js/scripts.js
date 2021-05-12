// Mapa Leaflet
	var mapa = L.map('mapid').setView([9.997819, -83.037292], 15
	);
	
	// Capa base
	var osm = L.tileLayer(
	  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
	  {
	    maxZoom: 25,
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	  }
	).addTo(mapa);
	// Otra capa base
        var esri = L.tileLayer(
	  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
	  {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	  }
	).addTo(mapa);	
	// Conjunto de capas base
	var mapasBase = {
	    "ESRI": esri,		
	    "OSM": osm,
		
	};	    
		
	// Control de capas
        control_capas = L.control.layers(mapasBase).addTo(mapa);
		
		
	// Control de escala
        L.control.scale({position:'topright', imperial:false}).addTo(mapa);
	
	// Capa vectorial en formato GeoJSON
	$.getJSON("https://mauguemu.github.io/Datos_tarea_2/centro_historico/perimetro_centro_historico.geojson", function(geodata) {
	var centro_historico = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#f37360", 'weight': 2.5, 'fillOpacity': 0.0}
    }
	,
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Centro Histórico Ciudad de Limón</strong>: " ;
      layer.bindPopup(popupText);
    }			
	}).addTo(mapa);

	control_capas.addOverlay(centro_historico, 'Centro Histórico');
 
	});
	
	// Capa vectorial en formato GeoJSON
	$.getJSON("https://mauguemu.github.io/Datos_tarea_2/caminos_centro_hist/red_caminos_centro_histo.geojson", function(geodata) {
	var calles = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#fac866", 'weight': 3.5, 'fillOpacity': 0.0}
    }
	,
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Carretera</strong>: " + "<br>"+ feature.properties.TIPO + "<br>" + feature.properties.URBANOS;
      layer.bindPopup(popupText);
    }			
	}).addTo(mapa);

	control_capas.addOverlay(calles, 'Calles');
 
	});
	
	// Capa vectorial en formato GeoJSON
	$.getJSON("https://mauguemu.github.io/Datos_tarea_2/infra_cultural/infra_cultural_centro.geojson", function(geodata) {
	var infra_cult = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#fac866", 'weight': 2.5, 'fillOpacity': 0.0}
    }
	,
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Infraestructura cultural</strong>: " + "<br>" + feature.properties.title;
      layer.bindPopup(popupText);
    }			
	}).addTo(mapa);

	control_capas.addOverlay(infra_cult, 'Infraestructura cultural');
 
	});