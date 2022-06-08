import { writable } from "svelte/store"

export interface QuestionType {
  statement: string  // enunciado da questão
  options: string[]  // opções da questão
  qstType: 'choice' | 'text'
}

const { update, subscribe } = writable([])

function add(question: QuestionType) {
  update(list => {
    list.push(question)
    return list
  })
}

function change(index: number, question: QuestionType) {
  update(list => {
    list[index] = question
    return list
  })
}

function remove(index: number) {
  update(list => {
    list.splice(index, 1)
    return list
  })
}

export const questions = {
  add,
  change,
  remove,
  subscribe
}