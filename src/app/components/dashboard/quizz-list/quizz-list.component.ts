import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Quizz } from 'src/app/models/quizz.model';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-quizz-list',
  templateUrl: './quizz-list.component.html',
  styleUrls: ['./quizz-list.component.css']
})
export class QuizzListComponent implements OnInit, OnDestroy {
  
  subscribeUser: Subscription = new Subscription();
  subscribeQuizz: Subscription = new Subscription();
  quizzArray: Quizz[] = [];
  loading = false;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private quizzServ: QuizzService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.subscribeUser = this.afAuth.user.subscribe(user =>{
      //console.log(user);
      if (user && user.emailVerified) {
        this.getQuizz(user.uid);
      }else{
        this.router.navigate(['/']);
      }
    });
    
  }

  ngOnDestroy() {
    this.subscribeUser.unsubscribe();
    this.subscribeQuizz.unsubscribe();
  }

  getQuizz(uid: string){
    this.loading = true;
    this.subscribeQuizz = this.quizzServ.getQuizzByUserId(uid).subscribe(data => {
      this.loading = false;
      this.quizzArray = [];
      data.forEach((element:any) => {
        this.quizzArray.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
        
        //console.log(this.quizzArray)
      });
    },error => {
      this.loading = false;
      console.log(error);
    });
  }

  deleteQuizz(id: string){
    this.quizzServ.deleteQuizz(id)
      .then(data =>{
        this.toast.error('El quizz se elimino con éxito', 'Quizz Eliminado');
      })
      .catch(error =>{
        this.toast.error('Ocurrio un error', 'Error');
      })
  }

}
