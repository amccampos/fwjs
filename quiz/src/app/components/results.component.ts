import { Component, Input } from "@angular/core"

/** Dados da resposta de uma questão. */
export interface Answer {
  statement: string  // enunciado da questão
  option: string     // resposta da opção escolhida
}

@Component({
  selector: 'app-results',
  template: `
    <div class="questionResult" *ngFor="let answer of answers; let i = index">
      <h3>Questão {{ i + 1 }}</h3>
      {{ answer.statement }}: {{ answer.option }}
    </div>
  `,
  styles: [`
    .questionResult + .questionResult {
      margin-top: 10px;
    }
    .questionResult h3 {
      margin: 0;
    }
  `]
})
export class ResultsComponent {
  @Input() answers!: Answer[]
}