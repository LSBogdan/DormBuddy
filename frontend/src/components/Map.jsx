import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Box } from '@chakra-ui/react';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(26.065397);
  const [lat, setLat] = useState(44.443176);
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  return (
    <Box height="100vh" position="relative">
      <Box
        className="sidebar"
        backgroundColor="rgba(35, 55, 75, 0.9)"
        color="#fff"
        padding="6px 12px"
        fontFamily="monospace"
        zIndex="1"
        position="absolute"
        top="0"
        left="0"
        margin="12px"
        borderRadius="4px"
      >
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </Box>
      <Box
        ref={mapContainer}
        className="map-container"
        height="90%"
        style={{ width: '99%' }}
      />
    </Box>
  );
};

export default Map;
