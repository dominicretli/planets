import { NgModule } from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {PlanetService} from './services/planet-service/planet.service';
import { PlanetListComponent } from './components/planet-list/planet-list.component';
import { DecimalSpacePipe } from './pipes/decimal-space.pipe';
import { UnknownToQuestionMarkPipe } from './pipes/unknown-to-question-mark.pipe';

@NgModule({
  declarations: [
    PlanetListComponent,
    DecimalSpacePipe,
    UnknownToQuestionMarkPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    PlanetListComponent
  ],
  providers: [
    PlanetService,
    DecimalPipe
  ]
})
export class PlanetsModule { }
