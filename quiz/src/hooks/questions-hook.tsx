import { useState } from "react";
import { QuestionProps } from "../components/Question";

export function useQuestions() {
  const [questions, setQuestions] = useState<QuestionProps[]>([])

  const createQuestion = (qst: QuestionProps) => {
    setQuestions([...questions, qst])
  }

  const deleteQuestion = (index: number) => {
    setQuestions([
      ...questions.slice(0, index),
      ...questions.slice(index + 1)
    ])
  }

  return { questions, createQuestion, deleteQuestion }
}