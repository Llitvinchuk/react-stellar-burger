const URL = "https://norma.nomoreparties.space/api";

export function getIngredients() {
  return fetch(`${URL}/ingredients`).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(response.status);
  });
}

export function getOrderModal() {
  return fetch(`${URL}/orders`, {
    method: "POST",
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(response.status);
  });
}
