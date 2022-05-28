<template>
  <div>
    sddd
    <QuestionForm @submit="onSubmit($event)"></QuestionForm>
  </div>
  <div>
    <Question v-for="question in questionStore.questions"
      :statement="question.statement"
      :options="question.options"
    >
    </Question>
  </div>
</template>

<script setup lang="ts">
import QuestionForm from './Question.vue'
import { questionStore, type QuestionType } from '../store/question.store'

function onSubmit(question: QuestionType) {
  questionStore.add(question)
}

</script>