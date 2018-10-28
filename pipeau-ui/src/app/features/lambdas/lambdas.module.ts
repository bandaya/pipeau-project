import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LambdasComponent} from './lambdas.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {PipesModule} from "../../shared/pipes/pipes.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PipesModule
  ],
  declarations: [LambdasComponent]
})
export class LambdasModule { }
