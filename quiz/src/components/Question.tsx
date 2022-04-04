import React from 'react';
import './Question.css';

interface QuestionProps {
  statement: string
  options: string[]
}

export function Question(props: QuestionProps) {
  const buttons = props.options.map(txt => <button>{ txt }</button>)
  
  return (
    <div>
      <h1>{ props.statement }</h1>
      { buttons }
    </div>
  )
}