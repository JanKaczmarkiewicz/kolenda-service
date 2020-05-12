const isValidDate = (d: Date) => d instanceof Date && isFinite(+d);

export const isTimeAfterNow = (time: string) =>
  isValidDate(new Date(time))
    ? new Date(time).getTime() - Date.now() > 0
    : true;
