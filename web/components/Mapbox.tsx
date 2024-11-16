'use client'

import React, {useEffect, useRef} from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

const Mapbox = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | undefined>(undefined);

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
        mapRef.current = new mapboxgl.Map({
            container: mapContainer.current || '',
            center: [-74.5, 40],
            style: 'mapbox://styles/mapbox/dark-v11',
            zoom: 9
        });
        mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    });
    return (
        <div style={{ height: '600px' }} ref={mapContainer} className='map-container'/>
    )
}
export default Mapbox