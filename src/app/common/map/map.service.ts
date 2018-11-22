import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CamelizePipe } from 'ngx-pipes';

@Injectable()
export class MapService {

  private geoCoder;

  //cache
  private locationCache: any = {};
  constructor(private camelizePipe: CamelizePipe) { }
  private camelize(value: string): string {
    return this.camelizePipe.transform(value);
  }

  private cacheLocation(location: string, coordinates: any) {
    this.locationCache[this.camelize(location)] = coordinates;
  }

  private isLocationCached(location): boolean {
    return this.locationCache[this.camelize(location)];
  }

  //llamada a google
  private geoCodeLocation(location: string): Observable<any> {
    if (!this.geoCoder) { this.geoCoder = new (<any>window).google.maps.Geocoder();}

    return new Observable((observer) => {
      //lo busco en google
      this.geoCoder.geocode({ address: location }, (result, status) => {
        if (status === 'OK') {
          const geometry = result[0].geometry.location;
          //cache
          const coordinates = { lat: geometry.lat(), lng: geometry.lng() };
          this.cacheLocation(location, coordinates);

          observer.next(coordinates);
        } else {
          observer.error('Location could not be geocoded');
        }
      });
    });
  }

  //llamada a google
  public getGeoLocation(location: string): Observable<any> {
    //cache
    if (this.isLocationCached(location)) {
      return Observable.of(this.locationCache[this.camelize(location)]);
    } else {
      return this.geoCodeLocation(location);
    }
  }
}
