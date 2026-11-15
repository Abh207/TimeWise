import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  Sun, 
  CloudRain, 
  Sunset, 
  Sunrise, 
  RefreshCw, 
  Sparkles, 
  Compass, 
  AlertCircle 
} from 'lucide-react';

export const WeatherPage: React.FC = () => {
  const { weather, fetchLiveWeather } = useStore();
  const [selectedCity, setSelectedCity] = useState('San Francisco');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const cities = [
    { name: 'San Francisco', lat: 37.7749, lon: -122.4194 },
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
    { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
  ];

  useEffect(() => {
    if (!weather) {
      fetchLiveWeather(37.7749, -122.4194, 'San Francisco');
    }
  }, [weather, fetchLiveWeather]);

  const handleCityChange = async (cityName: string) => {
    setSelectedCity(cityName);
    const target = cities.find(c => c.name === cityName);
    if (target) {
      setIsRefreshing(true);
      await fetchLiveWeather(target.lat, target.lon, target.name);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    const target = cities.find(c => c.name === selectedCity) || cities[0];
    setIsRefreshing(true);
    await fetchLiveWeather(target.lat, target.lon, target.name);
    setIsRefreshing(false);
  };

  if (!weather) {
    return (
      <div className="p-12 text-center text-slate-400">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-brand-400" />
        <p>Loading weather telemetry...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <CloudSun className="w-3.5 h-3.5" />
            <span>Open-Meteo Live API Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Weather Dashboard & Impact</h1>
          <p className="text-xs text-slate-300 mt-1 font-light">
            Real-time atmospheric insights and weather-aware schedule warnings for your campus.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
            className="px-3 py-2 rounded-xl glass-input text-xs font-semibold bg-dark-900 border border-white/10"
          >
            {cities.map(c => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2.5 rounded-xl glass hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
            title="Refresh weather"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-brand-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Weather Card & Schedule Advice */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Temperature Card */}
        <div className="lg:col-span-2 p-8 rounded-3xl glass-card bg-gradient-to-tr from-dark-900 via-dark-850 to-indigo-950/40 border border-white/10 relative overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-300 flex items-center gap-1.5">
                <Compass className="w-4 h-4" /> {weather.city}
              </span>
              <h2 className="text-4xl font-extrabold text-white mt-2">{weather.condition}</h2>
              <div className="text-xs text-slate-400 mt-1">Feels like {weather.feelsLike}°C</div>
            </div>

            <div className="font-mono text-6xl sm:text-7xl font-black text-white">
              {weather.temp}°<span className="text-2xl font-light text-slate-400">C</span>
            </div>
          </div>

          {/* Meteorological Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2.5">
              <Droplets className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-[10px] text-slate-400">Humidity</div>
                <div className="font-bold text-white text-sm">{weather.humidity}%</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <CloudRain className="w-5 h-5 text-indigo-400" />
              <div>
                <div className="text-[10px] text-slate-400">Rain Chance</div>
                <div className="font-bold text-white text-sm">{weather.rainProbability}%</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Wind className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-[10px] text-slate-400">Wind Velocity</div>
                <div className="font-bold text-white text-sm">{weather.windSpeed} km/h</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Sun className="w-5 h-5 text-amber-400" />
              <div>
                <div className="text-[10px] text-slate-400">UV Index</div>
                <div className="font-bold text-white text-sm">{weather.uvIndex} / 11</div>
              </div>
            </div>
          </div>
        </div>

        {/* Weather-Aware Timetable Advice Card */}
        <div className="p-6 rounded-3xl glass-card border border-brand-500/30 bg-gradient-to-b from-brand-950/40 to-dark-900 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-peach-300 mb-2">
              <Sparkles className="w-4 h-4" /> Schedule Impact Engine
            </div>
            <h3 className="text-base font-bold text-white">Atmospheric Recommendations</h3>
            <p className="text-xs text-slate-300 mt-3 leading-relaxed font-light">
              {weather.advice}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <Sunrise className="w-4 h-4 text-amber-400" /> Sunrise
              </span>
              <span className="font-mono text-white font-semibold">{weather.sunrise}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <Sunset className="w-4 h-4 text-rose-400" /> Sunset
              </span>
              <span className="font-mono text-white font-semibold">{weather.sunset}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white">Hourly Temperature & Precipitation Progression</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {weather.hourly.map((h, i) => (
            <div
              key={i}
              className="p-3 rounded-xl border border-white/5 bg-dark-900/60 text-center text-xs space-y-1.5"
            >
              <div className="text-[11px] text-slate-400 font-mono">{h.time}</div>
              <div className="text-base font-bold text-white">{h.temp}°</div>
              <div className="text-[10px] text-cyan-400 flex items-center justify-center gap-1">
                <Droplets className="w-2.5 h-2.5" /> {h.pop}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Extended Forecast */}
      <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
        <h3 className="text-sm font-bold text-white mb-2">7-Day Extended Outlook</h3>
        <div className="space-y-2.5">
          {weather.daily.map((d, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl border border-white/5 bg-dark-900/40 flex items-center justify-between text-xs"
            >
              <div className="w-24 font-bold text-white">{d.date}</div>
              <div className="text-slate-300 flex-1">{d.condition}</div>
              <div className="text-cyan-400 text-xs w-20 text-center">
                {d.rainProb > 0 ? `${d.rainProb}% rain` : 'Dry'}
              </div>
              <div className="font-mono text-right w-24">
                <span className="text-white font-bold">{d.tempMax}°</span>{' '}
                <span className="text-slate-500">{d.tempMin}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

