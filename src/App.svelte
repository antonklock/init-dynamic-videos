<script lang="ts">
	import Papa from "papaparse";
	import "../electron.d.ts";
	import Table from "./lib/Table.svelte";
	import { tableData } from "./lib/stores/tableStore.js";

	let data: { [x: string]: any };
	let tableArray: {
		name: string;
		surname: string;
		checked: boolean;
	}[] = [];

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
					tableArray.push({
						name: data[key][0],
						surname: data[key][1],
						checked: false,
					});

					tableData.update((n) => tableArray);
					// console.log(tableArray);
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
	<div class="flex flex-row items-center justify-center ml-10">
		<div class="flex flex-col items-center">
			<button class="btn btn-primary" on:click={handleClick}
				>Load CSV</button
			>
			{#if data}
				<div class="flex flex-row">
					<p class="text-green-400">CSV loaded</p>
					<button on:click={() => (data = undefined)}>
						<p class="text-red-700 ml-2">x</p>
					</button>
				</div>
			{:else}
				<h1 class="">Load your CSV file</h1>
			{/if}
		</div>

		{#if data}
			<div class="ml-10">
				<Table rows={tableArray} />
			</div>
			<div class="ml-10 flex flex-col items-center">
				<button
					class="btn btn-success"
					disabled={!data}
					on:click={handleGenerateVideos}>Generate videos</button
				>
			</div>
		{/if}
	</div>
</main>
