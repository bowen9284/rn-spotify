import React from 'react';
import moment from 'moment';

export const getDurationInHoursAndMinutes = (duration: number): string => {
  let hours = moment(duration).format('H');
  let minutes = moment(duration).format('m');
  return `${hours}h ${minutes}m`;
};
