import { BASE_URL } from '../configs/api';

function get(url, token) {
  return fetch(`${BASE_URL}${url}`, {
    headers: {
      authorization: token
    }
  }).then((res) => res.json());
}

function post(url, data, token) {
  return fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(data)
  }).then((res) => {
    if (res.status === 204 || res.code === 204) {
      return {};
    }

    return res.json();
  });
}

function put(url, data, token) {
  return fetch(`${BASE_URL}${url}`, {
    method: 'PUT',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(data)
  }).then((res) => res.json());
}

function destroy(url, token) {
  return fetch(`${BASE_URL}${url}`, {
    method: 'DELETE',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  });
}

export default { get, post, put, destroy };
