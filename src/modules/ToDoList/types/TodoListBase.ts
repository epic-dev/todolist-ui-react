import { FilterType } from "../ToDoSlices";

export type TodoListBase = {
    id: string,
    name: string,
    group: boolean,
    icon?: string,
    count: number,
    items: TodoListGroupItem[],
    selected: boolean,
    filterType?: FilterType,
};

export type TodoListGroupItem = {
    name: string,
};