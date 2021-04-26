import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAnswerComponent } from '../shared/user-answer/user-answer.component';
import { InitialCountComponent } from './initial-count/initial-count.component';
import { SetNameComponent } from './set-name/set-name.component';
import { TakeQuizzComponent } from './take-quizz/take-quizz.component';

const routes: Routes = [
  { path: '', component: SetNameComponent},
  { path: 'count', component: InitialCountComponent},
  { path: 'take-quizz', component: TakeQuizzComponent},
  { path: 'user-answer/:id', component: UserAnswerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
