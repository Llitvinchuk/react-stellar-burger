const URL = "https://norma.nomoreparties.space/api";

export function getIngredients() {
  return fetch(`${URL}/ingredients`).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(response.status);
  });
}
