import { baseUrl } from "./constants";


function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, {
    ...options,
    mode: 'cors',
    credentials: 'omit',
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error('API request error:', err, 'URL:', url);
      throw err;
    });
}

const getClothingItems = () => {
  return request(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const addClothingItems = ({ name, imageUrl, weather }, token) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
};

const deleteClothingItems = (item, token) => {
  return request(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

const addCardLike = (id, token) => {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

const removeCardLike = (id, token) => {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export {
  baseUrl,
  checkResponse,
  request,
  getClothingItems,
  addClothingItems,
  deleteClothingItems,
  addCardLike,
  removeCardLike,
};