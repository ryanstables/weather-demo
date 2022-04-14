import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, retry, switchMap, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OWMOnecallResponse, WeatherCondition } from '../interfaces/interfaces';
import { LocationsService } from './locations.service';
import { addDays } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements OnDestroy {

    weatherConditions$ = new BehaviorSubject<OWMOnecallResponse | null>(null);
    weeklyWeatherConditions$ = new BehaviorSubject<WeatherCondition[] | null>(null);
    
    private destroy$ = new Subject();
    
    constructor(
        private http: HttpClient,
        private locations: LocationsService
    ) { 
        this.locations.selectedLocation$.pipe(
            switchMap(location => {
                if (location.lat && location.lon) {
                    return this.getCurrentWeather(location.lat, location.lon);
                } else {
                    return of(null);
                }
            }),
            map(wc => {
                if(wc) {
                    const today = new Date();
                    return wc.daily.map((day, i) => ({
                        description: day.weather[0].description,
                        date: addDays(today, i),
                        temperature: day.temp,
                        humidity: day.humidity,
                        chanceOfRain: day.pop
                    }));    
                } else {
                    return null;
                }
            }),
            takeUntil(this.destroy$)
        ).subscribe(this.weeklyWeatherConditions$);

    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getCurrentWeather(lat: string, lon: string): Observable<OWMOnecallResponse | null> {
        const baseUrl = 'https://api.openweathermap.org/data/2.5/onecall';
        let params = new HttpParams()
            .set('lat', lat)
            .set('lon', lon)
            .set('units', 'metric')
            .set('exclude', 'minutely,hourly,alerts,current')
            .set('appid', environment.owmApiKey);
        return this.http.get<OWMOnecallResponse>(baseUrl, {params}).pipe(
            retry(3),
            catchError(err => {
                console.error(err);
                return of(null);
            })
        );
    }

}
