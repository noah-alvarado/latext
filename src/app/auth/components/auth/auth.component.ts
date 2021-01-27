import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'pncl-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(private auth: AuthService) { }

  signIn(): void {
    this.auth.signIn();
  }

}
