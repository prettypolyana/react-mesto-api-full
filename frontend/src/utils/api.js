class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getHeaders() {
        const jwt = localStorage.getItem("jwt");
        const headers = this._headers;
        headers.authorization = `Bearer ${jwt}`;
        return headers;
    }

    getUserInfo() {
        return this._request(`${this._baseUrl}/users/me`, {
            headers: this._getHeaders()
        });
    }

    setUserInfo(name, about) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: name,
                about: about
              })
        });
    }

    setAvatar(avatar) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                avatar: avatar
              })
        });
    }

    getInitialCards() {
        return this._request(`${this._baseUrl}/cards`, {
            headers: this._getHeaders()
        });
    }

    addCard(name, link) {
        return this._request(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: name,
                link: link
              })
        });
    }

    removeCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._getHeaders()
        });
    }

    addLike(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._getHeaders()
        });
    }

    removeLike(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._getHeaders()
        });
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    }
    
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

export default new Api({
    baseUrl: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});
