<template>
  <div class="question">
    <h2>{{ statement }}</h2>
    <button v-for="(option, index) in options" :key="option"
      :class="{ selected: index === selection }"
      @click="$emit('onSelection', index)">
      {{ option }}
    </button>
  </div>
</template>

<script setup lang="ts">
  // Propriedades do componente. Exportado para o caso de algum componente-pai precisar os tipos.
  export interface QuestionProps {
    statement: string  // enunciado da questão
    options: string[]  // opções da questão
    selection?: number // índice da opção selecionada, se houver
  }

  // Eventos do componente.
  export interface QuestionEvents {
    (e: 'onSelection', val: number): void // quando o usuário selecionar uma opção, passa seu índice
  }

  // define as propriedades e os eventos
  defineProps<QuestionProps>()
  defineEmits<QuestionEvents>()
</script>

<style scoped>
  h2 {
    font-weight: normal;
    font-size: 20pt;
    margin-top: 0;
  }

  button {
    margin-right: 10px;
    background-color: #ccc;
    border: 1px solid rgb(118, 118, 118);
    border-radius: 3px;
    padding: 2px 5px;
  }

  .selected {
    font-weight: bold;
    background-color: #aaa;
  }
</style>