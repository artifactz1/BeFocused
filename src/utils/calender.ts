const date = new Date(); // Create a Date object for the current date

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const dayNumber = date.getDate();
const dayName = days[date.getDay()];
const monthName = months[date.getMonth()];
const year = date.getFullYear();

// Export the objects
export { date, days, months, dayNumber, dayName, monthName, year };
