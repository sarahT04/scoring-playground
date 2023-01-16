<script>
	export let answer;
	export let data;
	export let checkScores;

	let newAnswer = 'ganti ini';

	function removeFromArrayId(id) {
		data.data = data.data.filter((dat) => dat.id !== id);
	}

	function addToLastArray() {
		data.data = [
			...data.data,
			{
				id: data.data.at(-1)?.id + 1 || 0,
				key: '',
				answer: '',
				score: 0
			}
		];
	}

	async function calculateData() {
		let sentData = [];
		data.data.filter((dat) => dat.answer !== '').forEach((dat) => sentData.push(dat.answer));
		const response = await fetch('http://saraht04.pythonanywhere.com/scores/', {
			method: 'POST',
			body: JSON.stringify({ real_key: newAnswer, answer_list: sentData }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const total = await response.json();
		data.data = total;
	}
</script>

<div id="examples">
	<div>
		{#if checkScores}
			<h4>Jawaban Guru: <br /><input bind:value={newAnswer} /></h4>
			<button type="submit" on:click={calculateData}>Submit</button>
		{:else}
			<h4>Jawaban Guru:<br /> {answer}</h4>
		{/if}
	</div>
	<div>
		<h4>Jawaban Murid:</h4>
		<ul>
			{#each data.data as data (data.id)}
				<input bind:value={data.answer} />
				{#if checkScores && data.id !== 0}
					<button type="button" on:click={() => removeFromArrayId(data.id)}>del</button>
				{/if}
			{/each}
			<br />
			{#if checkScores}
				<button type="button" on:click={addToLastArray}>Add</button>
			{/if}
		</ul>
	</div>
	<div>
		<h4>Score diperoleh:</h4>
		<ul>
			{#each data.data as data (data.id)}
				<li>
					{data.score}
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	#examples {
		display: flex;
	}

	#examples > * {
		flex: 1;
	}

	#examples > *:not(:last-child) {
		border-right: 1px solid lightgrey;
	}

	#examples h4 {
		text-align: center;
	}

	li {
		height: 24px;
	}
</style>
