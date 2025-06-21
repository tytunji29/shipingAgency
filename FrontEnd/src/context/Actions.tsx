import { toastService } from "@/lib/toast";
import { ACTION_TYPES } from "@/lib/types";
import user from "./UserActions";
import shipments from "./ShipmentActions";

//export const APIURL = "https://vubids.online/app/v1";
export const APIURL = "http://localhost:7121/app/v1";
export const position = "bottom-center";
export const vubids_user =
  typeof window !== "undefined"
    ? window.localStorage.getItem("vubids_token")
    : false;
export const main_user =
  typeof window !== "undefined"
    ? window.localStorage.getItem("user_Type")
    : false;

const actions = {
  user,
  shipments,
};

export default actions;

// export const setLoading = (dispatch: any, isLoading: boolean): void => {
//   dispatch({ type: ACTION_TYPES.SET_LOADING, payload: isLoading });
// };

// export const setError = (dispatch: any, error: string | null): void => {
//   dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error });
//   toastService.error(error || "", { position });
// };
