import { useCallback, useEffect } from "react"
import { useAppDispatch } from "../../redux/hooks";
import { setSuccessAuth } from "./slices/AuthSlice";
import axios from "axios";
import { IAuthResponse } from "./interfaces/IAuthResponse";
import { useNavigate } from "react-router-dom";

export const useCheckAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const checkAuth = /* useCallback( */async function() {
        try {
            const response = await axios.get<IAuthResponse>(`/user/refresh`, {
              withCredentials: true,
            });

            // dispatch(setSuccessAuth(response.data));
            // navigate('/todos');
        } catch(e) {
            console.error(e)
            // navigate('/login');
        }
    }/* , [dispatch, navigate]); */

    return useEffect(() => {
        
        checkAuth();
    }/* , [checkAuth] */);
}