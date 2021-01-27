import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

interface ViewModel {
  isLoggedIn: boolean;
}

@Component({
  selector: 'pncl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  viewModel$: Observable<ViewModel>;

  constructor(private auth: AuthService) {
    this.viewModel$ = auth.isLoggedIn$.pipe(map(isLoggedIn => ({isLoggedIn})));
  }

  signOut() {
    this.auth.signOut();
  }

}
