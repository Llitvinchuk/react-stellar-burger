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
