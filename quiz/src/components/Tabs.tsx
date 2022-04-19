import { useState } from 'react';
import { Tab } from './Tab';
import './Tabs.css';

const tabs = [
  {
    tabContent: 'Texto da Primeira Tab'
  },
  {
    tabContent: 'Texto da Segunda Tab'
  },
  {
    tabContent: 'Texto da Terceira Tab'
  },
  {
    tabContent: 'Texto da Quarta Tab'
  },
]

const options = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4']

export function Tabs() {
  const [currentTab, setCurrentTab] = useState(0)

  function select(optionIndex: number) {
    setCurrentTab(optionIndex)
  }

  const showTabs = (
    <div>
      <div className="questionPane">
        <Tab
          tabContent={ tabs[currentTab].tabContent }
        />
      </div>
    </div>
  )

  const buttons = options.map((txt, index) => (
    <button key={ txt }
      className={ index === currentTab ? 'selected' : '' }
      onClick={ () => select(index) }
    >{ txt }
    </button>
  ))
  
  return (
    <div className="quizPane">
      { buttons }
      { showTabs }
    </div>
  )    
}
