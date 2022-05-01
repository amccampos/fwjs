<h2>{ statement }</h2>
<div class="options">
  {#each options as option, index (option)}
  <button
    class={ index === selection ? 'selected' : '' }
    on:click={ e => clicked(index) } >
    { option }
  </button>
{/each}

</div>

<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let statement: string = 'Enunciado da questão'
  export let options: string[] = []
  export let selection: number

  const dispatcher = createEventDispatcher()

  function clicked(idx: number) {
    console.log('Clicou no botão ', idx)
    dispatcher('selection', idx)
  }
</script>

<style>
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
  .options {
    margin-bottom: 10px;
  }
</style>