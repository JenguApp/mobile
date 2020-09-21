import {ApplicationModes} from '../app/application-modes';

export const environment = {
    production: true,
    api_url: 'http://api.jengu.app/v1/',
    websocket_url: 'ws://socket.jengu.app/',
    app_name: 'Jengu',
    stripe_publishable_key: 'pk_test_xHnP657roth55lBchLpLg6Af00vfCLYpDk',
    branding_image_url: '/assets/logo.svg',
    forgot_password_url: null,
    sign_up_enabled: true,
    subscriptions_enabled: false,
    organizations_enabled: true,
    mode: ApplicationModes.DISTRIBUTION_CENTER,
};
