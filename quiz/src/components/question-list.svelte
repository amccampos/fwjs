<template>
  <QuestionForm on:submit={e => questions.add(e.detail)}></QuestionForm>
  {#each $questions as question, i (question)}
    <div class="box">
      <button class="erase" on:click={e => questions.remove(i)}>X</button>
      <Question statement={question.statement} options={question.options}>
      </Question>
    </div>
  {/each}
</template>

<script lang="ts">
import Question from './question.svelte'
import QuestionForm from './question-form.svelte'
import { questions, type QuestionType } from '../store/questions.store'
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