import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { QuizzListComponent } from './quizz-list/quizz-list.component';
import { NewQuizzComponent } from './new-quizz/new-quizz.component';
import { SharedModule } from '../shared/shared.module';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuizzComponent } from './quizz/quizz.component';
import { PerformanceComponent } from './performance/performance.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavBarComponent,
    QuizzListComponent,
    NewQuizzComponent,
    CreateQuestionsComponent,
    QuestionsListComponent,
    QuizzComponent,
    PerformanceComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
