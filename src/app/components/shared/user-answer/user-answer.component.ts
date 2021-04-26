import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzResponseService } from 'src/app/services/quizz-response.service';

@Component({
  selector: 'app-user-answer',
  templateUrl: './user-answer.component.html',
  styleUrls: ['./user-answer.component.css']
})
export class UserAnswerComponent implements OnInit {

  id: string;
  loading = false;
  quizzPart: any;
  urlB = '';

  constructor(
    private quizzR: QuizzResponseService,
    private activatedR: ActivatedRoute,
    private router: Router
  ) { 

    this.id = this.activatedR.snapshot.paramMap.get('id')!;
    this.urlB = activatedR.snapshot.url[0].path;
  }

  ngOnInit(): void {
    this.getAnswer();
  }

  getAnswer(){
    this.loading = true;
    this.quizzR.getAnswerByid(this.id).subscribe(doc =>{
      if (!doc.exists) {
        this.router.navigate(['/']);
        return;
      }
      this.loading = false;
      this.quizzPart = doc.data();
      //console.log(this.quizzPart);
    }, error =>{
      this.loading = false;
      console.log(error);
    });
  }

  back(){

    if (this.urlB === 'user-answer-admin') {
      this.router.navigate(['/dashboard/performance',this.quizzPart.idQuizz])
    }else{
      this.router.navigate(['/']);
    }
  }

}
