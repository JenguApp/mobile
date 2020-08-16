import {Injectable} from '@angular/core';
import {NavController} from '@ionic/angular';
import {CurrentRequestService} from './data-services/current-request.service';
import {Request} from '../models/request/request';
import {StorageProvider} from '../providers/storage/storage';

@Injectable({
    providedIn: 'root'
})
export class StateManagerService
{

    /**
     * Default Constructor
     * @param storageProvider
     * @param currentRequestService
     */
    constructor(private storageProvider: StorageProvider,
                private currentRequestService: CurrentRequestService)
    {}

    /**
     * Helper function to take us to the state root
     * @param navController
     * @param request
     */
    async navigateToCurrentPage(navController: NavController, request: Request) {
        const userId = await this.storageProvider.loadLoggedInUserId();
        if (userId == request.completed_by_id) {
            navController.navigateRoot('/active-delivery').catch(console.error);
        } else if (userId == request.requested_by_id) {
            const route = request.completed_by_id == null ? '/pending-request' : '/request-accepted';
            navController.navigateRoot(route).catch(console.error);
        }
    }
}
