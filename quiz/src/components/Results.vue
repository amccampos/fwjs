<template>
  <div class="questionResult" v-for="(answer, index) in answers">
    <h3>Questão {{ index + 1 }}</h3>
    {{ answer.statement }}: {{ answer.option }}
  </div>
</template>

<script setup lang="ts">
  // Dados de uma resposta.
  export interface Answer {
    statement: string  // enunciado da questão
    option: string     // resposta da opção escolhida
  }

  defineProps<{
    answers: Answer[]
  }>()
</script>

<style scoped>
.questionResult + .questionResult {
  margin-top: 10px;
}

.questionResult h3 {
  margin: 0;
}
</style>