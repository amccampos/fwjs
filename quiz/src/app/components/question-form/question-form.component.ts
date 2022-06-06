import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Question, QuestionService } from "../../services/question.service";

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent {
  @Input() question: Question = new Question()
  @Output() onSubmit = new EventEmitter()
  @ViewChild(NgForm) form!: NgForm

  constructor(public qstService: QuestionService) {
  }

  submit() {
    this.onSubmit.emit({
      statement: this.question.statement,
      type: this.question.type,
      options: [...this.question.options]
    })
    this.form.reset()
    this.question = new Question()
  }

  trackByFn(index: number) {
    return index;  
  }
}