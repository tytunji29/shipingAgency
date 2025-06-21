import axios, { AxiosError } from "axios";
import { APIURL, position, vubids_user } from "./Actions";
import { ACTION_TYPES, ShipmentDetails } from "@/lib/types";
import { toastService } from "@/lib/toast";
import router from "next/router";

const shipments = {
  setLoading: (dispatch: any, isLoading: boolean): void => {
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: isLoading });
  },
  setError: (dispatch: any, error: string | null): void => {
    dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error });
    toastService.error(error || "", { position });
  },

  create: async (
    dispatch: any,
    details: ShipmentDetails
  ): Promise<{ success: boolean; message: string }> => {
    try {
      shipments.setLoading(dispatch, true);

      // // Check authentication
      // if (!vubids_user) {
      //   shipments.setLoading(dispatch, false);
      //   return { success: false, message: "Authentication required" };
      // }

      const token = window.localStorage.getItem("vubids_token");
      const auth = `Bearer ${token}`;
      console.log(`token: ${auth}`);
      console.log(auth);
      const response = await axios.post(
        `${APIURL}/Shipments/create-shipment`,
        { ...details },
        { headers: { Authorization: auth } }
      );

      shipments.setLoading(dispatch, false);
      const result = response.data;

      if (result?.status === true) {
        toastService.success(result.message || "Shipment created", {
          position,
        });
        return {
          success: true,
          message: result.message || "Shipment created successfully",
        };
      } else {
        const errorMsg = result?.message || "Operation failed";
        toastService.error(errorMsg, { position });
        return { success: false, message: errorMsg };
      }
    } catch (error) {
      shipments.setLoading(dispatch, false);
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message || error.message
          : "An unknown error occurred";

      toastService.error(errorMessage, { position });
      return { success: false, message: errorMessage };
    }
  },

  fetchQuotes: async (dispatch: any) => {
    try {
      if (!vubids_user) {
        console.log("I Enter Here");
        return null;
      }
      const token = window.localStorage.getItem("vubids_token");
      const auth = `Bearer ${token}`;
      console.log(`token: ${auth}`);

      //const auth = `Bearer ${vubids_user}`;
      const response = await axios.get(
        `${APIURL}/Shipments/get-all-shipment-landing`,
        {
          headers: {
            Authorization: auth,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error?.response?.data.message || error.message
          : "An unknown error occurred";
      toastService.error(errorMessage, { position });
      // return [{}];
    }
  },
  itemCategories: async (dispatch: any) => {
    try {
      const response = await axios.get(
        `${APIURL}/Items/get-all-item-categories`,
        {
          headers: {
            Authorization: vubids_user,
          },
        }
      );
      const data = response.data;
      return data.data;
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error?.response?.data.message || error.message
          : "An unknown error occurred";
      toastService.error(errorMessage, { position });
    }
  },

  itemTypes: async (dispatch: any, id: string) => {
    try {
      const response = await axios.get(
        `${APIURL}/Items/get-all-item-types-by-category-id?categoryId=${id}`,
        {
          headers: {
            Authorization: vubids_user,
          },
        }
      );
      const data = response.data;
      console.log(data);
      //   if (!response || !data.data) {
      //     shipments.setError(dispatch, data.message);
      //   }
      return data.data;
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error?.response?.data.message || error.message
          : "An unknown error occurred";
      toastService.error(errorMessage, { position });
    }
  },

  all: async (dispatch: any) => {
    try {
      shipments.setLoading(dispatch, true);
      const response = await axios.get(`${APIURL}/Shipments/get-all-shipment`, {
        headers: {
          Authorization: vubids_user,
        },
      });
      const data = response.data;
      if (!response || !data.data) {
        shipments.setError(dispatch, data.message);
      }
      shipments.setLoading(dispatch, false);
      return data.data;
    } catch (error) {
      console.log(error);
      shipments.setLoading(dispatch, false);
      const errorMessage =
        error instanceof AxiosError
          ? error?.response?.data.message || error.message
          : "An unknown error occurred";
      toastService.error(errorMessage, { position });
    }
  },
};
export default shipments;
