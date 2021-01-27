import { Component } from '@angular/core';

@Component({
  selector: 'pncl-root',
  template: `
  <pncl-header></pncl-header>
  <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'latext';
}
