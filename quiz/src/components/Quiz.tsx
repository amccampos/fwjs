import React, { useState } from 'react';
import { Question } from './Question';
import { Results } from './Results';

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
  const showResults = false
  const [currentQuestion, setCurrentQuestion] = useState(0)

  function confirm() {
    console.log('Confirma resposta')
    setCurrentQuestion(currentQuestion + 1)
  }
  
  if (showResults) {
    return <Results />
  }
  else {
    return <div>
      <Question
      statement={ questions[currentQuestion].statement }
      options={ questions[currentQuestion].options }
      />
      <button onClick={ confirm }>Confirma resposta</button>
    </div>
  }
}