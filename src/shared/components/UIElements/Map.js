import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "./Map.css";

/* mapboxgl.accessToken =
  "pk.eyJ1Ijoic2lkZGhhcnRoc3NiIiwiYSI6ImNrb2lpZ3JxbzE4cHUyc2xqeDFoYWRveGIifQ.T3J07gvbEpvWk7ss3haIFg"; */

/* const Map = (props) => {
 
  const mapContainerRef = useRef(null);
  
  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [props.coordinates.lng, props.coordinates.lat],
      zoom: 12.5,
    });
 
    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
 
    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
 
  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map; */

const Map = (props) => {

  const { center, zoom } = props;
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2lkZGhhcnRoc3NiIiwiYSI6ImNrdXdxbDQ3dDFnYm8ydW8wcjVibHE3YnEifQ.XM3WcQw8bPwNIqpAQg71kQ";
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: center,
      zoom: zoom,
    });
    new mapboxgl.Marker({ position: center, map: map });
  }, [center, zoom]);
  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
