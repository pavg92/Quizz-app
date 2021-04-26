import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quizz } from 'src/app/models/quizz.model';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  idQuiz: string = ''
  loading = false;
  quizz: Quizz | undefined;

  constructor(
    private quizzServ: QuizzService,
    private aRoute: ActivatedRoute
  ) { 
    
  }

  ngOnInit(): void {
    this.loading = true;
    this.idQuiz = this.aRoute.snapshot.paramMap.get('id') || '';
    this.quizzServ.getQuizzById(this.idQuiz).subscribe(doc => {
      //console.log(doc.data());
      this.quizz = doc.data();
      this.loading = false
    })
  }

}
