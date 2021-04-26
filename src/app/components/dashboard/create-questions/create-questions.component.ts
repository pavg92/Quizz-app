import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Answer } from 'src/app/models/answer.model';
import { Question } from 'src/app/models/question.model';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.css']
})
export class CreateQuestionsComponent implements OnInit {

  createForm: FormGroup;
  error = false;

  constructor(
    private quizzServ: QuizzService,
    private fb: FormBuilder,
    private toast: ToastrService
  ) { 

    this.createForm = this.fb.group({
      title: ['', Validators.required],
      seg: [10, Validators.required],
      points: [1000, Validators.required],
      answer1: this.fb.group({
        title: ['', Validators.required],
        isCorrect: [false, Validators.required]
      }),
      answer2: this.fb.group({
        title: ['', Validators.required],
        isCorrect: [false, Validators.required]
      }),
      answer3: this.fb.group({
        title: [''],
        isCorrect: false
      }),
      answer4: this.fb.group({
        title: [''],
        isCorrect: false
      })
    });
  }

  ngOnInit(): void {

    //console.log(this.quizzServ.title,this.quizzServ.descrip);
  }

  get getSeg(){ return this.createForm.get('seg')?.value; }

  get getPoints() { return this.createForm.get('points')?.value; }

  minPlus(num: number){

    if(this.getSeg + num < 5){
      return;
    }
    this.createForm.patchValue({
      seg: this.getSeg + num
    });
    
  }

  correctAnswer(answer: string) {
    const array = ['answer1','answer2','answer3','answer4'];
    const isCorrect = this.getIsCorrect(answer);
    this.createForm.get(answer)?.patchValue({
      isCorrect: !isCorrect
    });

    for (let i = 0; i < array.length; i++) {

      if(array[i] !== answer){
        
        this.createForm.get(array[i])?.patchValue({
          isCorrect: false
        });
      }
    }
  }

  getIsCorrect(answer: string) {
    return this.createForm.get(answer)?.get('isCorrect')?.value;
  }

  createQuestion() {
    
    if (this.createForm.invalid || this.allWrong()) {
      this.showError();
      return
    }
    const array = ['answer1','answer2','answer3','answer4'];
    const questionT = this.createForm.get('title')?.value;
    const questionS = this.createForm.get('seg')?.value;
    const questionP = this.createForm.get('points')?.value;
    let anserArray: Answer[] = [];
    let question: Question; 
    //console.log(this.createForm);

    for (let i = 0; i < array.length; i++) {
      const ans = this.createForm.get(array[i])?.get('title')?.value;
      const correct = this.createForm.get(array[i])?.get('isCorrect')?.value
      if (ans !== '') {
        anserArray.push({
          title: ans,
          isCorrect: correct
        });
      }
    }

    question = {
      title: questionT,
      seg: questionS,
      points: questionP,
      listAnswer: anserArray
    };
    this.quizzServ.addQuestion(question);
    this.reset();
    this.toast.success('Se agrego la pregunta correctamente', 'Pregunta Agregada');
    //console.log(question);
  }

  reset(){
    this.createForm.patchValue({
      title: '',
      seg: 10,
      points: 1000,
      answer1: {
        title: '',
        isCorrect: false
      },
      answer2: {
        title: '',
        isCorrect: false
      },
      answer3: {
        title: '',
        isCorrect: false
      },
      answer4: {
        title: '',
        isCorrect: false
      }
    });
  }

  showError() {
    this.error = true;

    setTimeout(() => {
      this.error = false;
    }, 3000);
  }

  allWrong() {
    const array = ['answer1','answer2','answer3','answer4'];
    for (let i = 0; i < array.length; i++) {
      if (this.createForm.get(array[i])?.get('isCorrect')?.value && this.createForm.get(array[i])?.get('title')?.value !== '') {
        return false;
        
      }
    }
    return true;
  }

}
