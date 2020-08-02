import {RequestHandlerProvider} from '../request-handler/request-handler';
import Auth from './auth/auth';
import {Injectable} from '@angular/core';
import Subscriptions from './subscriptions/subscriptions';
import Social from './social/social';
import Messaging from './messaging/messaging';
import DeliveryRequests from './delivery-requests/delivery-requests';
import OrganizationRequests from './organization/organization';
import EntityRequests from './entity/entity';

/**
 * Provider for interacting with all app wide requests
 */
@Injectable()
export class RequestsProvider {

    /**
     * The auth requests available
     */
    auth: Auth;

    /**
     * The requests related to our subscriptions
     */
    subscriptions: Subscriptions;

    /**
     * The social media requests available
     */
    social: Social;

    /**
     * The messaging requests available
     */
    messaging: Messaging;

    /**
     * The organization requests
     */
    organization: OrganizationRequests;

    /**
     * All requests related to the entity
     */
    entityRequests: EntityRequests;

    /**
     * All requests related to the deliveries
     */
    deliveryRequests: DeliveryRequests;

    /**
     * Default constructor
     * @param requestHandler
     */
    constructor(private requestHandler: RequestHandlerProvider) {
        this.auth = new Auth(requestHandler);
        this.subscriptions = new Subscriptions(this.requestHandler);
        this.social = new Social(this.requestHandler);
        this.messaging = new Messaging(requestHandler);
        this.organization = new OrganizationRequests(this.requestHandler);
        this.entityRequests = new EntityRequests(this.requestHandler);
        this.deliveryRequests = new DeliveryRequests(requestHandler);
    }
}
