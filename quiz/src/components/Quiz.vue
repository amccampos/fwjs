<template>
  <div className="quizPane">
    <h1>Quiz</h1>
    <div v-if="showResults">
      <div className="questionPane">
        <Results :answers="answers" />
      </div>
      <button @click="reset">Reinicia</button>
    </div>
    <div v-else>
      <div class="questionPane">
        <div className="questionNumber">
          Questão {{ currentQuestion + 1 }} de {{ questions.length }}
        </div>
        <Question
          v-bind="questions[currentQuestion]"
          :selection="currentOption"
          @on-selection="select"
          />
      </div>
      <button @click="confirm" :disabled="currentOption === undefined">
        Confirma resposta
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed } from 'vue'
  import Question, { type QuestionProps } from './Question.vue'
  import Results, { type Answer } from './Results.vue'

  // dados da aplicação (podem vir de uma consulta no servidor)
  const questions: QuestionProps[] = [
    {
      statement: 'Enunciado da 1ª questão',
      options: ['opção 1.1', 'opção 1.2', 'opção 1.3', 'opção 1.4']
    },
    {
      statement: 'Enunciado da 2ª questão',
      options: ['opção 2.1', 'opção 2.2', 'opção 2.3', 'opção 2.4']
    },
  ]

  // estados reativos do componente
  const currentQuestion = ref(0)          // ref() é útil para tipos primitivos
  const currentOption = ref<number>()     // como a opção inicial é undefined, é interessante definir o tipo
  const answers = reactive<Answer[]>([])  // reactive() é útil para objetos e arrays. `answers` será um array de `Answer`
  const showResults = computed(() => currentQuestion.value >= questions.length) // computed() atualiza uma var quando outra for alterada

  /** Atualiza a opção selecionada pelo usuário. */
  function select(optionIndex: number) {
    currentOption.value = optionIndex
  }

  /** Confirma a opção selecionada pelo usuário como resposta da questão atual. */
  function confirm() {
    if (currentOption.value !== undefined) {
      const question = questions[currentQuestion.value]
      answers[currentQuestion.value] = {
        statement: question.statement,
        option: question.options[currentOption.value]
      }
    }
    // depois de confirmar a resposta, vai para próxima questão e cancela a opção selecionada
    currentQuestion.value++
    currentOption.value = undefined
  }

  /** Reinicia o quiz, começando da 1ª questão e sem opção selecionada. */
  function reset() {
    currentQuestion.value = 0
    currentOption.value = undefined
  }
</script>

<style>
.quizPane {
  padding: 50px;
}

.questionPane {
  padding: 20px;
  margin: 10px 0;
  border-radius: 10px;
  border: 1px solid #aaa;
  background-color: #f0f0f0;
}

.questionNumber {
  font-style: italic;
  font-size: smaller;
}
</style>