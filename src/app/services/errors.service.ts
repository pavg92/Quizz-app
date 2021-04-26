import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor() { }

  errors(code: string): string {
    switch(code){
      case 'auth/email-already-in-use':
        return 'Otro usuario ya está utilizando el correo electrónico proporcionado.';
      
      case 'auth/weak-password':
        return 'Contraseña muy débil';

      case 'auth/timeout':
        return 'El serrvidor tardó en validar la acción';

      case 'auth/user-not-found':
        return 'Usuario desconocido';

      case 'auth/wrong-password':
        return 'Contraseña incorrecta';

      case 'auth/invalid-email':
        return 'Correo invalido';
      
      default: return 'Error desconocido';
    }
  }
}
