{#if currentQuestion < questions.length }
  <Question
    {...questions[currentQuestion]}
		selection={currentOption}
    on:selection={e => onSelection(e.detail)}
  />
	<button
		disabled={ currentOption === undefined }
		on:click={next}>
		Confirma questão
	</button>
{:else}
  <Results {answers}/>
{/if}

<script lang="ts">
import Question from './question.svelte'
import Results from './results.svelte'

const questions = [
	{
		statement: 'Primeira questão',
		options: ['opção 1.1', 'opção 1.2', 'opção 1.3', 'opção 1.4', ]
	},
	{
		statement: 'Segunda questão',
		options: ['opção 2.1', 'opção 2.2', 'opção 2.3', 'opção 2.4', ]
	}
]
let currentQuestion = 0
let currentOption
let answers = []

function next() {
	const qst = questions[currentQuestion]
	answers[currentQuestion] = {
		statement: qst.statement,
		answer: qst.options[currentOption]
	}
	currentQuestion++
	currentOption = undefined
}

function onSelection(option) {
	currentOption = option
  console.log(`opção selecionada ${option}`)
}

</script>