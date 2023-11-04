import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IToDo } from "./interfaces/IToDo";

export enum FilterType {
    Essential,
    Today,
    Planned,
    All,
    Custom,
}

interface IToDoInitialState {
    entry: IToDo | null;

    successfullyAdded: boolean | null;

    entries: IToDo[] | null;
    errors: string[] | null;

    selectedFilter: FilterType;
}

// probably could be union type
const initialState: IToDoInitialState = {
    entry: null,

    successfullyAdded: null,

    entries: [],
    errors: null,

    selectedFilter: FilterType.Today,
}

export const ToDoSlice = createSlice({
    name: 'ToDoSlice',
    initialState,
    reducers: {
        setToDos: (state, action: PayloadAction<IToDo[]>) => {
            state.entries = action.payload;
        },
        setFailedState: (state, action: PayloadAction<string[]>) => {
            state.entries = null;
            state.errors = action.payload;
        },
        setOneToDo: (state, action: PayloadAction<IToDo>) => {
            state.entry = action.payload;
        },
        newToDoAdded: (state, action: PayloadAction<boolean>) => {
            state.successfullyAdded = action.payload;
        },
        setSelected: (state, action: PayloadAction<FilterType>) => {
            state.selectedFilter = action.payload;
        }
    }
});

export const { setToDos, setFailedState, setOneToDo, newToDoAdded, setSelected } = ToDoSlice.actions;

export default ToDoSlice.reducer;