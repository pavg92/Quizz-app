import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/models/question.model';
import { QuizzService } from 'src/app/services/quizz.service';
import { nanoid } from 'nanoid';
import { Quizz } from 'src/app/models/quizz.model';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {

  questions: Question[] = [];
  titleQuizz: string;
  descrip: string;
  loading = false;

  constructor(
    private quizzServ: QuizzService,
    private router: Router,
    private toast: ToastrService
  ) { 
    this.quizzServ.getQuestions().subscribe(data => {
      this.questions.push(data);
      //console.log(this.questions);
    });

    this.titleQuizz = this.quizzServ.title;
    this.descrip = this.quizzServ.descrip;
  }

  ngOnInit(): void {

    if (this.titleQuizz === '' || this.descrip === '') {
      this.router.navigate(['/dashboard']);
    }
  }

  deleteQuestion(index: number) {
    this.questions.splice(index,1);
  }

  finishQuizz(){
    this.loading = true;
    const user = JSON.parse(localStorage.getItem('user')||'{}');
    const codeQ = nanoid(6).toUpperCase();
    const quizz: Quizz = {
      uid: user.uid,
      title: this.titleQuizz,
      descrip: this.descrip,
      code: codeQ,
      questionCount: this.questions.length,
      creationDate: new Date(),
      listQuestion: this.questions
    };

    //console.log(quizz);
    this.quizzServ.createQuizz(quizz)
      .then(data =>{
        this.toast.success('El quizz se ha creado correctamente', 'Quizz creado');
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        this.loading = false;
        console.log(error)

      });
  }

}
