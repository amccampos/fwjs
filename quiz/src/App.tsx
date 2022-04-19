import React, { useState } from 'react';
import './App.css';
import { Quiz } from './components/Quiz';
import { Tabs } from './components/Tabs';

function App() {
  const [showQuiz, setShowQuiz] = useState(true);

  function toggleShow() {
    setShowQuiz(prevState => !prevState);
  }

  return (
    <div>
      <button onClick={toggleShow}>
        {showQuiz ? 'Exibir Tabs' : 'Exibir Quiz'}
      </button>
      
      { showQuiz ? <Quiz /> : <Tabs /> }
    </div>
    
  );
  
}

export default App;
