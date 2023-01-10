const MS_PER_DAY = 1000 * 60 * 60 * 24;

const dateDiffDays = (date1: Date, date2: Date): number => {
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return Math.floor((utc2 - utc1) / MS_PER_DAY);
};

export function formatMessageDate(dateString: string): string {
  const date = new Date(dateString);
  const diff = dateDiffDays(date, new Date());
  const locale = navigator.language;
  return diff === 0
    ? date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
    : diff < 7
    ? date.toLocaleDateString(locale, { weekday: 'short' })
    : date.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'short',
        year: '2-digit',
      });
}
