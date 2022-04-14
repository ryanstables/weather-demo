import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location, OWMGeoLocationResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

    private locations: Location[] = [
        {
            // default location...
            name: 'London',
            lon: '-0.1278',
            lat: '51.5074'
        },
        {
            name: 'Paris',
        },
        {
            name: 'New York',
        },
        {
            name: 'Los Angeles',
        },
        {
            name: 'Tokyo',
        }
    ];

    locations$: BehaviorSubject<Location[]>;
    selectedLocation$: BehaviorSubject<Location>;

    constructor(
        private http: HttpClient
    ) { 
        this.locations$ = new BehaviorSubject<Location[]>(this.locations);
        this.selectedLocation$ = new BehaviorSubject<Location>(this.locations[0]);
    }

    async updateLocation(location: Location) {
        await this.updateCoords(location);
        const selectedLoc = this.locations.find(l => l == location);
        if(selectedLoc) {
            this.selectedLocation$.next(selectedLoc);
        }
    }

    async updateCoords(loc: Location): Promise<void> {
        const url = 'http://api.openweathermap.org/geo/1.0/direct';
        if(!loc.lat || !loc.lon) {
            let params = new HttpParams()
            .set('limit', '1')
            .set('q', loc.name)
            .set('appid', environment.owmApiKey);
            const response = await this.http.get<OWMGeoLocationResponse[]>(url, {params}).toPromise().catch(err => {
                console.error(err);
                return null;
            });
            if(response) {
                console.log(response);
                loc.lat = response[0].lat.toString();
                loc.lon = response[0].lon.toString();
            }
        }
    }

}
