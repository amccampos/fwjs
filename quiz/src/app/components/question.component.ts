import { Component, EventEmitter, Input, Output } from "@angular/core"

export interface Question {
  statement: string  // enunciado da questão
  options: string[]  // opções da questão
  selection?: number // índice da opção selecionada, se houver
}

@Component({
  selector: 'app-question',
  template: `
    <h2>{{ statement }}</h2>
    <button *ngFor="let option of options; let i = index"
      [ngClass]="{ selected: i === selection }"
      (click)="onSelection.emit(i)">
      {{ option }}
    </button>
  `,
  styles: [`
    h2 {
      font-weight: normal;
      font-size: 20pt;
      margin-top: 0;
    }
    button {
      margin-right: 10px;
      background-color: #ccc;
      border: 1px solid rgb(118, 118, 118);
      border-radius: 3px;
      padding: 2px 5px;
    }
    .selected {
      font-weight: bold;
      background-color: #aaa;
    }
  `]
})
export class QuestionComponent {
   @Input() statement!: string    // enunciado da questão
   @Input() options!: string[]    // opções da questão
   @Input() selection?: number    // índice da opção selecionada, se houver
   @Output() onSelection = new EventEmitter<number>() // quando o usuário selecionar uma opção, passa seu índice
}