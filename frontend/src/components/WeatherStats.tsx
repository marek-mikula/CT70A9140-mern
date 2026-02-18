import { useEffect, useState } from "react";

const CACHE_KEY = "flowee_weather_cache"
const CACHE_TIME = 5 * 60 * 1000 // 5 minutes

interface WeatherData {
    temperature: number
    humidity: number
    feelsLike: number
    rain: number
    snow: number
    clouds: number
    timestamp: number
}

const WeatherStats = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchWeather = async () => {
        try {
            const params = new URLSearchParams({
                latitude: "61.0587",
                longitude: "28.1887",
                current: "temperature_2m,relative_humidity_2m,apparent_temperature,rain,snowfall,cloud_cover",
                timezone: "auto"
            })

            const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`)
            const data = await response.json()

            const newWeather: WeatherData = {
                temperature: data.current.temperature_2m,
                humidity: data.current.relative_humidity_2m,
                feelsLike: data.current.apparent_temperature,
                rain: data.current.rain,
                snow: data.current.snowfall,
                clouds: data.current.cloud_cover,
                timestamp: Date.now(),
            }

            localStorage.setItem(CACHE_KEY, JSON.stringify(newWeather))
            setWeather(newWeather)
        } catch (error) {
            console.error("Weather fetch failed", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
            const parsedCache: WeatherData = JSON.parse(cached)
            const isExpired = Date.now() - parsedCache.timestamp > CACHE_TIME

            if (!isExpired) {
                setWeather(parsedCache)
                setLoading(false)
                return
            }
        }
        fetchWeather()
    }, [])

    if (loading) return (
        <div className="h-20 bg-emerald-50/50 animate-pulse rounded-[2.5rem] border border-emerald-100/50" />
    )

    if (!weather) return null

    const getGardeningTip = () => {
        if (weather.rain > 0) return "Natural watering in progress! Skip the manual watering today."
        if (weather.temperature > 25) return "Warm conditions detected. Check soil hydration levels."
        if (weather.clouds > 80) return "Cloudy skies. Great for repotting or outdoor planting."
        return "Stable conditions. Stick to your usual watering cycle."
    }

    return (
        <section>
            <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 border border-emerald-200/50 overflow-hidden transition-all duration-500">

                {/* Toggle Header */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-8 py-6 flex items-center justify-between hover:bg-emerald-50/30 transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <h3 className="text-lg font-extrabold text-emerald-950 leading-tight">
                                {Math.round(weather.temperature)}°C <span className="text-emerald-500/50 font-medium ml-1">in Lappeenranta</span>
                            </h3>
                            <p className="text-xs text-emerald-600/60 font-medium">Check local conditions</p>
                        </div>
                    </div>

                    {/* Animated Arrow */}
                    <div className={`p-2 rounded-full bg-emerald-50 text-emerald-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                </button>

                {/* Collapsible Content */}
                <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <div className="px-8 pb-8 border-t border-emerald-50/50 pt-6">

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <WeatherMetric label="Feels Like" value={`${Math.round(weather.feelsLike)}°`} icon="🌡️" />
                            <WeatherMetric label="Humidity" value={`${weather.humidity}%`} icon="💧" />
                            <WeatherMetric label="Cloud Cover" value={`${weather.clouds}%`} icon="☁️" />
                            <WeatherMetric label="Precipitation" value={`${weather.rain}mm`} icon="🌧️" />
                        </div>

                        {/* Weather Tip */}
                        <div className="bg-emerald-600 p-4 rounded-2xl flex items-start gap-3 shadow-lg shadow-emerald-200">
                            <div className="bg-white/20 p-1.5 rounded-lg text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-sm font-bold text-white leading-snug">
                                {getGardeningTip()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const WeatherMetric = ({ label, value, icon }: { label: string, value: string, icon: string }) => (
    <div className="bg-emerald-50/50 px-4 py-3 rounded-2xl border border-emerald-100/30">
        <div className="text-[10px] font-bold text-emerald-700/50 uppercase tracking-widest mb-1">{label}</div>
        <div className="flex items-center gap-2">
            <span className="text-sm">{icon}</span>
            <span className="text-sm font-extrabold text-emerald-950">{value}</span>
        </div>
    </div>
)

export default WeatherStats
