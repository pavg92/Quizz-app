import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';
import { InitialCountComponent } from './initial-count/initial-count.component';
import { SetNameComponent } from './set-name/set-name.component';
import { TakeQuizzComponent } from './take-quizz/take-quizz.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    InitialCountComponent,
    SetNameComponent,
    TakeQuizzComponent
  ],
  imports: [
    CommonModule,
    PlayRoutingModule,
    SharedModule
  ]
})
export class PlayModule { }
