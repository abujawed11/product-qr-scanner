export const formatDateTime = (dateStr: string | null | undefined): string => {
  if (!dateStr) return 'N/A';

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 'Invalid Date';

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const time = `${formattedHours}:${formattedMinutes} ${ampm}`;

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${time} | ${day}/${month}/${year}`;
};
