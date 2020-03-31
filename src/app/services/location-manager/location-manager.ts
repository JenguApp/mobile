import {Injectable} from '@angular/core';
import {Geolocation, Geoposition} from '@ionic-native/geolocation/ngx';

@Injectable({
    providedIn: 'root'
})
export class LocationManagerService {

    /**
     * The most recent position
     */
    position: Geoposition = null;

    /**
     * We refresh our location every 10 minutes for our purposes
     */
    refreshInterval = 10 * 60 * 1000;

    /**
     * Default Constructor
     * @param geolocation
     */
    constructor(private geolocation: Geolocation) {
    }

    /**
     * Gets an up to date position for us
     */
    getPosition(): Promise<Geoposition> {
        if (this.position && this.position.timestamp > Date.now() - this.refreshInterval) {
            return Promise.resolve(this.position);
        } else {
            return this.geolocation.getCurrentPosition().then(position => {
                this.position = position;
                return Promise.resolve(position);
            });
        }
    }
}