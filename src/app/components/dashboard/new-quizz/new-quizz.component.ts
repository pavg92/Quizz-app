import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-new-quizz',
  templateUrl: './new-quizz.component.html',
  styleUrls: ['./new-quizz.component.css']
})
export class NewQuizzComponent implements OnInit {

  newQuizzForm: FormGroup;
  error = false

  constructor(
    private fb: FormBuilder,
    private quizzServ: QuizzService,
    private router: Router) { 

    this.newQuizzForm = this.fb.group({
      title: ['',[Validators.required]],
      descrip: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  next(){
    //console.log(this.newQuizzForm);
    if(this.newQuizzForm.valid){
      this.quizzServ.title = this.newQuizzForm.get('title')?.value;
      this.quizzServ.descrip = this.newQuizzForm.get('descrip')?.value;
      this.router.navigate(['/dashboard/create-questions']);

    }else{
      this.error = true;
      setTimeout(() => this.error = false, 3000);
    }
  }

}
