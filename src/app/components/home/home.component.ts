import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Quizz } from 'src/app/models/quizz.model';
import { QuizzResponseService } from 'src/app/services/quizz-response.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  error: boolean = false;
  loading = false
  quizzSub: Subscription = new Subscription();
  errorText = '';
  code ='';

  constructor(
    private quizzR: QuizzResponseService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.quizzSub.unsubscribe();
  }

  pinValid() {
    //valida si ingresa pin
    if(this.code == ''){
      this.errorCode('Por favor ingrese un código');
      return;
    }
    this.loading = true;
    this.quizzSub = this.quizzR.searchByCode(this.code).subscribe(data => {
      //console.log(data);
      if (data.empty) {
        this.loading = false;
        this.errorCode('Código invalido');
        
      }else{
        data.forEach((element:any) => {
          const quizz: Quizz = {
            id: element.id,
            ...element.data()
          }
          //console.log(quizz);
          this.quizzR.quizz = quizz;
          this.router.navigate(['/play']);
        });
      }
    })
  }

  errorCode(mesage: string){
    this.error = true;
    this.errorText = mesage;
    setTimeout(() => {
      this.error = false;
    }, 3000);
  }

}
