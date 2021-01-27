import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './shared/services/auth.service';
import { UserContentService } from './shared/services/user-content.service';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  providers: [
    AuthService,
    UserContentService
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private fireauth: AngularFireAuth) {
    this.fireauth.onAuthStateChanged(user => this.setUser(user));
  }

  private setUser(user: any) {
    localStorage.removeItem('user');

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }
}
