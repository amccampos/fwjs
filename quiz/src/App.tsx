import React, { createContext, useContext, useState } from 'react';
import './App.css';
import { Question, QuestionProps } from './components/Question';
import { QuestionForm } from './components/QuestionForm';
import { Quiz } from './components/Quiz';
import { useQuestions } from './hooks/questions-hook';

let emptyQuestion: QuestionProps = {
  statement: 'asfsdfsdf',
  options: ['asfhsdf', 'sdkgsdjf']
}

// const QuestionContext = createContext(emptyQuestion)

const QuestionsContext = createContext<QuestionProps[]>([])

// function QuestionWrapper() {
//   const question = useContext(QuestionContext)
//   return <Question {...question} />
// }


function QuestionList() {
  const qstList = useContext(QuestionsContext)
  return <div>
    { qstList.map(qst => <Question {...qst} />) }
  </div>
}

function App() {
  const { questions, createQuestion, deleteQuestion } = useQuestions()
  // const [question, setQuestion] = useState(emptyQuestion)

  function updateQuestion(qst: QuestionProps) {
    createQuestion(qst)
  }

  // const questionList = questions.map(qst => <Question {...qst} />)

  return (
    <QuestionsContext.Provider value={questions}>
      <QuestionForm onSubmit={updateQuestion} />
      <QuestionList />
    </QuestionsContext.Provider>
  )
}

export default App;
