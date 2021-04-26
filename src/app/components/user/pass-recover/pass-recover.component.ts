import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-pass-recover',
  templateUrl: './pass-recover.component.html',
  styleUrls: ['./pass-recover.component.css']
})
export class PassRecoverComponent implements OnInit {

  recoverForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private afA: AngularFireAuth,
    private router: Router,
    private toast: ToastrService,
    private errorsService: ErrorsService) { 
    
      this.recoverForm = this.fb.group({
      user: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  recover(){
    this.loading = true
    const user = this.recoverForm.get('user')?.value;

    this.afA.sendPasswordResetEmail(user)
      .then(()=>{
        this.toast.success('Enviamos un correo para recuperar tu contraseña','Recuperar contraseña')
        this.router.navigate(['/user']);
      })
      .catch(error => {
        console.log(error);
        this.loading = false;
        this.toast.error(this.errorsService.errors(error.code),'Error')
      })
  }

}
