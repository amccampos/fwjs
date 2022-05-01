{#each answers as answer, i}
  <div class="questionResult">
    <h3>Questão { i + 1 }</h3>
    { answer.statement }: { answer.answer }
  </div>
{/each}

<script>
  export let answers
</script>

<style>
  .questionResult + .questionResult {
    margin-top: 10px;
  }
  h3 {
    margin: 0;
  }
</style>