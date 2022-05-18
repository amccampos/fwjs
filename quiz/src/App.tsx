import React from 'react';
import './App.css';
import { Quiz } from './components/Quiz';

function App() {
  return <Quiz questions={[
    {
      statement: 'Enunciado da 1ª questão',
      options: ['a', 'b', 'c']
    }
  ]} />
}

export default App;
