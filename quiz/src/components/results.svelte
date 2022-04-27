<p>Estes são os resultados</p>
{#each answers as answer, i}
  <p>{ i+1 }ª questão: { answer.statement } - { answer.answer }</p>
{/each}

<script>
  export let answers
</script>