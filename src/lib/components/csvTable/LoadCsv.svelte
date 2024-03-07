<script lang="ts">
    import Papa from "papaparse";
    import { tableDataStore } from "../../stores/tableStore";
    import { v4 as uuidv4 } from "uuid";

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
                const data = result.data;
                for (let key in data) {
                    tableDataStore.update((currentData) => [
                        ...currentData,
                        {
                            id: uuidv4(),
                            name: data[key][0],
                            surname: data[key][1],
                            checked: true,
                        },
                    ]);
                }
            },
        });
    };
</script>

<div class="flex flex-col items-center">
    <button class="btn btn-primary" on:click={handleClick}>Load CSV</button>
    {#if $tableDataStore.length > 0}
        <div class="flex flex-row">
            <p class="text-green-400">CSV loaded</p>
            <button on:click={() => tableDataStore.set([])}>
                <p class="text-red-700 ml-2">x</p>
            </button>
        </div>
    {/if}
</div>
