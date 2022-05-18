import React, { useState } from 'react';
import { Question } from './Question';
import { Results } from './Results';
import './Quiz.css';

export interface QuizProps {
  questions: {
    statement: string
    options: string[]
  }[]
}

export function Quiz({ questions }: QuizProps) {
  const [showResults, setShowResults] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [currentOption, setCurrentOption] = useState<number>()
  const [answers, setAnswers] = useState<number[]>([])

  function confirm() {
    console.log('Confirma resposta')
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setCurrentOption(undefined)
    }
    else {
      setShowResults(true)
    }
  }

  function select(optionIndex: number) {
    setCurrentOption(optionIndex)
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionIndex
    setAnswers(newAnswers)
  }

  function reset() {
    setCurrentOption(undefined)
    setCurrentQuestion(0)
    setShowResults(false)
  }

  const questionMode = questions.length > 0 ? (
    <div>
      <div className="questionPane">
        <div className="questionNumber">
          Questão { currentQuestion + 1 } de { questions.length }
        </div>
        <Question
          statement={ questions[currentQuestion].statement }
          options={ questions[currentQuestion].options }
          onSelection={ select }
          selection={ currentOption }
        />
      </div>
      <button onClick={ confirm } disabled={ currentOption === undefined }>Confirma resposta</button>
    </div>
  ) : <div>Não há questão</div>

  const statementString = questions.map(qst => qst.statement)
  const answerString = answers.map((optionIndex, questionIndex) => questions[questionIndex].options[optionIndex])
  const resultsMode = (
    <div>
      <div className="questionPane">
        <Results statements={ statementString } answers={ answerString }/>
      </div>
      <button onClick={ reset }>Reinicia</button>
    </div>
  )
  
  return (
    <div className="quizPane">
      <h1>Quiz</h1>
      { showResults ? resultsMode : questionMode }
    </div>
  )    
}