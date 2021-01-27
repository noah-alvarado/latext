import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn$: Observable<boolean>;

  get user(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router
  ) {
    this.isLoggedIn$ = this.fireauth.user.pipe(map(user => !!user));
  }

  signIn() {
    this.fireauth.useDeviceLanguage();
    this.fireauth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => this.router.navigate(['editor']))
      .catch(() => alert('Error, please try logging in again.'));
  }

  signOut() {
    this.fireauth.signOut();
    this.router.navigate(['auth']);
  }

}
