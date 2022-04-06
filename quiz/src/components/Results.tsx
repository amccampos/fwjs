import React from 'react';

interface resultProps {
  answers: string[];
}

export function Results(props: resultProps) {
  const ans = props.answers.map((txt) => <li key={txt}>{txt}</li>);
  return (
    <div>
      <h1>Resultados</h1>
      <ul>{ans}</ul>
    </div>
  );
}
