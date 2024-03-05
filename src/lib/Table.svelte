<script lang="ts">
    import TableRow from "./TableRow.svelte";

    export let rows: {
        name: string;
        surname: string;
    }[];
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
                    />
                {/each}
            </tbody>
            <!-- <tfoot>
                <tr>
                    <th>Number</th>
                    <th>
                        <input
                            type="checkbox"
                            class="checkbox checkbox-primary checkbox-xs"
                        />
                    </th>
                    <th>Name</th>
                    <th>Surname</th>
                </tr>
            </tfoot> -->
        </table>
    </div>
{/if}
