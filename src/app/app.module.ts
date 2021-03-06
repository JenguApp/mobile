import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';
import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {FirebaseX} from '@ionic-native/firebase-x/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RequestHandlerProvider } from './providers/request-handler/request-handler';
import { StorageProvider } from './providers/storage/storage';
import { RequestsProvider } from './providers/requests/requests';
import {ComponentsModule} from './components/components.module';
import {GoogleMaps} from '@ionic-native/google-maps/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ComponentsModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

        // Plugin Providers
        HTTP,
        NativeStorage,
        Stripe,
        File,
        FileOpener,
        FirebaseX,
        Geolocation,
        GoogleMaps,
        Camera,
        LaunchNavigator,

        // App providers
        RequestHandlerProvider,
        StorageProvider,
        RequestsProvider,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
