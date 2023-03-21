class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}: ${res.statusText}`);
  }

  async getUserInfo() {
    const res = await fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async getCards() {
    const res = await fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async editUserInfo(newName, newAbout) {
    const res = await fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      }),
    });
    return this._checkResponse(res);
  }

  async addCard(data) {
    const res = await fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return this._checkResponse(res);
  }

  async removeCard(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

	async handleCardLike(cardId, isLiked) {
		const res = await fetch(`${this._url}/cards/${cardId}/likes`, {
			method: `${isLiked ? "DELETE" : "PUT"}`,
      headers: this._headers
		});
		return this._checkResponse(res);
	}

  async editUserAvatar(data) {
    const res = await fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return this._checkResponse(res);
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "9c533fd0-d94f-4f7c-9870-53ced17f9818",
    "Content-Type": "application/json",
  },
});

export default api;