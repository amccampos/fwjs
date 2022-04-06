import React from 'react';
import './Tab.css';

interface TabProps {
  statement: string;
  options: string[];
  onSelection: Function;
}

export function Tab(props: TabProps) {
  const buttons = props.options.map((txt, index) => (
    <button key={txt} onClick={() => props.onSelection(index)}>
      {txt}
    </button>
  ));

  return (
    <div className="question">
      <div className="question-options">{buttons}</div>
      <div className="question-text">
        <p>{props.statement}</p>
      </div>
    </div>
  );
}
