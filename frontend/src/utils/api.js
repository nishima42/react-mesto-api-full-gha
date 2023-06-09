class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _checkResponse(res) {
      if(res.ok) { 
        console.log('Ответ получен');
        return res.json();
      } else {      
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    }

    getToken() {
      const token = localStorage.getItem('token');
      return token;
    }
    
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          ...this._headers,
          'Authorization': `Bearer ${this.getToken()}`
        },
        credentials: 'include'
      })
      .then(this._checkResponse)
    }
  
    getCardArray() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: {
          ...this._headers,
          'Authorization': `Bearer ${this.getToken()}`
        },
        credentials: 'include'
      })
      .then(this._checkResponse)
    }
  
    patchUserInfo(formData) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          ...this._headers,
          'Authorization': `Bearer ${this.getToken()}`
        },
        body: JSON.stringify({
          name: formData.name,
          about: formData.about
        }),
        credentials: 'include'
      })
      .then(this._checkResponse)
    }
  
    patchAvatar(avatarLink) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          ...this._headers,
          'Authorization': `Bearer ${this.getToken()}`
        },
        body: JSON.stringify({
          avatar: avatarLink.avatar
        }),
        credentials: 'include'
      })
      .then(this._checkResponse)
    }
  
    postCard({name, link}) {
      this._name = name;
      this._link = link;
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          ...this._headers,
          'Authorization': `Bearer ${this.getToken()}`
        },
        body: JSON.stringify({
          name: this._name,
          link: this._link
        }),
        credentials: 'include'
      })
      .then(this._checkResponse)
    }
  
    deleteCard(cardId) {
      this._cardId = cardId;
      return fetch(`${this._baseUrl}/cards/${this._cardId}`, {
        method: 'DELETE',
        headers: {
          ...this._headers,
          'Authorization': `Bearer ${this.getToken()}`
        },
        credentials: 'include'
      })
      .then(this._checkResponse)
    }
  
    addLike(id) {
      this._id = id;
      return fetch(`${this._baseUrl}/cards/${this._id}/likes`, {
        method: 'PUT',
        headers: {
          ...this._headers,
          'Authorization': `Bearer ${this.getToken()}`
        },
        credentials: 'include'
      })
      .then(this._checkResponse)
    }
    
    removeLike(id) {
      this._id = id;
      return fetch(`${this._baseUrl}/cards/${this._id}/likes`, {
        method: 'DELETE',
        headers: {
          ...this._headers,
          'Authorization': `Bearer ${this.getToken()}`
        },
        credentials: 'include'
      })
      .then(this._checkResponse)
    }

    changeLikeCardStatus(id, isLiked) {
      this._id = id;
      this._isLiked = isLiked;
      return fetch(`${this._baseUrl}/cards/${this._id}/likes`, {
        method: `${this._isLiked ? 'PUT' : 'DELETE'}`,
        headers: {
          ...this._headers,
          'Authorization': `Bearer ${this.getToken()}`
        },
        credentials: 'include'
      })
      .then(this._checkResponse)
    }
}

const api = new Api({
    baseUrl: 'https://api.nishima42.students.nomoredomains.monster',
    headers: {
      'Content-Type': 'application/json'
    } 
  });

export default api;