import { getCookie } from "./getCookie";

export const URL = "https://norma.nomoreparties.space/api";

export function getIngredients() {
  return fetch(`${URL}/ingredients`).then(checkResponse);
}
export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}
export const fetchOrderData = (ingredients) => {
  return fetch(`${URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients,
    }),
  });
};
// export const loginRequest = async (form) => {
//   return await fetch(`${URL}/auth/login`, {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify({
//       email: form.email,
//       password: form.password,
//     }),
//   });
// };

export const registerRequest = async (form) => {
  return await fetch(`${URL}/auth/register`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      password: form.password,
    }),
  });
};

export const passwordResetRequest = async (form) => {
  return await fetch(`${URL}/password-reset/reset`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      password: form.password,
      token: form.token,
    }),
  });
};

export const passwordRecoveryRequest = async (form) => {
  return await fetch(`${URL}/password-reset`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      email: form.email,
    }),
  });
};

export const logoutRequest = async (user) => {
  return await fetch(`${URL}/auth/logout`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      token: user.refreshToken,
    }),
  });
};

export const userDataRequest = async () => {
  return await fetch(`${URL}/auth/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
};

export const updateDataRequest = async (form) => {
  return await fetch(`${URL}/auth/user`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      password: form.password,
    }),
  });
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
};

export const request = (path, options) => {
  return fetch(`${URL}${path}`, options)
    .then(handleResponse)
    .then(checkResponse);
};

export const requestWithTokenRefresh = (path, options) => {
  return request(path, options).catch((err) => {
    if (err.message === "jwt expired") {
      return refreshToken().then((tokenResponse) => {
        localStorage.setItem("accessToken", tokenResponse.accessToken);
        localStorage.setItem("refreshToken", tokenResponse.refreshToken);
        options.headers.authorization = tokenResponse.accessToken;
        return request(path, options);
      });
    } else {
      return Promise.reject(err);
    }
  });
};

const refreshToken = () => {
  return request("/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};
