import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private afA: AngularFireAuth,
    private router: Router,
    private toast: ToastrService,
    private errorsService: ErrorsService) { 
      
    this.registerForm = this.fb.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
      passwordR: ['']
    },{ validator: this.passwordValidate});
  }

  ngOnInit(): void {
  }

  register(){
    this.loading = true
    const user = this.registerForm.get('user')?.value;
    const pass = this.registerForm.get('password')?.value;

    this.afA.createUserWithEmailAndPassword(user,pass)
      .then(res => {
        res.user?.sendEmailVerification();
        this.toast.success('Se envio un correo para verificar tu cuenta!', 'Registro usario!');
        this.router.navigate(['/user']);
      })
      .catch(error => {
        this.loading = false;
        this.toast.error(this.errorsService.errors(error.code), 'Error al registrar!');
      });
  }

  // errors(code: string): string {
  //   switch(code){
  //     case 'auth/email-already-in-use':
  //       return 'Otro usuario ya está utilizando el correo electrónico proporcionado.';
      
  //     case 'auth/weak-password':
  //       return 'Contraseña muy débil';

  //     case 'auth/timeout':
  //       return 'El serrvidor tardó en validar la acción'
      
  //     default: return 'Error desconocido';
  //   }
  // }

  passwordValidate(fg: FormGroup): any{
    const pass = fg.controls.password.value;
    const passR = fg.controls.passwordR.value;
    
    return pass === passR ? null : {notSame: true};
  }

}
