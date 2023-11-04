type Nominal<K, T> =  K & { __typename: T};
type DateString = Nominal<string, 'DateString'>;
export interface IToDo {
    id: string;
    label: string;
    checked: boolean;
    isEssential: boolean;
    createdAt: DateString;
    dueDate: DateString;
}