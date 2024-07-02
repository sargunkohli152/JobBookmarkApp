import { differenceInDays, parseISO, differenceInCalendarMonths } from 'date-fns'; 

// Utility function to calculate days difference from a given timestamp
export const calculateDaysDifference = (timestamp = "2024-03-13T19:30:30.145646+05:30") => {
  const updatedDate = parseISO(timestamp);
  const currentDate = new Date();
  const daysDifference = differenceInDays(currentDate, updatedDate);
  if(daysDifference > 30){
    return `${differenceInCalendarMonths(currentDate, updatedDate)} months ago`;
  }
  return `${daysDifference} days ago`;
};