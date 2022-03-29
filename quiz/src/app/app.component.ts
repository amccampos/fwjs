import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>Olá mundo!</h1>',
  styles: [`
    h1 {
      text-align: center;
    }
  `]
})
export class AppComponent {
  title = 'quiz';
}
