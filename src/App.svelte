<script>
	import svelteLogo from "./assets/svelte.svg";
	import viteLogo from "/vite.svg";
	import Counter from "./lib/Counter.svelte";
	import electronLogo from "./assets/electron.svg";
	import tailwindLogo from "./assets/tailwind.svg";

	const nodeVersion = api.node();
	const chromeVersion = api.chrome();
	const electronVersion = api.electron();
</script>

<main
	class="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center"
>
	<div class="flex flex-col">
		<h1>Create dynamic Init videos</h1>
		<button class="btn btn-primary">Generate</button>
	</div>
</main>
