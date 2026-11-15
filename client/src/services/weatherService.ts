import type { WeatherData } from '../types';

export class WeatherService {
  public static async fetchWeather(lat: number = 37.7749, lon: number = -122.4194, city: string = 'San Francisco'): Promise<WeatherData> {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max&timezone=auto`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error('Open-Meteo fetch failed');
      const data = await res.json();

      const current = data.current || {};
      const daily = data.daily || {};
      const hourly = data.hourly || {};

      // Determine condition text from WMO weather code
      const weatherCode = current.weather_code || 0;
      const condition = this.getConditionFromCode(weatherCode);

      const rainProb = (daily.precipitation_probability_max && daily.precipitation_probability_max[0]) || 0;
      const uv = (daily.uv_index_max && daily.uv_index_max[0]) || 4;

      // Smart weather advice
      let advice = 'Great conditions for planned outdoor walks or commute!';
      if (rainProb > 50) {
        advice = `High chance of rain (${rainProb}%). TimeWise recommends carrying an umbrella or moving outdoor sessions indoors.`;
      } else if (current.temperature_2m > 30) {
        advice = 'Warm temperatures today. Ensure proper hydration during study and focus blocks.';
      } else if (current.temperature_2m < 10) {
        advice = 'Crisp and chilly outside. Perfect cozy indoor focus environment.';
      }

      const hourlyList = [];
      const times = hourly.time || [];
      const temps = hourly.temperature_2m || [];
      const pops = hourly.precipitation_probability || [];

      // Take next 8 hourly points
      for (let i = 0; i < Math.min(8, times.length); i++) {
        hourlyList.push({
          time: new Date(times[i]).toLocaleTimeString([], { hour: 'numeric' }),
          temp: Math.round(temps[i]),
          pop: pops[i] || 0
        });
      }

      const dailyList = [];
      const dDates = daily.time || [];
      const dMax = daily.temperature_2m_max || [];
      const dMin = daily.temperature_2m_min || [];
      const dCodes = daily.weather_code || [];
      const dPops = daily.precipitation_probability_max || [];

      for (let i = 0; i < Math.min(7, dDates.length); i++) {
        dailyList.push({
          date: new Date(dDates[i]).toLocaleDateString([], { weekday: 'short' }),
          tempMax: Math.round(dMax[i]),
          tempMin: Math.round(dMin[i]),
          condition: this.getConditionFromCode(dCodes[i] || 0),
          rainProb: dPops[i] || 0
        });
      }

      return {
        city,
        temp: Math.round(current.temperature_2m || 20),
        feelsLike: Math.round(current.apparent_temperature || current.temperature_2m || 20),
        condition,
        humidity: current.relative_humidity_2m || 60,
        windSpeed: Math.round(current.wind_speed_10m || 10),
        rainProbability: rainProb,
        uvIndex: Math.round(uv),
        sunrise: daily.sunrise?.[0] ? new Date(daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '06:45 AM',
        sunset: daily.sunset?.[0] ? new Date(daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '06:15 PM',
        hourly: hourlyList,
        daily: dailyList,
        advice
      };
    } catch {
      // Fallback data when offline or rate-limited
      return {
        city,
        temp: 21,
        feelsLike: 20,
        condition: 'Partly Cloudy',
        humidity: 62,
        windSpeed: 12,
        rainProbability: 25,
        uvIndex: 5,
        sunrise: '06:40 AM',
        sunset: '06:20 PM',
        hourly: [
          { time: '10 AM', temp: 19, pop: 10 },
          { time: '12 PM', temp: 22, pop: 15 },
          { time: '2 PM', temp: 23, pop: 20 },
          { time: '4 PM', temp: 21, pop: 35 },
          { time: '6 PM', temp: 18, pop: 20 },
          { time: '8 PM', temp: 16, pop: 10 },
        ],
        daily: [
          { date: 'Today', tempMax: 23, tempMin: 14, condition: 'Partly Cloudy', rainProb: 25 },
          { date: 'Tomorrow', tempMax: 22, tempMin: 13, condition: 'Sunny', rainProb: 10 },
          { date: 'Wed', tempMax: 20, tempMin: 12, condition: 'Cloudy', rainProb: 30 },
          { date: 'Thu', tempMax: 19, tempMin: 11, condition: 'Light Rain', rainProb: 65 },
          { date: 'Fri', tempMax: 21, tempMin: 13, condition: 'Sunny', rainProb: 15 },
        ],
        advice: 'Optimal temperature for academic focus. Afternoon walk recommended before 4 PM.'
      };
    }
  }

  private static getConditionFromCode(code: number): string {
    if (code === 0) return 'Clear Sky';
    if (code === 1 || code === 2) return 'Mostly Sunny';
    if (code === 3) return 'Overcast';
    if (code >= 45 && code <= 48) return 'Foggy';
    if (code >= 51 && code <= 55) return 'Drizzle';
    if (code >= 61 && code <= 67) return 'Rain';
    if (code >= 71 && code <= 77) return 'Snow';
    if (code >= 80 && code <= 82) return 'Rain Showers';
    if (code >= 95) return 'Thunderstorm';
    return 'Partly Cloudy';
  }
}

