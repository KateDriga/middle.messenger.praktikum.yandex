export function navigate(path: string) {
  if (path !== window.location.pathname) {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  }
}
