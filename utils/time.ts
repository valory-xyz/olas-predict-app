/**
 *
 * @param ms timestamp in ms
 * @returns time in format "10:15 am July 26, 2024"
 */
export const formatTimestamp = (ms: number) => {
  const date = new Date(ms);

  // get hours and minutes, and determine AM/PM
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12; // convert to 12-hour format

  const formattedDate = date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return `${hours}:${minutes} ${ampm} ${formattedDate}`;
};
