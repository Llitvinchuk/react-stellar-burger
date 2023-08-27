import { useContext, useState, createContext } from "react";
import {
  logoutRequest,
  passwordRecoveryRequest,
  passwordResetRequest,
  registerRequest,
  updateDataRequest,
} from "./api";
import { deleteCookie, setCookie } from "./getCookie";

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  //   const registerUser = async (form) => {
  //     const data = await registerRequest(form)
  //       .then((res) => res.json())
  //       .then((data) => data);
  //     if (data.success) {
  //       setUser({ ...data.user, id: data.user._id });
  //     }
  //   };
  const passRecoveryRequest = async (form) => {
    const data = await passwordRecoveryRequest(form)
      .then((res) => res.json())
      .then((data) => data);
    if (data.success) {
      setUser({ user });
    }
  };

  const passResetRequest = async (form) => {
    const data = await passwordResetRequest(form)
      .then((res) => res.json())
      .then((data) => data);
    if (data.success) {
      setUser({ ...data.user, password: data.user.password });
    }
  };

  //   const loginUser = async (form) => {
  //     const data = await loginRequest(form)
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         console.log(data);
  //         const authToken = data.accessToken.split("Bearer ")[1];

  //         if (authToken) {
  //           setCookie("token", authToken);
  //         }
  //         return data;
  //       });

  //     if (data.success) {
  //       setUser({
  //         ...data.user,
  //         id: data.user._id,
  //         refreshToken: data.refreshToken,
  //       });
  //     }
  //   };
  const signOut = async () => {
    await logoutRequest(user);
    setUser(null);
    deleteCookie("token");
  };
  const updateDataUserRequest = async (form) => {
    const data = await updateDataRequest(form)
      .then((res) => res.json())
      .then((data) => data);
    if (data.success) {
      setUser({
        name: data.user.name,
        email: data.user.email,
        password: data.user.password,
      });
    }
  };
  return {
    user,

    passRecoveryRequest,
    passResetRequest,

    signOut,
    updateDataUserRequest,
  };
}
