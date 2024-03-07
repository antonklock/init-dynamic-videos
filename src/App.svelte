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
	<div class="flex flex-col items-center justify-center ml-10">
		{#if $tableDataStore.length > 1}
			<button
				class="btn btn-outline mb-8"
				on:click={() => tableDataStore.set([])}>Unload CSV</button
			>
			<div class="">
				<Table />
			</div>
			<div class="flex flex-row mt-8">
				<button
					class="btn btn-success mx-2"
					disabled={$tableDataStore.length < 1}
					on:click={handleGenerateVideos}>Generate videos</button
				>
				<button class="btn btn-warning">Generate thumbnails</button>
			</div>
		{:else}
			<div class="h-10">
				<Table />
			</div>
			<LoadCsv />
		{/if}
	</div>
</main>
