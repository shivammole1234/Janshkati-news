import React, { useState, useEffect } from 'react';
import { 
  CloudSun, MapPin, Sun, Cloud, CloudRain, 
  CloudLightning, CloudFog, RefreshCw, Loader2, Compass
} from 'lucide-react';
import { Language } from '../types';

interface WeatherWidgetProps {
  currentLanguage: Language;
}

interface WeatherInfo {
  temp: number;
  conditionCode: number;
  locationName: string;
}

const WEATHER_TRANSLATIONS = {
  english: {
    title: "Local Weather",
    detecting: "Locating device...",
    denied: "Location Access Off",
    deniedDesc: "Showing Mumbai weather. Click to share location.",
    mumbaiFallback: "Mumbai, Maharashtra",
    conditions: {
      sunny: "Sunny",
      partlyCloudy: "Partly Cloudy",
      cloudy: "Cloudy & Overcast",
      rain: "Rainy",
      thunderstorm: "Thunderstorm",
      foggy: "Foggy/Misty",
      unknown: "Scattered Clouds"
    },
    updated: "Just updated"
  },
  marathi: {
    title: "स्थानिक हवामान",
    detecting: "स्थान शोधत आहे...",
    denied: "स्थान सेवा बंद आहे",
    deniedDesc: "मुंबईचे हवामान दाखवत आहे. आपले स्थान शोधण्यासाठी क्लिक करा.",
    mumbaiFallback: "मुंबई, महाराष्ट्र",
    conditions: {
      sunny: "स्वच्छ सूर्यप्रकाश",
      partlyCloudy: "अंशतः ढगाळ",
      cloudy: "ढगाळ हवामान",
      rain: "पाऊस",
      thunderstorm: "वादळी पाऊस",
      foggy: "धुके",
      unknown: "अंशतः ढगाळ"
    },
    updated: "आत्ता अद्यतनित केले"
  },
  hindi: {
    title: "स्थानीय मौसम",
    detecting: "स्थान खोज रहा है...",
    denied: "स्थान सेवा बंद है",
    deniedDesc: "मुंबई का मौसम दिखा रहा है। अपना स्थान खोजने के लिए क्लिक करें।",
    mumbaiFallback: "मुंबई, महाराष्ट्र",
    conditions: {
      sunny: "साफ धूप",
      partlyCloudy: "आंशिक रूप से बादल",
      cloudy: "घने बादल",
      rain: "बारिश",
      thunderstorm: "तूफानी बारिश",
      foggy: "कोहरा",
      unknown: "आंशिक रूप से बादल"
    },
    updated: "अभी अपडेट किया गया"
  }
};

function getWeatherDetails(code: number, lang: Language) {
  const trans = WEATHER_TRANSLATIONS[lang]?.conditions || WEATHER_TRANSLATIONS.english.conditions;
  if (code === 0) {
    return { label: trans.sunny, Icon: Sun, colorClass: 'text-amber-500 bg-amber-50 border-amber-200/50' };
  }
  if (code >= 1 && code <= 3) {
    return { label: trans.partlyCloudy, Icon: CloudSun, colorClass: 'text-blue-500 bg-blue-50 border-blue-200/50' };
  }
  if (code === 45 || code === 48) {
    return { label: trans.foggy, Icon: CloudFog, colorClass: 'text-gray-400 bg-gray-50 border-gray-200/50' };
  }
  if ((code >= 51 && code <= 55) || (code >= 61 && code <= 65) || (code >= 80 && code <= 82)) {
    return { label: trans.rain, Icon: CloudRain, colorClass: 'text-indigo-500 bg-indigo-50 border-indigo-200/50' };
  }
  if (code >= 95 && code <= 99) {
    return { label: trans.thunderstorm, Icon: CloudLightning, colorClass: 'text-purple-600 bg-purple-50 border-purple-200/50' };
  }
  return { label: trans.unknown, Icon: Cloud, colorClass: 'text-gray-500 bg-gray-50 border-gray-200/50' };
}

export default function WeatherWidget({ currentLanguage }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  const t = WEATHER_TRANSLATIONS[currentLanguage] || WEATHER_TRANSLATIONS.english;

  const fetchWeather = async (lat: number, lon: number, customName?: string) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      if (!response.ok) throw new Error("Weather API failed");
      const data = await response.json();
      const current = data.current_weather;

      let locationName = customName || t.mumbaiFallback;

      if (!customName) {
        try {
          // Fetch English, Devanagari names or fallback
          const geoResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=${currentLanguage},en`
          );
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            const addr = geoData.address;
            const city = addr.city || addr.town || addr.village || addr.suburb || addr.city_district || addr.county || "Your Area";
            const state = addr.state ? `, ${addr.state}` : '';
            locationName = `${city}${state}`;
          }
        } catch (geoErr) {
          console.warn("Reverse geocoding failed, using coordinates:", geoErr);
          locationName = `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`;
        }
      }

      setWeather({
        temp: Math.round(current.temperature),
        conditionCode: current.weathercode,
        locationName
      });
      setError(false);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError(true);
    } finally {
      setLoading(false);
      setIsLocating(false);
    }
  };

  const detectLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      setError(true);
      // Fallback to Mumbai (Latitude: 19.0760, Longitude: 72.8777)
      fetchWeather(19.0760, 72.8777, t.mumbaiFallback);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (err) => {
        console.warn("Geolocation permission denied or timed out:", err);
        setError(true);
        // Fallback to Mumbai (Latitude: 19.0760, Longitude: 72.8777)
        fetchWeather(19.0760, 72.8777, t.mumbaiFallback);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  };

  useEffect(() => {
    detectLocation();
  }, [currentLanguage]);

  if (loading) {
    return (
      <div className="bg-brand-light p-4 rounded-2xl border border-brand-border flex items-center justify-between animate-pulse">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gray-100 rounded-xl text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
          <div className="space-y-1">
            <div className="h-2.5 w-16 bg-gray-200 rounded" />
            <div className="h-3 w-32 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="h-6 w-10 bg-gray-200 rounded" />
      </div>
    );
  }

  const weatherDetails = weather 
    ? getWeatherDetails(weather.conditionCode, currentLanguage) 
    : { label: "", Icon: CloudSun, colorClass: 'text-amber-500 bg-amber-50' };

  const WeatherIcon = weatherDetails.Icon;

  return (
    <div className="bg-brand-light p-4 rounded-2xl border border-brand-border flex flex-col space-y-2.5 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 min-w-0">
          <div className={`p-2.5 rounded-xl border ${weatherDetails.colorClass} shrink-0 transition-colors duration-300`}>
            <WeatherIcon className="w-5 h-5 animate-pulse" style={{ animationDuration: '3s' }} />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] text-brand-muted-text font-black uppercase tracking-wider flex items-center gap-1">
              <Compass className="w-2.5 h-2.5 text-brand-red shrink-0" />
              {t.title}
            </div>
            <div className="text-xs font-bold text-brand-charcoal flex items-center min-w-0">
              <MapPin className="w-3 h-3 mr-1 text-brand-red shrink-0" />
              <span className="truncate">{weather?.locationName}</span>
            </div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="text-lg font-serif font-black text-brand-charcoal">
            {weather ? `${weather.temp}°C` : "--°C"}
          </span>
          <div className="text-[9px] font-bold text-brand-red uppercase">
            {weatherDetails.label}
          </div>
        </div>
      </div>

      {/* Geolocation status warning or Refresh trigger action */}
      <div className="flex items-center justify-between border-t border-brand-border/40 pt-2 text-[9px] font-bold text-brand-muted-text">
        <span className="truncate max-w-[85%]">
          {error ? t.denied : t.updated}
        </span>
        <button 
          onClick={detectLocation}
          disabled={isLocating}
          className="p-1 hover:bg-white hover:text-brand-red rounded-lg transition-colors cursor-pointer flex items-center justify-center border border-transparent hover:border-brand-border/40 shrink-0"
          title="Refresh weather based on current location"
        >
          <RefreshCw className={`w-3 h-3 ${isLocating ? 'animate-spin text-brand-red' : ''}`} />
        </button>
      </div>
    </div>
  );
}
