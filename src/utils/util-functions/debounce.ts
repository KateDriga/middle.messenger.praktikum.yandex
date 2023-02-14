export function debounce(func: (...args) => void, timeoutMs = 500) {
  return function (...args) {
    const previousCall: number | undefined = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall && this.lastCall - previousCall <= timeoutMs) {
      clearTimeout(this.lastCallTimer);
    }
    this.lastCallTimer = setTimeout(() => func(...args), timeoutMs);
  };
}
