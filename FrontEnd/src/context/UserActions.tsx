import axios, { AxiosError } from "axios";
import {
  ACTION_TYPES,
  LoginCredentials,
  LoginResponse,
  PasswordCredentials,
  Ticket,
} from "@/lib/types";
import { toastService } from "@/lib/toast";
import toast from "react-hot-toast";
import { APIURL, position, vubids_user } from "./Actions";

const errorHandler = (dispatch: any, error: any, action: any) => {
  action.setLoading(dispatch, false);
  let errorMessage;
  if (error instanceof AxiosError) {
    errorMessage = error?.response?.data.message;
  } else if (error?.isCustom || error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = "An unknown error occurred";
  }

  action.setError(dispatch, errorMessage);
};

const user = {
  setLoading: (dispatch: any, isLoading: boolean): void => {
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: isLoading });
  },
  setError: (dispatch: any, error: string | null): void => {
    dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error });
    toastService.error(error || "", { position });
  },
  loginUser: async (dispatch: any, credentials: LoginCredentials) => {
    try {
      user.setLoading(dispatch, true);
      // Simulate API call
      const response = await axios.post(`${APIURL}/Auth/Login`, {
        ...credentials,
      });

      if (!response || !response.data) {
        throw new Error();
      }
      if (response.data.status == false) {
        const customError: any = new Error(response.data.message);
        customError.isCustom = true;
        throw customError;
      }
      const data = response.data.data;
      dispatch({ type: ACTION_TYPES.SET_USER, payload: data });
      user.setLoading(dispatch, false);
      toast.success(response.data.message, { position });
       window.localStorage.setItem("vubids_token", data.token);
       window.localStorage.setItem("user_Type", data.isCompany);
      console.log("Full login response data:", response.data.data);

      return data;
    } catch (error: any) {
      user.setLoading(dispatch, false);
      let errorMessage;
      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data.message;
      } else if (error?.isCustom || error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = "An unknown error occurred";
      }

      user.setError(dispatch, errorMessage);
    }
  },
  authUser: async (dispatch: any, token: string) => {
    try {
      user.setLoading(dispatch, true);
      const response = await axios.get(`${APIURL}/Auth/get-customer-profile`, {
        headers: {
          Authorization: token,
        },
      });
      if (!response || !response.data) {
        throw new Error();
      }

      if (response.data.status == false) {
        const customError: any = new Error(response.data.message);
        customError.isCustom = true;
        throw customError;
      }

      const data = response.data.data as LoginResponse;
      dispatch({ type: ACTION_TYPES.SET_USER, payload: data });
      user.setLoading(dispatch, false);
      toast.success(response.data.message, { position });
      
      return data;
    } catch (error) {
      errorHandler(dispatch, error, user);
    }
  },
  signupUser: async (dispatch: any, credentials: any, source: any) => {
  let completeUrl = "";
  if (source === 1)
    completeUrl = `${APIURL}/Auth/Customer-SignUp`;
  else
    completeUrl = `${APIURL}/Auth/corporate-SignUp`; // Same URL, so this conditional may not be necessary

  try {
    user.setLoading(dispatch, true);

    const response = await axios.post(completeUrl, {
      ...credentials,
    });

    if (!response || !response.data) {
      throw new Error();
    }

    if (response.data.status === false) {
      const customError: any = new Error(response.data.message);
      customError.isCustom = true;
      throw customError;
    }

    const data = response.data.data;
    user.setLoading(dispatch, false);
    toast.success(response.data.message, { position });
    return data;

  } catch (error) {
    errorHandler(dispatch, error, user);
  }
},

  updateProfile: async (dispatch: any, credentials: any) => {
    try {
      user.setLoading(dispatch, true);
      const response = await axios.patch(
        `${APIURL}/Auth/update-profile`,
        {
          ...credentials,
        },
        {
          headers: {
            Authorization: vubids_user,
          },
        }
      );
      const data = response.data;
      if (!response?.data) {
        user.setError(dispatch, data.message);
      }
      user.setLoading(dispatch, false);
      toast.success(response.data.message, { position });
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error?.response?.data.message
          : "An unknown error occurred";
      user.setError(dispatch, errorMessage);
    }
  },
  changePassword: async (dispatch: any, credentials: PasswordCredentials) => {
    try {
      user.setLoading(dispatch, true);
      // Simulate API call
      const response = await axios.post(
        `${APIURL}/Auth/change-password`,
        {
          ...credentials,
        },
        {
          headers: {
            Authorization: vubids_user,
          },
        }
      );

      if (!response) {
        user.setError(dispatch, "Password update failed");
      }

      const data = response.data;
      dispatch({ type: ACTION_TYPES.SET_USER, payload: data });
      user.setLoading(dispatch, false);
      return data;
    } catch (error) {
      user.setLoading(dispatch, false);
      const errorMessage =
        error instanceof AxiosError
          ? error?.response?.data.message
          : "An unknown error occurred";
      user.setError(dispatch, errorMessage);
    }
  },
  addPayment: async (dispatch: any, credentials: any) => {
    try {
      user.setLoading(dispatch, true);
      // Simulate API call
      const response = await axios.post(
        `${APIURL}/Payments/add-payment-detaills`,
        {
          ...credentials,
        },
        {
          headers: {
            Authorization: vubids_user,
          },
        }
      );
      const data = response.data;
      if (!response || !data.data) {
        user.setError(dispatch, data.message);
      }
      user.setLoading(dispatch, false);
      return data.data;
    } catch (error) {
      errorHandler(dispatch, error, user);
    }
  },
  submitTicket: async (dispatch: any, body: Ticket) => {
    try {
      user.setLoading(dispatch, true);
      const response = await axios.post(
        `${APIURL}/Supports/submit-ticket`,
        {
          ...body,
        },
        {
          headers: {
            Authorization: vubids_user,
          },
        }
      );

      if (!response) {
        user.setError(dispatch, "Ticket Submission failed");
      }

      const data = response.data;
      user.setLoading(dispatch, false);
      toast.success(response.data.message, { position });
      return data;
    } catch (error) {
      errorHandler(dispatch, error, user);
    }
  },
  getTickets: async (dispatch: any) => {
    try {
      const response = await axios.get(
        `${APIURL}/Supports/get-all-transporters`,
        {
          headers: {
            Authorization: vubids_user,
          },
        }
      );
      const data = response.data;
      return data.data;
    } catch (error) {
      errorHandler(dispatch, error, user);
    }
  },
};

export default user;
