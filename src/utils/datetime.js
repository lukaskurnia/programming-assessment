import spacetime from "spacetime";

export function toReadable(date) {
  return spacetime(date, "Asia/Jakarta").unixFmt("EEEE, dd MMMM YYYY, h:mm a");
}

export const millisecondToTime = millisecond => {
  let totalSeconds = Math.floor(millisecond / 1000);
  totalSeconds %= 24 * 3600;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
  };
};
