<script lang="ts">
	import "../electron.d.ts";
	import Table from "./lib/components/csvTable/Table.svelte";
	import LoadCsv from "./lib/components/csvTable/LoadCsv.svelte";
	import { tableDataStore } from "./lib/stores/tableStore";

	const handleGenerateVideos = () => {
		window.electronAPI.generateVideos();
	};
</script>

<main class="text-white flex flex-col items-center min-h-screen">
	<div class="mt-10 mb-10 flex flex-col items-center">
		<h1 class="text-3xl font-black">Init Dynamic Video Generator 🤖</h1>
		<p class="">
			Load your CSV and chose the rows you want to send to AE to render
		</p>
	</div>

	<div class="flex flex-col items-center justify-center">
		<div class="flex flex-col items-center justify-center">
			{#if $tableDataStore.length > 1}
				<div class="">
					<Table />
				</div>
				<div class="flex flex-row mt-8">
					<button
						class="btn btn-primary mx-2"
						on:click={() =>
							// @ts-ignore
							document.getElementById("modal_videos").showModal()}
						>Video generation</button
					>
					<dialog id="modal_videos" class="modal">
						<div class="modal-box flex flex-col items-center">
							<h3 class="font-bold text-lg">Video generation</h3>
							<p class="py-4">Lets generate some videos!</p>
							<button
								class="btn btn-success mx-2"
								disabled={$tableDataStore.length < 1}
								on:click={handleGenerateVideos}
								>Generate videos</button
							>
						</div>
						<form method="dialog" class="modal-backdrop">
							<button>close</button>
						</form>
					</dialog>

					<button
						class="btn btn-secondary mx-2"
						on:click={() =>
							// @ts-ignore
							document.getElementById("modal_thumb").showModal()}
						>Thumb generation</button
					>
					<dialog id="modal_thumb" class="modal">
						<div class="modal-box flex flex-col items-center">
							<h3 class="font-bold text-lg">Thumb generation</h3>
							<p class="py-4">Lets generate some thumbnails!</p>
							<button class="btn btn-success mx-2"
								>Generate thumbs</button
							>
						</div>
						<form method="dialog" class="modal-backdrop">
							<button>close</button>
						</form>
					</dialog>
				</div>

				<button
					class="btn btn-outline mt-4"
					on:click={() => tableDataStore.set([])}>Unload CSV</button
				>
			{:else}
				<div class="h-10">
					<Table />
				</div>
				<LoadCsv />
			{/if}
		</div>
	</div>
	<div class="fixed bottom-2 right-2">
		<p class="text-gray-600">By Klockworks 2024</p>
	</div>
</main>
