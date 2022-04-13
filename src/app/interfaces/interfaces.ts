interface OWMWeather {
    id: number;
    main: string;
    description: string
    icon: string;
}

interface OWMTemp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

interface OWMDayParams {
    dt: number;
    sunrise: number;
    sunset: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: OWMWeather[];
    clouds: number;    
}

interface OWMCurrentDay extends OWMDayParams {
    temp: number;
    feels_like: number;
    visibility: number;
}

interface OWMOnecallDay extends OWMDayParams {
    moonrise: number;
    moonset: number;
    moon_phase: number;
    temp: OWMTemp;
    feels_like: OWMTemp,
    pop: number;
    rain: number;
    uvi: number;
}

export interface OWMOnecallResponse {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current?: OWMCurrentDay; // I was using this for debugging!
    daily: OWMOnecallDay[];

}

export interface Location {
    name: LocationName;
    lon?: string;
    lat?: string;
}

export interface OWMGeoLocationResponse {
    country: string;
    lat: number;
    local_names: any;
    lon: number;
    name: string;
    state: string;
}

export interface WeatherCondition {
    description: string;
    date: Date;
    temperature: OWMTemp;
    humidity: number;
    chanceOfRain: number;
}

export type LocationName = 'London' | 'Paris' | 'New York' | 'Los Angeles' | 'Tokyo';