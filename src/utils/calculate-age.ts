import { DateTime } from "luxon";

function transformToValidISO8601(dateStr: string) {
  return dateStr.replace(/\s+([+-]\d{2}:\d{2})$/, "$1");
}

export function calculateAge(isoDateString: string) {
  const birthDate = DateTime.fromISO(transformToValidISO8601(isoDateString));

  if (!birthDate.isValid) {
    throw new Error("Invalid ISO format date string");
  }

  const today = DateTime.now();
  const age = today.diff(birthDate, "years").years;

  return Math.floor(age);
}
