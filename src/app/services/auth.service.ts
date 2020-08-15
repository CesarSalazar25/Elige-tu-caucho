import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { User } from 'src/app/models/user';
import {switchMap} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  User: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router, private toastr: ToastrService) 
  { 
    
    this.User = this.afAuth.authState.pipe(switchMap(User => 
      {
        if( User )
        {
          return this.firestore.doc<User>(`users/${User.uid}`).valueChanges();
        }
        else 
        {
          return of(null);
          this.toastr.error("Datos inválidos");
        }
      }))
  }

  public emailAndPassword(email, password)
  {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public signOut() 
  {
    this.afAuth.auth.signOut().then(() => 
    this.router.navigate(['/home']));
    this.toastr.success('Se ha cerrado la sesión exitosamente.');
  }
  
  public ForgotPassword(email)
  {
    this.afAuth.auth.sendPasswordResetEmail(email).then(function() {
    }).catch(function(error) {
      this.toastr.error('No se puedo enviar el mensaje a su correo.');
    });
  }

}
