import { Dispatch } from "redux";
import $api from "../../shared/http";
import { IToDoResponse } from "./interfaces/IToDoResponse";
import { newToDoAdded, setFailedState, setOneToDo, setToDos } from "./ToDoSlices";
import { AxiosError } from "axios";
import { IToDo } from "./interfaces/IToDo";
import { createApi } from "@reduxjs/toolkit/query";
import { baseMiddleware } from "../../redux/middlewares";

export const fetchAll = () => async (dispatch: Dispatch) => {
    try {
        const { data } = await $api.get<IToDo[]>('/todo/fetch');
        dispatch(setToDos(data));
    } catch(e) {
        const { response } = e as AxiosError<{errors: string[]}>
        dispatch(setFailedState(response?.data.errors ?? [''])) //FIXME
    }
}

export const fetchById = (id: string) => async (dispatch: Dispatch) => {
    try {
        const { data } = await $api.get<IToDo>(`/todo/fetch/${id}`);
        dispatch(setOneToDo(data));
    } catch(e) {
        console.error(e);
    }
}

export const addNewToDo = (label: string) => async (dispatch: Dispatch) => {
    try {
        await $api.post('/todo/add', { label });
        dispatch(newToDoAdded(true));
    } catch(e) {
        console.error(e);
        dispatch(newToDoAdded(false));
    }
}

export const todoApi = baseMiddleware.injectEndpoints({
    endpoints: (build) => ({
        fetchAllTodos: build.query<IToDo[], string>({
            query: () => 'todo/fetch',
        }),
    }),
    overrideExisting: false,
})

export const { useFetchAllTodosQuery, useLazyFetchAllTodosQuery } = todoApi;