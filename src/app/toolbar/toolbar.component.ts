import { Component, OnInit } from '@angular/core';
import { Location } from '../interfaces/interfaces';
import { LocationsService } from '../services/locations.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent {

    constructor(
        public weather: WeatherService,
        public locations: LocationsService
    ) {
    }
    
    async onClick(loc: Location) {
        this.locations.updateLocation(loc);
    }
    
}
