import { writable } from "svelte/store";

export const checkAllStore = writable(true);
export const tableDataStore = writable([]);