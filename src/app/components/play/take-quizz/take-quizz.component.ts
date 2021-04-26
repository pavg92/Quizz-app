import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quizz } from 'src/app/models/quizz.model';
import { QuizzResponseService } from 'src/app/services/quizz-response.service';

@Component({
  selector: 'app-take-quizz',
  templateUrl: './take-quizz.component.html',
  styleUrls: ['./take-quizz.component.css']
})
export class TakeQuizzComponent implements OnInit, OnDestroy {
  
  quizz!: Quizz;
  namePart = '';
  indexQ = 0;
  segQ = 0;
  interval: any;
  answerPart: any;
  indexSelect: any;
  listAnswer: any[] =[];
  correctAnswers = 0
  wrongAnswers = 0;
  totalPoints = 0;
  loading = false;

  constructor(
    private quizzR : QuizzResponseService,
    private router : Router
  ) { }

  ngOnInit(): void {

    this.quizz = this.quizzR.quizz;
    this.namePart = this.quizzR.namePart;
    this.validateRefresh();
    this.startCount();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  validateRefresh() {
    if (this.quizz === undefined) {
      this.router.navigate(['/'])
    }
  }

  getSeconds(): number {
    return this.segQ;
  }

  getTitle(): string {
    return this.quizz.listQuestion[this.indexQ].title;
  }

  startCount(){
    this.segQ = this.quizz.listQuestion[this.indexQ].seg;

    this.interval = setInterval(() => {
      if (this.segQ === 0) {
        this.setAnswer();
      }
      this.segQ--;
    },1000);
  }

  answerSelect(answer: any, index: number) {
    this.answerPart = answer;
    this.indexSelect = index;
  }

  

  setAnswer() {
    this.correctWrongAnswer();
    const answerPart: any = {
      title: this.quizz.listQuestion[this.indexQ].title,
      pointsOb: this.obtPoints(),
      seg: this.obtSeg(),
      indexAnswerSelect: this.obtIndexSelect(),
      listAnswer: this.quizz.listQuestion[this.indexQ].listAnswer
    }

    this.listAnswer.push(answerPart);
    this.answerPart = undefined;
    this.indexSelect = undefined

    if (this.quizz.listQuestion.length -1 === this.indexQ ) {
      this.saveQuizz();
    }else{
      this.indexQ++;
      clearInterval(this.interval);
      this.startCount();
    }
  }

  addClassSelect(answer: any): string {
    if (answer === this.answerPart) {
      return 'select';
    }else{
      return '';
    }
  }

  obtPoints(): number {
    if (this.answerPart === undefined) {
       return 0; 
    }

    const answerPoints = this.quizz.listQuestion[this.indexQ].points;
    if (this.answerPart.isCorrect) {
      this.totalPoints += answerPoints;
      return answerPoints;
    }else {
      return 0;
    }
  }

  obtSeg(): string {
    if (this.answerPart === undefined) {
      return 'NO RESPONDIO'; 
    }else {
      const answerSeg = this.quizz.listQuestion[this.indexQ].seg;
      const partSeg = answerSeg - this.segQ;
      return partSeg.toString();
    }
  }

  obtIndexSelect(): any {
    if (this.answerPart === undefined) {
      return ''; 
    }else {
      return this.indexSelect;
    }
  }

  correctWrongAnswer() {
    if (this.answerPart === undefined) {
      this.wrongAnswers++;
      return; 
    }

    if (this.answerPart.isCorrect) {
      this.correctAnswers++;
    }else{
      this.wrongAnswers++;
    }
  }

  saveQuizz() {
    this.loading = true;
    const quizzPart= {
      idQuizz: this.quizz.id,
      namePart: this.namePart,
      date: new Date(),
      questionCount: this.quizz.questionCount,
      correctAnswers: this.correctAnswers,
      wrongAnswers: this.wrongAnswers,
      totalPoints: this.totalPoints,
      listAnswer: this.listAnswer
    }
    //console.log(quizzPart);
    this.quizzR.setPartQuizz(quizzPart)
      .then(data =>{
        this.router.navigate(['/play/user-answer',data.id]);  
      })
      .catch(error => {
        this.router.navigate(['/'])} );
  }

}
