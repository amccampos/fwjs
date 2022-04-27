import {Component} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  abaSelecionada: number = 0

  select(optionIndex: number) {
    this.abaSelecionada = optionIndex
  }

}
