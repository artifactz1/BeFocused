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

const date = new Date(); // Create a Date object for the current date
const dayNumber = date.getDate();
const dayName = days[date.getDay()];
const monthName = months[date.getMonth()];
const year = date.getFullYear();

const current = {
  date,
  dayNumber,
  dayName,
  monthName,
  year
};

function getFullDateTime(date: Date) {
  // const date = new Date(dateString);
  const dayNumber = date.getDate();
  const dayNumberZero =
    date.getDate() <= 9 ? `0${dayNumber}` : dayNumber.toString();
  const dayName = days[date.getDay()];
  const monthNumber = date.getMonth();
  const monthName = months[date.getMonth()];
  const fullYear = date.getFullYear();
  const halfYear = date.getFullYear().toString().slice(-2);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDate = `${halfYear}-${monthNumber}-${dayNumberZero}`;
  const formattedMilitaryTime = `${hours}:${minutes}`;

  const amPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 0 to 12
  const formattedTime = `${formattedHours}:${minutes} ${amPm}`;

  return {
    dayNumber,
    dayNumberZero,
    dayName,
    monthNumber,
    monthName,
    fullYear,
    halfYear,
    hours,
    minutes,
    seconds,
    formattedDate,
    formattedTime
  };
}

// Export the objects
export { current, date, days, months, dayNumber, getFullDateTime };
