<script lang="ts">
    export let rowNumber: string;
    export let name: string;
    export let surname: string;
</script>

<tr class="hover">
    <th>{rowNumber}</th>
    <th>
        <input type="checkbox" class="checkbox checkbox-primary checkbox-xs" />
    </th>
    <td>{name}</td>
    <td>{surname}</td>
</tr>
