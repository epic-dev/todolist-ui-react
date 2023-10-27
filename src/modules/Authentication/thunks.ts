import { Dispatch } from "redux";
import AuthService from "./services/AuthService";
import { reset, setAuthError, setSuccessAuth } from "./slices/AuthSlice";
import { AxiosError } from "axios";

export const login = (email: string, password: string) =>
    async (dispatch: Dispatch) => {
        try {
            const response = await AuthService.login(email, password);
            if (!response) {
                console.log('Login attempt is unsuccessful', response)
                
                return;
            }
            const { data } = response;
            dispatch(setSuccessAuth(data));

            return true;
        } catch(e) {
            // FIXME
            const { response } = e as AxiosError<{message: string, errors: string[]}>; //axios error
            dispatch(setAuthError([response?.data.message ?? '']));
            return false;
        }
    }
export const logout = () => (dispatch: Dispatch) => {
    dispatch(reset());
};
export const registration = (email: string, password: string) =>
    async (dispatch: Dispatch) => {
        try {
            const { data } = await AuthService.registration(email, password);
            dispatch(setSuccessAuth(data));
            return true;
        } catch(e) {
            // FIXME DRY
            const { response } = e as AxiosError<{message: string, errors: string[]}>; //axios error
            dispatch(setAuthError([response?.data.message ?? '']));
            return false;
        }
    }