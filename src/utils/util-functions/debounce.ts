export function debounce(func: (...args) => void, timeoutMs = 500) {
  let id = null;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => {
      func(...args);
      clearTimeout(id);
    }, timeoutMs);
  };
}
