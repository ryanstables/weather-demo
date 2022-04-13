import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { WeatherCondition } from '../interfaces/interfaces';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.less']
})
export class WidgetComponent implements OnInit {

    @Input() weatherObject!: WeatherCondition;
    
    constructor() { }
    
    ngOnInit(): void {
    }

    formatDate(date: Date): string {
        return format(date, 'EEE do MMM');
    }
}
