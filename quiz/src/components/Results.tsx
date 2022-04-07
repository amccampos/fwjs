import './Results.css'

interface ResultsProps {
  statements: string[]
  answers: string[]
}

export function Results(props: ResultsProps) {
  const results = props.answers.map((answer, index) => (
    <div className="questionResult">
      <h3>Questão { index + 1 }</h3>
      { props.statements[index] }: { answer }
    </div>
  ))
  return <div>{ results }</div>
}