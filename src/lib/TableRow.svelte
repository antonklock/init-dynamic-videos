<script lang="ts">
    export let rowNumber: string;
    export let name: string;
    export let surname: string;
    export let checked: boolean;

    import { checkAll } from "./stores/tableStore.js";

    $: {
        checked = $checkAll;
    }
</script>

<tr class="hover">
    <th>{rowNumber}</th>
    <th>
        <input
            type="checkbox"
            class="checkbox checkbox-primary checkbox-xs"
            {checked}
        />
    </th>
    <td>{name}</td>
    <td>{surname}</td>
</tr>
