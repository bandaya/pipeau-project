import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularMaterialImportModule} from "./core/angular-material-import/angular-material-import.module";
import {HeaderModule} from "./core/header/header.module";
import {AppRoutingModule} from "./app.routing.module";
import {DashboardModule} from "./features/dashboard/dashboard.module";
import {ProfilesModule} from "./features/profiles/profiles.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    AppRoutingModule,

    DashboardModule,
    ProfilesModule,
    FormsModule,
    ReactiveFormsModule,
    //to disable animations:
    //NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
