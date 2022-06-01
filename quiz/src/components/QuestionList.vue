<template>
  <QuestionForm @on-submit="addQuestion($event)"></QuestionForm>
  <div class="box" v-for="question, i in questionStore.questions">
    <button class="erase" @click="deleteQuestion(i)">X</button>
    <Question
      :statement="question.statement"
      :options="question.options"
    >
    </Question>
  </div>
</template>

<script setup lang="ts">
import Question from './Question.vue'
import QuestionForm from './QuestionForm.vue'
import { questionStore, type QuestionType } from '../store/question.store'

function addQuestion(question: QuestionType) {
  questionStore.add(question)
}

function deleteQuestion(index: number) {
  questionStore.delete(index)
}

</script>

<style>
.box {
  padding: 10px;
  border: 1px solid #aaf;
  border-radius: 5px;
  margin: 10px;
}
.erase {
  float: right;
  z-index: 2;
}
</style>