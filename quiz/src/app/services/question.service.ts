import { Injectable } from "@angular/core";

export class Question {
  selection?: number // índice da opção selecionada, se houver

  constructor(
    public statement: string = '',             // enunciado obrigatório
    public type: 'text' | 'choice' = 'text',   // tipo default
    public options: string[] = ['sim', 'não'], // opções default
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questions: Question[] = []

  add(question: Question) {
    this.questions.push(question)
  }

  delete(index: number) {
    this.questions.splice(index, 1)
  }

  update(index: number, question: Question) {
    this.questions[index] = question
  }
}