import { Component } from '@angular/core';
import { Location } from './interfaces/interfaces';
import { LocationsService } from './services/locations.service';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
    
    title = 'Weather';
    weatherData: any = null;

    constructor(
        public weather: WeatherService,
        public locations: LocationsService
    ) {
    }
    
    async onClick(loc: Location) {
        this.locations.updateLocation(loc);
    }
}
