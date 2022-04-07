import React, { useState } from 'react';
import { Question } from './Question';
import { Results } from './Results';
import './Quiz.css';

const questions = [
  {
    statement: 'Enunciado da 1ª questão',
    options: ['Opção 1.1', 'Opção 1.2', 'Opção 1.3', 'Opção 1.4']
  },
  {
    statement: 'Enunciado da 2ª questão',
    options: ['Opção 2.1', 'Opção 2.2', 'Opção 2.3', 'Opção 2.4']
  },
]

export function Quiz() {
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

  const questionMode = (
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
  )

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