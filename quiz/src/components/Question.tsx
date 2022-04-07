import './Question.css'

interface QuestionProps {
  statement: string
  options: string[]
  onSelection: Function
  selection?: number
}

export function Question(props: QuestionProps) {

  const buttons = props.options.map((txt, index) => (
    <button key={ txt }
      className={ index === props.selection ? 'selected' : '' }
      onClick={ () => props.onSelection(index) }
    >{ txt }
    </button>
  ))
  
  return (
    <div className="question">
      <h2>{ props.statement }</h2>
      { buttons }
    </div>
  )
}