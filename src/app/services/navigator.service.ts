import {Injectable} from '@angular/core';
import {Coords} from '@app-root/models/Coords';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  /**
   * Get user lat/lng or return default
   */
  public getPosition(): Coords {
    const result = {
      lat: 59.911491,
      lng: 10.757933
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
