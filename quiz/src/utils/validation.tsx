/**
 * Verifica se uma string possui algum conteúdo (se o tamanho é > 0)
 * @param value String a ser testada.
 * @returns Uma mensagem de erro ou `null` se não houver erro algum.
 */
 export function required(value: string) {
  if (value === undefined || value.trim().length === 0) {
    return 'Este campo é obrigatório'
  }
  return null
}

/**
 * Verifica se uma dada string é um número inteiro ou não.
 * @param value String a ser testada.
 * @returns Uma mensagem de erro se a string não for número ou `null` se for
 */
 export function isInt(value: string) {
  if (value && isNaN(parseInt(value, 10))) {
    return 'Este campo requer um número inteiro'
  }
  return null
}

/**
 * Cria uma função de validação que verifica se uma string possui um número mínimo de caracteres.
 * @param min Valor mínimo de caracteres da string.
 * @returns Retorna a função para validar se uma string possui um tamanho mínimo.
 */
export function minLen(min: number) {
  // Esta é uma função de retorna uma função.
  // A função retornada que deve ser utilizada como validação. Ela usa o parâmetro da primeira (`min`) para
  // validar as strings que forem passadas na segunda.
  return (value: string) => {
    const v = value.trim()
    if (v.length < min) {
      return `Este campo requer pelo menos ${min} caracteres`
    }
    return null
  }
}

/**
 * Cria uma função de validação que verifica se uma string é um número que se encontra num faixa de valores.
 * @param min Valor mínimo
 * @param max Valor máximo
 * @returns Retorna a função para validar se um número se encontra em uma faixa de valores.
 */
export function inRange(min: number, max: number) {
  return (value: string) => {
    const num = parseInt(value, 10)
    const [vmin, vmax] = min > max ? [max, min] : [min, max]
    if (value && (isNaN(num) || num < vmin || num > vmax)) {
      return `Este campo requer um número inteiro entre ${vmin} e ${vmax}`
    }
    return null
  }
}