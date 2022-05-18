import { FormEvent, useState } from "react"
import { isInt, required, minLen, inRange } from '../utils/validation'
import { QuestionProps } from "./Question"
import './QuestionForm.css'

interface QuestionFormProps {
  onSubmit: (qst: QuestionProps) => void
}

/**
 * Formulário para cadastrar e/ou alterar dados de uma questão.
 * @returns Componente do formulário
 */
export function QuestionForm({ onSubmit }: QuestionFormProps) {

  const [ statement, setStatement ] = useState<string>('')                 // enunciado~da questão
  const [ options, setOptions ] = useState<string[]>(['', ''])             // opções da questão
  const [ qstType, setQstType ] = useState<string>('')                     // tipo da questão (para ilustrar outros tipos de input)
  const [ errors, setErrors ] = useState<{[name: string]: string}>({})     // erros nos campos dos formulários
  const [ touched, setTouched ] = useState<{[name: string]: boolean}>({})  // indica, para cada campo, se ele foi alterado pelo usuário

  /**
   * Indica quando um campo é alterado pelo usuário.
   * @param name Identificador do campo alterado pelo usuário.
   * @param value Valor booleano indicando se o campo foi alterado (true) ou não (false). Default: true.
   */
  function touch(name: string, value: boolean = true) {
    setTouched(prevTouched => ({ ...prevTouched, [name]: value }))
  }

  function setError(name: string, error: string) {
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }))
  }

  /**
   * Altera o enunciado da questão.
   * @param value Novo enunciado
   */
  function changeStatement(value: string) {
    setStatement(value)
    touch('stat')
  }

  function changeQuestionType(value: string) {
    setQstType(value)
    touch('qstType')
  }

  /**
   * Altera uma das opções da questão.
   * @param index índice da opção a ser alterada.
   * @param value Novo valor da opção.
   */
  function changeOption(index: number, value: string) {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
    touch(`option_${index}`)
  }

  /**
   * Altera o número de opções da questão.
   * @param value Novo número de opções
   */
  function changeNumOptions(value: string) {
    // cria uma função de validação cujo valor deve estar entre 2 e 5
    const range = inRange(2, 5)

    // função de validação combina outras funções de validação
    // o erro atribuído será o da primeira que retornar algum erro, devido ao "ou" (||)
    const validateFunc = (value: string) => required(value) || isInt(value) || range(value)

    // se passar no teste de validação, altera o tamanho do array `options`
    if (check(value, validateFunc, 'numOptions')) {
      const num = parseInt(value, 10)
      if (num <= options.length) { // ou reduz o tamanho do array
        for (let i = num; i < options.length; i++) {
          touch(`option_${i}`, false) // limpa os indicadores de alteraçao das opções removidas
          setError(`option_${i}`, '') // limpa as mensagens de erro das opções removidas
        }
        setOptions(options.slice(0, num))
        
      }
      else {  // ou aumenta o tamanho do array com strings vazias nos novos elementos
        const tail = Array(num - options.length).fill('')
        setOptions([...options, ...tail])
      }
    }
  }

  /**
   * Verifica se uma string passa em um dado teste de validação.
   * @param value Valor a ser testado.
   * @param validateFunc Função de validação a ser aplicada sobre o valor (`value`).
   * @param name Identificador do elemento com a mensagem de erro, caso o valor não seja validado.
   * @returns Verdadeiro se passar no testo (for validado) ou falso, caso contrário.
   */
  function check(value: string, validateFunc: Function, name: string) {
    const error = validateFunc(value)
    setError(name, error)
    return error === null
  }

  /**
   * Verifica se há erros no formulário e, se estiverem corretos, trata os dados.
   * @param e Evento de submissão do formulário
   */
  function submit(e: FormEvent) {
    e.preventDefault()
    const statOk = check(statement, minLen(3), 'stat')
    const optionsOk = qstType !== 'choice'
      ? true
      : options
        .map((opt, i) => check(opt, required, `option_${i}`))
        .every(o => o)

    if (statOk && optionsOk) {
      // Dados corretos, podemos processá-los.
      // Nesse exemplo, estamos apenas imprimindo-os.
      onSubmit({ statement, options })
    }
  }

  // Elemento com o enunciado da questão
  const stateElm = (
    <div>
      <label>Enunciado</label>
      <textarea value={statement}
        onChange={e => changeStatement(e.target.value)}
        onBlur={e => touched['stat'] && check(e.target.value, minLen(3), 'stat')}
      />
      <div className="error">{ errors.stat }</div>
    </div>
  )

  // Elemento com o tipo da questão
  const qstTypeElm = (
    <div>
      <label>Tipo da questão</label>
      <span>
        <input type="radio" value="choice" name="qstType" onChange={e => changeQuestionType(e.target.value)} />Objetiva
        <input type="radio" value="text" name="qstType" onChange={e => changeQuestionType(e.target.value)} />Textual
      </span>
      <div className="error">{ errors.qstType }</div>
    </div>
  )

  // Elemento com o número de opções
  const numOptionsElm = (
    <div>
      <label>Número de opções</label>
      <input type="number" value={options.length} onChange={e => changeNumOptions(e.target.value)} />
      <div className="error">{ errors.numOptions }</div>
    </div>
  )

  // Lista com as opções
  const optionsList = options.map((opt, i) => (
    <div key={`option_${i}`}>
      <label>Opção {i + 1}</label>
      <input type="text" value={options[i]}
        onChange={e => changeOption(i, e.target.value)}
        onBlur={e => touched[`option_${i}`] && check(e.target.value, required, `option_${i}`)}
      />
      <div className="error">{ errors[`option_${i}`] }</div>
    </div>
  ))

  // Elemento para o tipo de questão objetiva
  const optionsElm = (
    <div>
      { numOptionsElm }
      { optionsList }
    </div>
  )

  const buttons = <div>
    <div className="buttons">
      <input type="submit" value="Enviar" />
    </div>
  </div>

  // Formulário completo
  return (
    <form className="qst-form" onSubmit={submit}>
      { stateElm }
      { qstTypeElm }
      { qstType === 'choice' ? optionsElm : '' }
      { buttons }
    </form>
  )
}