import { useEffect, useRef, useState } from 'react';

const WeatherWidget = ({ country }) => {
    const widgetRef = useRef(null);
    const [cityId, setCityId] = useState(null);
    const API_KEY = 'e0b58c204ba59a6bcd9e4d1c79673980';

    useEffect(() => {
        const fetchCityId = async () => {
            try {
                const query = country === 'USA' ? 'New York,US' : country;
                const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=1&appid=${API_KEY}`);
                const data = await res.json();
                if (data.length > 0) {
                    const { lat, lon } = data[0];

                    const cityRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
                    const cityData = await cityRes.json();

                    if (cityData.id) {
                        setCityId(cityData.id);
                    }
                }
            } catch (err) {
                console.error('Erro ao obter city ID:', err);
            }
        };

        if (country) {
            fetchCityId();
        }
    }, [country]);

    useEffect(() => {
        if (cityId && widgetRef.current) {
            window.myWidgetParam = [{
                id: 11,
                cityid: cityId,
                appid: API_KEY,
                units: 'metric',
                theme: 'minimal',
                containerid: 'openweathermap-widget'
            }];

            const script = document.createElement('script');
            script.async = true;
            script.charset = 'utf-8';
            script.src = '//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js';

            widgetRef.current.innerHTML = '';
            widgetRef.current.appendChild(script);
        }
    }, [cityId]);

    return (
        <div
            className="weather-widget-wrapper"
            style={{
                width: '250px',
                height: '250px',
                overflow: 'hidden',
                borderRadius: '12px',
                position: 'relative',
                transform: 'scale(0.85)',
                transformOrigin: 'top left',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            }}
        >
            <div
                id="openweathermap-widget"
                ref={widgetRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '300px',
                    height: '300px',
                    pointerEvents: 'none',
                }}
            ></div>
        </div>
    );

};

export default WeatherWidget;
