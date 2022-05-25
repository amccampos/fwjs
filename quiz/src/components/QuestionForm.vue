<template>
  <form @submit.prevent="submit">

    <div>
      <label>Enunciado</label>
      <textarea v-model="statement"
        @change="changeStatement()"
        @blur="touched['stat'] && check(statement, minLen(3), 'stat')"
      ></textarea>
      <div className="error">{{ errors.stat }}</div>
    </div>

    <div>
      <label>Tipo da questão</label>
      <span>
        <input type="radio" value="choice" name="qstType" v-model="qstType" @change="changeQuestionType()" />Objetiva
        <input type="radio" value="text" name="qstType" v-model="qstType" @change="changeQuestionType()" />Textual
      </span>
      <div className="error">{{ errors.qstType }}</div>
    </div>

    <div>
      <label>Número de opções</label>
      <input type="number" :value="options.length" @change="changeNumOptions($event.target.value)" />

      <div className="error">{{ errors.numOptions }}</div>
    </div>

    <div v-for="(opt, i) in options" :key="`option_${i}`">
      <label>Opção {{i + 1}}</label>
      <input type="text" v-model="options[i]" />
      <div className="error">{{ errors[`option_${i}`] }}</div>
    </div>

    <input type="submit" />
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { inRange, isInt, minLen, required } from '../utils/validation'

const temp = ref(2)

const statement = ref<string>('')                 // enunciado~da questão
const options = reactive<string[]>(['', ''])             // opções da questão
const qstType = ref<string>('')                     // tipo da questão (para ilustrar outros tipos de input)
const errors = reactive<{[name: string]: string}>({})     // erros nos campos dos formulários
const touched = reactive<{[name: string]: boolean}>({})  // indica, para cada campo, se ele foi alterado pelo usuário


  /**
   * Indica quando um campo é alterado pelo usuário.
   * @param name Identificador do campo alterado pelo usuário.
   * @param value Valor booleano indicando se o campo foi alterado (true) ou não (false). Default: true.
   */
  function touch(name: string, value: boolean = true) {
    touched[name] = value
  }

  function setError(name: string, error: string) {
    errors[name] = error
  }

  /**
   * Altera o enunciado da questão.
   * @param value Novo enunciado
   */
  function changeStatement() {
    // statement.value = value
    touch('stat')
  }

  function changeQuestionType() {
    // qstType.value = value
    touch('qstType')
  }

  /**
   * Altera uma das opções da questão.
   * @param index índice da opção a ser alterada.
   * @param value Novo valor da opção.
   */
  function changeOption(index: number, value: string) {
    options[index] = value
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
        options.slice(0, num).forEach((o, i) => options[i] = o)
        
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
    const statOk = check(statement.value, minLen(3), 'stat')
    const optionsOk = qstType.value !== 'choice'
      ? true
      : options
        .map((opt, i) => check(opt, required, `option_${i}`))
        .every(o => o)

    if (statOk && optionsOk) {
      // Dados corretos, podemos processá-los.
      // Nesse exemplo, estamos apenas imprimindo-os.
      console.log({
        statement: statement.value,
        qstType: qstType.value,
        options
      })
    }
  }
</script>