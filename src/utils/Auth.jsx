export function saveToken(token) {
  localStorage.setItem('user_id', token);
}

export function getToken() {
  return localStorage.getItem('user_id');
}

export function logout() {
  localStorage.removeItem('user_id');
}

export function isAuthenticated() {
  return !!getToken();
}
