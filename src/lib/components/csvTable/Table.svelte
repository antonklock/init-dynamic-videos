<script lang="ts">
    import TableRow from "./TableRow.svelte";
    import { tableDataStore } from "../../stores/tableStore";

    let checked = true;

    const toggleCheckAll = () => {
        tableDataStore.update((currentData) => {
            return currentData.map((row) => {
                row.checked = !checked;
                return row;
            });
        });
    };
</script>

{#if $tableDataStore}
    <div class="overflow-x-hidden w-96 h-80">
        <table class="table table-xs table-pin-rows">
            <thead>
                <tr>
                    <th>#</th>
                    <th class="flex flex-row items-center">
                        <input
                            type="checkbox"
                            class="checkbox checkbox-primary checkbox-xs"
                            on:change={toggleCheckAll}
                            bind:checked
                        />
                    </th>
                    <th>Name</th>
                    <th>Surname</th>
                </tr>
            </thead>
            <tbody>
                {#each $tableDataStore as row, i}
                    <TableRow
                        id={row.id}
                        rowNumber={i + 1 + ""}
                        name={row.name}
                        surname={row.surname}
                        checked={row.checked}
                    />
                {/each}
            </tbody>
        </table>
    </div>
{/if}
