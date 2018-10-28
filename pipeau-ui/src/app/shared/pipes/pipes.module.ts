import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CloudwatchLogViewerPipe} from "./cloudwatch-log-viewer.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CloudwatchLogViewerPipe],
  exports: [
    CloudwatchLogViewerPipe
  ],
})
export class PipesModule { }
