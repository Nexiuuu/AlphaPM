export function setLocalStorage(name: string, value: string) {
  localStorage.setItem(name, value);
}

export function getLocalStorage(name: string): string | null {
  return localStorage.getItem(name);
}

export function deleteLocalStorage(name: string) {
  localStorage.removeItem(name);
}
