import { Injectable } from '@angular/core';
import {Coords} from '@app-root/models/Coords';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  constructor() { }

  public getPosition(): Coords {
    const result = {
      lat: 0,
      lng: 0
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        result.lat = position.coords.latitude;
        result.lng = position.coords.longitude;
      });
    }
    return result;
  }
}
