<script lang="ts">
    export let id: string;
    export let rowNumber: string;
    export let name: string;
    export let surname: string;
    export let checked: boolean = true;

    import { tableDataStore } from "../../stores/tableStore.js";
    import { onMount } from "svelte";

    const getChecked = () => {
        const index = $tableDataStore.findIndex((row) => row.id === id);
        const check = $tableDataStore[index].checked;
        return check;
    };

    const setChecked = (value: boolean) => {
        tableDataStore.update((currentData) => {
            const index = currentData.findIndex((row) => row.id === id);
            currentData[index].checked = value;
            return currentData;
        });
    };

    onMount(() => {
        try {
            checked = getChecked();
        } catch (e) {
            console.warn(e);
        }
    });
</script>

<tr class="hover">
    <th>{rowNumber}</th>
    <th>
        <input
            type="checkbox"
            class="checkbox checkbox-primary checkbox-xs"
            bind:checked
            on:change={() => setChecked(checked)}
        />
    </th>
    <td>{name}</td>
    <td>{surname}</td>
</tr>
