export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({password, email})
  })
  .then(getResponse)
}

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email})
  })
  .then(getResponse)
  .then((data) => {
    if(data.token) { 
      localStorage.setItem('token', data.token); 
      return data; 
    } else { 
      return; 
    }
  })
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    "Authorization" : `Bearer ${token}`
    }
  })
  .then(getResponse)
}

function getResponse(res) {
  if(!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}