"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { AppState, ACTION_TYPES, AppContextType } from "@/lib/types";
import actions from "./Actions";
import { appReducer } from "./Reducers";

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial state
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Props for AppProvider
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const router = useRouter();
  const { user, shipments } = actions;

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("vubids_token")
      : null;

  // Auto-authenticate on first load
  useEffect(() => {
    if (token) {
      validateAuthToken(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateAuthToken = async (token: string) => {
    const isValid = await user.authUser(dispatch, token);
    if (isValid) {
      dispatch({ type: ACTION_TYPES.SET_AUTH });
      router.push("/dashboard");
    } else {
      logoutUser();
    }
  };

const logoutUser = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("vubids_token");
    dispatch({ type: ACTION_TYPES.LOGOUT });
    router.push("/login");
  }
};


  const contextValue: AppContextType = {
    state,
    loginUser: (credentials) => user.loginUser(dispatch, credentials),
    authUser: (token) => user.authUser(dispatch, token),
    logoutUser,
    setError: (error) => user.setError(dispatch, error),
    signupUser: (credentials) => user.signupUser(dispatch, credentials,1),
    signupCompanyUser: (credentials) => user.signupUser(dispatch, credentials,2),
    updateProfile: (credentials) => user.updateProfile(dispatch, credentials),
    addPayment: (credentials) => user.addPayment(dispatch, credentials),
    createShipment: (details) => shipments.create(dispatch, details),
    allShipments: () => shipments.all(dispatch),
    itemCategories: () => shipments.itemCategories(dispatch),
    fetchQuotes: () => shipments.fetchQuotes(dispatch),
    itemTypes: (id) => shipments.itemTypes(dispatch, id),
    submitTicket: (body) => user.submitTicket(dispatch, body),
    getTickets: () => user.getTickets(dispatch),
    changePassword: (credentials) =>
      user.changePassword(dispatch, credentials),
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
