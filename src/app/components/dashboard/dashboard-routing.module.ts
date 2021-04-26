import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAnswerComponent } from '../shared/user-answer/user-answer.component';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';
import { NewQuizzComponent } from './new-quizz/new-quizz.component';
import { PerformanceComponent } from './performance/performance.component';
import { QuizzListComponent } from './quizz-list/quizz-list.component';
import { QuizzComponent } from './quizz/quizz.component';

const routes: Routes = [
  { path: '', component: QuizzListComponent},
  { path: 'new-quizz', component: NewQuizzComponent},
  { path: 'create-questions', component: CreateQuestionsComponent},
  { path: 'quizz/:id', component: QuizzComponent},
  { path: 'performance/:id', component: PerformanceComponent},
  { path: 'user-answer-admin/:id', component: UserAnswerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
