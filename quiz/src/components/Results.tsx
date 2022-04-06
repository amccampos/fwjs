import React from 'react';

interface ResultsProps {
  answers: string[]
}

export function Results(props: ResultsProps) {
  const answersList = props.answers.map(txt => <li key={ txt }>{ txt }</li>)
  return (
    <div>
      <h1>Resultados</h1>
      <ul>
        { answersList }
      </ul>
    </div>
  )
}