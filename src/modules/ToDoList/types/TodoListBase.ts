export type TodoListBase = {
    id: string,
    name: string,
    group: boolean,
    icon?: string,
    count: number,
    items: TodoListGroupItem[],
    selected: boolean,
};

export type TodoListGroupItem = {
    name: string,
};