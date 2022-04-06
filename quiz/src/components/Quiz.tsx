import React, { useState } from 'react';
import { Question } from './Question';
import { Results } from './Results';
import Tab from "./components/Tab";

const questions = [
  {
    statement: 'Enunciado da 1ª questão',
    options: ['Opção 1.1', 'Opção 1.2', 'Opção 1.3', 'Opção 1.4'],
  },
  {
    statement: 'Enunciado da 2ª questão',
    options: ['Opção 2.1', 'Opção 2.2', 'Opção 2.3', 'Opção 2.4'],
  },
];

export function Quiz() {
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  function confirm() {
    console.log('Confirma resposta');

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  }

  function select(optionIndex: number) {
    console.log(`selecionou a opção ${optionIndex}`);

    const ans = [...answers];
    ans[currentQuestion] = optionIndex;
    setAnswers(ans);
  }

  if(showTab) {
    return <Tab tabOptions={} />
  }
  if (showResults) {
    const ans = answers.map(
      (optionIndex, questionIndex) =>
        questions[questionIndex].options[optionIndex]
    );
    return <Results answers={ans} />;
  } else {
    return (
      <div>
        <div>
          <h3>
            Opção selecionada:{' '}
            {answers[currentQuestion] && answers[currentQuestion]}
          </h3>
        </div>
        <Question
          statement={questions[currentQuestion].statement}
          options={questions[currentQuestion].options}
          onSelection={select}
        />
        <button onClick={confirm}>Confirma resposta</button>
      </div>
    );
  }
}
