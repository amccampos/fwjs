import { Component } from "@angular/core";
import { QuestionService } from "../services/question.service";

@Component({
  selector: 'app-question-form',
  template: `
  <app-test></app-test>
  <form #questionForm="ngForm" (ngSubmit)="questionForm.valid && onSubmit()">
    <div>
      <label>Enunciado</label>
      <input #stat="ngModel" [(ngModel)]="statement" name="statement" required minlength="3" />
      <div *ngIf="stat.touched && stat.errors" class="errors">
        <div *ngIf="stat.errors['required']">
          Este campo é necessário
        </div>
        <div *ngIf="stat.errors['minlength']">
          Digite pelo menos 3 caracteres
        </div>
      </div>
    </div>
    <input type="submit" value="Cadastrar" />
  </form>
  `,
  styles: [`
    .errors {
      color: red;
    }
    input.ng-touched.ng-invalid {
      border-color: red;
      font-style: italic;
    }
  `]
})
export class QuestionFormComponent {
  statement: string = ''

  constructor(public qstService: QuestionService) {
    console.log(qstService.name)
  }

  onSubmit() {
    console.log(this.statement)
    this.qstService.name = this.statement
  }
}