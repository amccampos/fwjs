import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  name: string = 'default'
  questions: string[] = []

  add() {}
  delete() {}
  update() {}
}