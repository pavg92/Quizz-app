import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { QuizzResponseService } from 'src/app/services/quizz-response.service';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit, OnDestroy {

  loading= false;
  listAnswerPart: any[] = [];
  quizzSub: Subscription = new Subscription()
  id: string;

  constructor(
    private activatedR: ActivatedRoute,
    private quizzR: QuizzResponseService,
    private toast: ToastrService
  ) { 

    this.id = this.activatedR.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getAnswerByIdQ();
  }

  ngOnDestroy() {
    this.quizzSub.unsubscribe();
  }

  getAnswerByIdQ(){
    this.loading= true
    this.quizzSub = this.quizzR.getAnswersByQuizzId(this.id).subscribe(data => {
      this.loading = false;
      this.listAnswerPart = [];
      data.forEach((element: any) => {
        this.listAnswerPart.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    }, error => {
      this.loading = false;
      console.log(error);
    })
  }

  deleteAnswersPart(id: string) {
    this.loading = true;
    this.quizzR.deleteAnswersPart(id)
      .then(res =>{
        this.loading = false;
        this.toast.success('Respuestas eliminadas correctamente', 'Respuestas Eliminadas');
      })
      .catch(error =>{
        this.loading = false;
        this.toast.error('Ocurrio un error, intente nuevamente', 'Error');
      });
  }

}
