import { Component } from "@angular/core"
import { Question } from "./question.component"
import { Answer } from "./results.component"

@Component({
  selector: 'app-quiz',
  template: `
    <div class="quizPane">
      <h1>Quiz</h1>
      <div *ngIf="showResults(); else questionBlock">
        <div class="questionPane">
          <app-results [answers]="answers"></app-results>
        </div>
        <button (click)="reset()">Reinicia</button>
      </div>
      <ng-template #questionBlock>
        <div class="questionPane">
          <div class="questionNumber">
            Questão {{ currentQuestion + 1 }} de {{ questions.length }}
          </div>
          <app-question
            [statement]="questions[currentQuestion].statement"
            [options]="questions[currentQuestion].options"
            [selection]="currentOption"
            (onSelection)="select($event)"
          ></app-question>
        </div>
        <button (click)="confirm()" [disabled]="currentOption === undefined">
          Confirma resposta
        </button>
      </ng-template>
    </div>
  `,
  styles: [`
    .quizPane {
      padding: 50px;
    }
    .questionPane {
      padding: 20px;
      margin: 10px 0;
      border-radius: 10px;
      border: 1px solid #aaa;
      background-color: #f0f0f0;
    }
    .questionNumber {
      font-style: italic;
      font-size: smaller;
    }
  `]
})
export class QuizComponent {
  questions: Question[] = [
    {
      statement: 'Enunciado da 1ª questão',
      options: ['opção 1.1', 'opção 1.2', 'opção 1.3', 'opção 1.4']
    },
    {
      statement: 'Enunciado da 2ª questão',
      options: ['opção 2.1', 'opção 2.2', 'opção 2.3', 'opção 2.4']
    },
  ]
  currentQuestion = 0
  currentOption: number | undefined
  answers: Answer[] = []

  showResults = () => this.currentQuestion >= this.questions.length

  /** Atualiza a opção selecionada pelo usuário. */
  select(optionIndex: number) {
    this.currentOption = optionIndex
  }

  /** Confirma a opção selecionada pelo usuário como resposta da questão atual. */
  confirm() {
    if (this.currentOption !== undefined) {
      const question = this.questions[this.currentQuestion]
      this.answers[this.currentQuestion] = {
        statement: question.statement,
        option: question.options[this.currentOption]
      }
    }
    // depois de confirmar a resposta, vai para próxima questão e cancela a opção selecionada
    this.currentQuestion++
    this.currentOption = undefined
  }

  /** Reinicia o quiz, começando da 1ª questão e sem opção selecionada. */
  reset() {
    this.currentQuestion = 0
    this.currentOption = undefined
  }

}