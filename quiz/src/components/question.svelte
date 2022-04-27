<h1>{ statement }</h1>
<div class="questionPane">
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
  .selected {
    font-weight: bold;
  }
</style>