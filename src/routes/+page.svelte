<script>
	import CheckScoreInput from '../components/checkScoreInput.svelte';
	export let data;
	const initialData = { data: data.data.slice() };
	let answer = 'suku asmat, suku cia-cia';
	let checkScores = false;

	function setCheckScores() {
		checkScores = true;
		data = {
			data: [
				{
					id: 0,
					key: '',
					answer: 'ganti ini',
					score: 100
				}
			]
		};
	}

	function setContoh() {
		checkScores = false;
		data = initialData;
	}
</script>

<div id="wrapper">
	<button type="reset" on:click={setContoh}>Contoh</button>
	<button type="reset" on:click={setCheckScores}>Check Scores</button>
	<CheckScoreInput {data} {answer} {checkScores} />
</div>

<style>
	#wrapper {
		margin: auto;
		margin-top: 3rem;
		max-width: 900px;
		background-color: lightcoral;
		border-radius: 10px;
		padding: 1rem;
	}
</style>
