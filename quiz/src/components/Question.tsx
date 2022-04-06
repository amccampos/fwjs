import './Question.css';

interface QuestionProps {
  statement: string
  options: string[]
  onSelection: Function
}

export function Question(props: QuestionProps) {
  // const buttons = props.options.map(txt => <button>{ txt }</button>)

  const buttons = props.options.map((txt, index) => (
    <button key={ txt } onClick={ () => props.onSelection(index) }>{ txt }</button>
  ))
  
  return (
    <div>
      <h1>{ props.statement }</h1>
      { buttons }
    </div>
  )
}