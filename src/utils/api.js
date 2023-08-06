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
