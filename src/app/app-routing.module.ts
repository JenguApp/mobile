import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './pages/home/home.module#HomePageModule',
    },
    {
        path: 'organization-creation',
        loadChildren: './pages/organization-creation/organization-creation.module#OrganizationCreationPageModule'
    },
    {
        path: 'organization-dashboard/:organization_id',
        loadChildren: './pages/organization-dashboard/organization-dashboard.module#OrganizationDashboardPageModule'
    },
    {
        path: 'profile-editor',
        loadChildren: './pages/profile-editor/profile-editor.module#ProfileEditorPageModule'
    },
    {
        path: 'sign-in',
        loadChildren: './pages/sign-in/sign-in.module#SignInPageModule'
    },
    {
        path: 'sign-up',
        loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule'
    },
    {
        path: 'subscription',
        loadChildren: './pages/subscription/subscription.module#SubscriptionPageModule'
    },
    {
        path: 'threads',
        loadChildren: './pages/threads/threads.module#ThreadsPageModule',
    },
    {
        path: 'user/:user_id',
        loadChildren: './pages/user/user.module#UserPageModule',
    },
    {
        path: 'contacts',
        loadChildren: './pages/contacts/contacts.module#ContactsPageModule',
    },
    {
        path: 'user/:user_id/message',
        loadChildren: './pages/thread/thread.module#ThreadPageModule',
    },
    // Add more pages below
    {
        path: 'active-delivery',
        loadChildren: './pages/active-delivery/active-delivery.module#ActiveDeliveryPageModule'
    },
    {
        path: 'browsing-deliveries',
        loadChildren: './pages/browsing-deliveries/browsing-deliveries.module#BrowsingDeliveriesPageModule'
    },
    {
        path: 'location-selection',
        loadChildren: './pages/location-selection/location-selection.module#LocationSelectionPageModule'
    },
    {
        path: 'location/:location_id',
        loadChildren: './pages/location/location.module#LocationPageModule'
    },
    {
        path: 'location-dashboard/:location_id',
        loadChildren: './pages/location-dashboard/location-dashboard.module#LocationDashboardPageModule'
    },
    {
        path: 'organization-location-creation/:organization_id',
        loadChildren: './pages/location-creation/location-creation.module#LocationCreationPageModule'
    },
    {
        path: 'pending-request',
        loadChildren: './pages/pending-request/pending-request.module#PendingRequestPageModule'
    },
    {
        path: 'qr-scanner',
        loadChildren: './pages/qr-scanner/qr-scanner.module#QRScannerPageModule'
    },
    {
        path: 'request-review',
        loadChildren: './pages/request-review/request-review.module#RequestReviewPageModule'
    },
    {
        path: 'request-accepted',
        loadChildren: './pages/request-accepted/request-accepted.module#RequestAcceptedPageModule'
    },
    {
        path: 'requesting-deliveries',
        loadChildren: './pages/requesting-deliveries/requesting-deliveries.module#RequestingDeliveriesPageModule'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
