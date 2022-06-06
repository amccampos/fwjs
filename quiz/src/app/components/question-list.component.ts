import { Component } from "@angular/core";
import { Question, QuestionService } from "../services/question.service";

@Component({
  selector: 'app-question-list',
  template: `
    <app-question-form (onSubmit)="addQuestion($event)"></app-question-form>
    <div class="box" *ngFor="let question of questionService.questions; index as i">
      <button class="erase" (click)="deleteQuestion(i)">X</button>
      <app-question
        [statement]="question.statement"
        [options]="question.options"
      >
      </app-question>
    </div>
  `,
  styles: [`
    .box {
      padding: 10px;
      border: 1px solid #aaf;
      border-radius: 5px;
      margin: 10px;
    }
    .erase {
      float: right;
      z-index: 2;
    }
  `]
})
export class QuestionListComponent {
  constructor(public questionService: QuestionService) {}

  addQuestion(question: Question) {
    this.questionService.add(question)
  }

  deleteQuestion(index: number) {
    this.questionService.delete(index)
  }
}