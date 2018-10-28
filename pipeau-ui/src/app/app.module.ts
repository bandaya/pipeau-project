import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularMaterialImportModule} from "./core/angular-material-import/angular-material-import.module";
import {HeaderModule} from "./core/header/header.module";
import {AppRoutingModule} from "./app.routing.module";
import {DashboardModule} from "./features/dashboard/dashboard.module";
import {ProfilesModule} from "./features/profiles/profiles.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LambdasModule} from "./features/lambdas/lambdas.module";
import {PipesModule} from "./shared/pipes/pipes.module";
import {CloudwatchLogViewerPipe} from "./shared/pipes/cloudwatch-log-viewer.pipe";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    AppRoutingModule,

    HeaderModule,
    DashboardModule,
    ProfilesModule,
    LambdasModule,

    PipesModule,
    //to disable animations:
    //NoopAnimationsModule
  ],
  providers: [CloudwatchLogViewerPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
