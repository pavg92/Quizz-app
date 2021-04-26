import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizzResponseService } from 'src/app/services/quizz-response.service';

@Component({
  selector: 'app-set-name',
  templateUrl: './set-name.component.html',
  styleUrls: ['./set-name.component.css']
})
export class SetNameComponent implements OnInit {

  loading = false;
  name = '';
  error = false;
  errorText = ''; 

  constructor(
    private quizzR: QuizzResponseService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.validateRefresh();
  }

  nameValid() {
    if (this.name === '') {
      this.errorText = 'Por favor ingrese su nombre';
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 3000);
      return
    }
    //console.log('aui');
    this.quizzR.namePart = this.name;
    this.router.navigate(['/play/count']);


  }

  validateRefresh() {
    if (this.quizzR.quizz === undefined) {
      this.router.navigate(['/']);
    }
  }

}
