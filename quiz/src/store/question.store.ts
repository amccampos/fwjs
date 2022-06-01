import { reactive } from "vue"

export interface QuestionType {
  statement: string  // enunciado da questão
  options: string[]  // opções da questão
  qstType: 'choice' | 'text'
}

export interface QuestionStore {
  questions: QuestionType[]
  add: (qst: QuestionType) => void
  update: (index: number, qst: QuestionType) => void
  delete: (index: number) => void
}

export const questionStore = reactive<QuestionStore>({
  questions: reactive<QuestionType[]>([]),

  add(qst: QuestionType) {
    const newQst = {...qst}
    newQst.options = [...qst.options]
    this.questions.push(newQst)
  },

  update(index: number, qst: QuestionType) {
    this.questions[index] = {...qst}
  },

  delete(index: number) {
    this.questions.splice(index, 1)
  }
})
