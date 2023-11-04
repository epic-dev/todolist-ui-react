import { combineReducers } from "redux";
import { ToDoReducer } from "../modules/ToDoList";
import { AuthReducer } from "../modules/Authentication";
import { baseMiddleware } from "./middlewares";

export const rootReducer = combineReducers({
    todos: ToDoReducer,
    auth: AuthReducer,
    [baseMiddleware.reducerPath]: baseMiddleware.reducer,
});