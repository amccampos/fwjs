<div class="quizPane">
	<h1>Quiz</h1>
	{#if currentQuestion < questions.length }
		<div class="questionPane">
			<div class="questionNumber">
				Questão { currentQuestion + 1 } de { questions.length }
			</div>
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
		</div>
	{:else}
		<div class="questionPane">
			<Results {answers}/>
		</div>
		<button on:click={reset}>Reinicia</button>
	{/if}
</div>


<script lang="ts">
import Question from './question.svelte'
import Results from './results.svelte'

const questions = [
	{
		statement: 'Enunciado da 1ª questão',
		options: ['opção 1.1', 'opção 1.2', 'opção 1.3', 'opção 1.4' ]
	},
	{
		statement: 'Enunciado da 2ª questão',
		options: ['opção 2.1', 'opção 2.2', 'opção 2.3', 'opção 2.4' ]
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

/** Reinicia o quiz, começando da 1ª questão e sem opção selecionada. */
function reset() {
	currentQuestion = 0
	currentOption = undefined
}
</script>

<style>
	.quizPane {
		padding: 50px;
	}
	.questionPane {
		padding: 20px;
		margin: 10px 0;
		border-radius: 10px;
		border: 1px solid #aaa;
		background-color: #f0f0f0;
	}
	.questionNumber {
		font-style: italic;
		font-size: smaller;
	}
</style>