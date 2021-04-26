import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;

  constructor(
    private formB: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toast: ToastrService,
    private errorsService: ErrorsService) { 
    
    this.loginForm = this.formB.group({
      user: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.loading = true;
    const user = this.loginForm.get('user')?.value;
    const pass = this.loginForm.get('password')?.value;

    this.afAuth.signInWithEmailAndPassword(user,pass)
      .then(res =>{

        this.loading = false;
        if(res.user?.emailVerified){
          this.setLocalStorage(res.user);
          this.router.navigate(['/dashboard']);
        }else{
          this.router.navigate(['/user/email-verify']);
        }
        //console.log(res);
      })
      .catch(error => {
        this.loading = false;
        this.toast.error(this.errorsService.errors(error.code), 'Error!');
      });
  }

  setLocalStorage(user: any) {
    const userD: User = {
      uid: user.uid,
      email: user.email
    };

    localStorage.setItem('user',JSON.stringify(userD));
  }

}
