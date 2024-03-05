<script lang="ts">
	import Papa from "papaparse";
	import "../electron.d.ts";

	let data: { [x: string]: any };

	const openFilePicker = () => {
		return new Promise<File>((resolve) => {
			const input = document.createElement("input");
			input.type = "file";
			input.accept = ".csv";
			input.onchange = () => {
				if (input.files && input.files[0]) {
					resolve(input.files[0]);
				}
			};
			input.click();
		});
	};

	const handleClick = async () => {
		const file = await openFilePicker();

		Papa.parse(file, {
			complete: (result) => {
				data = result.data;
				for (let key in data) {
					console.log(key, data[key]);
				}
			},
		});
	};

	const handleGenerateVideos = () => {
		window.electronAPI.generateVideos();
	};
</script>

<main
	class="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center"
>
	<div class="flex flex-col items-center">
		<button class="btn btn-primary" on:click={handleClick}>Load CSV</button>
		{#if data}
			<p class="text-green-400">CSV loaded</p>
		{:else}
			<h1 class="">Load your CSV file</h1>
		{/if}

		<div class="mt-10 flex flex-col items-center">
			<button
				class="btn btn-success"
				disabled={!data}
				on:click={handleGenerateVideos}>Generate videos</button
			>
		</div>
	</div>
</main>
