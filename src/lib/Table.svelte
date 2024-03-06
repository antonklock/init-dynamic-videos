<script lang="ts">
    import TableRow from "./TableRow.svelte";
    import { checkAll, tableData } from "./stores/tableStore";

    let check_all = false;

    try {
        tableData.subscribe((value) => {
            rows = value;
        });
    } catch (e) {
        console.log(e);
    }

    checkAll.subscribe((value) => {
        check_all = value;
    });

    export let rows: {
        name: string;
        surname: string;
        checked: boolean;
    }[];

    $: console.log(rows);
</script>

{#if rows}
    <div class="overflow-x-hidden w-80 h-64">
        <table class="table table-xs table-pin-rows">
            <thead>
                <tr>
                    <th>#</th>
                    <th>
                        <input
                            type="checkbox"
                            class="checkbox checkbox-primary checkbox-xs"
                            on:change={() => {
                                checkAll.update((n) => !n);
                            }}
                            bind:checked={check_all}
                        />
                    </th>
                    <th>Name</th>
                    <th>Surname</th>
                </tr>
            </thead>
            <tbody>
                {#each rows as row, i}
                    <TableRow
                        rowNumber={i + 1 + ""}
                        name={row.name}
                        surname={row.surname}
                        checked={row.checked}
                    />
                {/each}
            </tbody>
        </table>
    </div>

    <button
        class="btn btn-error"
        on:click={() => {
            console.log($tableData);
        }}
    >
        Print table
    </button>
{/if}
