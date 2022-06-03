import { Component } from "@angular/core";
import { QuestionService } from "../services/question.service";

@Component({
  selector: 'app-test',
  template: '{{ qstService.name }}'
})
export class TestComponent {
  constructor(public qstService: QuestionService) {}
}