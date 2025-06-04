import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {FullRouterStateSerializer, RouterStateSerializer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {CustomSerializer, effects, reducers} from "./store";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppLayoutModule,
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot(reducers, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
            },
        }),
        EffectsModule.forRoot(effects),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
        StoreRouterConnectingModule.forRoot({
            serializer: FullRouterStateSerializer,
        }),
        ToastModule,
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: RouterStateSerializer, useClass: CustomSerializer},
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
