<form class="qst-form" on:submit|preventDefault={submit}>
  <div>
    <label for="stat">Enunciado</label>
    <textarea name="stat" bind:value={statement} on:change={changeStatement} />
    {#if errors.stat }
      <div class="error">{ errors.stat }</div>
    {/if}
  </div>

  <div>
    <label for="qstType">Tipo da questão</label>
    <span>
      <input type="radio" value="choice" name="qstType" bind:group={qstType} on:change={changeQuestionType} />Objetiva
      <input type="radio" value="text" name="qstType" bind:group={qstType} on:change={changeQuestionType} />Textual
    </span>
    {#if errors.qstType }
      <div class="error">{ errors.qstType }</div>
    {/if}
  </div>

  {#if qstType === 'choice'}
    <label for="numOptions">Número de opções</label>
    <input name="numOptions" type="number" min="2" max="5" value={options.length} on:change={e => changeNumOptions(e.target['value'])} />
    {#if errors.numOptions }
      <div class="error">{ errors.numOptions }</div>
    {/if}
    
    {#each options as opt, i (`option_${i}`)}
      <div>
        <label for="option">Opção {i + 1}</label>
        <input name="option" type="text" bind:value={options[i]} on:change={e => changeOption(i, e.target['value'])} />
        {#if errors[`option_${i}`] }
          <div class="error">{ errors[`option_${i}`] }</div>
        {/if}
      </div>
    {/each}
  {/if}

  <div class="buttons">
    <input type="submit" />
  </div>
</form>

<script lang="ts">
import { createEventDispatcher } from 'svelte';
import type { QuestionType } from '../store/questions.store';

  import { inRange, isInt, minLen, required } from '../utils/validation'

  const dispatcher = createEventDispatcher<{
    submit: QuestionType
  }>()

  let statement = ''
  let options = ['', '']
  let qstType: 'text' | 'choice' = 'text'
  let errors: {[name: string]: string} = {}
  let touched: {[name: string]: boolean} = {}

  /**
   * Indica quando um campo é alterado pelo usuário.
   * @param name Identificador do campo alterado pelo usuário.
   * @param value Valor booleano indicando se o campo foi alterado (true) ou não (false). Default: true.
   */
  function touch(name: string, value: boolean = true) {
    touched[name] = value
  }

  /**
   * Indica quando um campo possui um erro.
   * @param name Identificador do campo.
   * @param error Mensagem de erro associado ao campo.
   */
   function setError(name: string, error: string) {
    errors[name] = error
  }

  /**
   * Altera o enunciado da questão e verifica se há um erro.
   * @param value Novo enunciado
   */
  function changeStatement() {
    touch('stat')
    check(statement, minLen(3), 'stat')
  }

  function changeQuestionType() {
    touch('qstType')
    check(qstType, required, 'qstType')
  }

  /**
   * Altera uma das opções da questão.
   * @param index índice da opção a ser alterada.
   * @param value Novo valor da opção.
   */
  function changeOption(index: number, value: string) {
    options[index] = value
    touch(`option_${index}`)
    check(value, required, `option_${index}`)
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
        options.splice(num, options.length - num)
      }
      else {  // ou aumenta o tamanho do array com strings vazias nos novos elementos
        const tail = Array(num - options.length).fill('')
        tail.forEach(o => options.push(o))
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
  function submit() {
    const statOk = check(statement, minLen(3), 'stat')
    const optionsOk = qstType !== 'choice'
      ? true
      : options
        .map((opt, i) => check(opt, required, `option_${i}`))
        .every(o => o)
    if (statOk && optionsOk) {
      // Dados corretos, podemos processá-los.
      // Nesse exemplo, estamos apenas imprimindo-os.
      console.log(statement)
      dispatcher('submit', {
        statement,
        qstType,
        options
      })
    }
  }
</script>

<style>
  .qst-form {
    --label-size: 150px;
    --label-margin: 10px;
    --label-width: calc(var(--label-size) + var(--label-margin));
    --border-size: 1px;
    --border-color: #ccc;
    --border-radius: 5px;
    --input-padding: 5px;
    --input-number-size: 30pt;
    padding: 20px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
  .qst-form label {
    width: var(--label-size);
    display: inline-block;
    text-align: right;
    font-weight: bold;
    margin-right: var(--label-margin);
    vertical-align: top;
  }
  .qst-form .error {
    font-style: italic;
    font-size: 10pt;
    color: red;
    margin-left: var(--label-width);
    height: 20pt;
  }
  .qst-form .buttons {
    margin-top: 10px;
    padding-top: 10px;
    border-top: var(--border-size) solid var(--border-color);
    display: flex;
    justify-content: flex-end;
  }
  .qst-form textarea {
    height: 100px;
    margin-bottom: -5pt;
  }
  .qst-form input[type="submit"] {
    padding: 4pt 8pt;
  }
  .qst-form input[type="radio"]:not(:first-child) {
    margin-left: 20px;
  }
  .qst-form input[type="text"],
  .qst-form input[type="number"],
  .qst-form textarea {
    border-radius: var(--border-radius);
    border: var(--border-size) solid var(--border-color);
    padding: var(--input-padding);
  }
  .qst-form input[type="text"],
  .qst-form textarea {
    width: calc(100% - (var(--label-width) + 2 * (var(--border-size) + var(--input-padding))));
  }
  .qst-form input[type="number"] {
    width: var(--input-number-size);
  }
</style>