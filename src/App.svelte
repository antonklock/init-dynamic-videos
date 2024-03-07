<script lang="ts">
	import "../electron.d.ts";
	import Table from "./lib/components/csvTable/Table.svelte";
	import LoadCsv from "./lib/components/csvTable/LoadCsv.svelte";
	import { tableDataStore } from "./lib/stores/tableStore";

	const handleGenerateVideos = () => {
		window.electronAPI.generateVideos();
	};
</script>

<main
	class="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center"
>
	<div class="flex flex-row items-center justify-center ml-10">
		<LoadCsv />

		{#if $tableDataStore}
			<div class="ml-10">
				<Table />
			</div>
			<!-- <div class="ml-10 flex flex-col items-center">
				<button
					class="btn btn-success"
					disabled={!data}
					on:click={handleGenerateVideos}>Generate videos</button
				>
			</div> -->
		{/if}
	</div>
</main>
