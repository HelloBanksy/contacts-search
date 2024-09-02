import { TContactsData } from "../app";
import { calculateAge } from "./calculate-age";

const NAME_AND_AGE_REGEX = /^\s*[A-Za-z]+ +\d+\s*$/; // "<name> <age>" - Josh 11
const PHONE_AND_NAME_REGEX = /^\s*\d{10}\s+[A-Za-z]+\s*$/; // "<phone> <name>" 0535271540 Josh

/**
 * Matching patterns: any string given (searches through names) || "<name> <age>" (Josh 11) || "<phone> <name>" (0535271540 Josh)
 * Suggested future TODOs: add more matching patters, fuzzy search
 */
export function getContacts(
  data: TContactsData,
  searchValue: string | undefined
) {
  if (!searchValue) {
    return [];
  }

  if (searchValue.match(NAME_AND_AGE_REGEX)) {
    return getContactsByNameAndAge(data, searchValue);
  }

  if (searchValue.match(PHONE_AND_NAME_REGEX)) {
    return getContactsByPhoneAndName(data, searchValue);
  }

  return getContactsByName(data, searchValue);
}

/**
 * Helper funcitons
 */
function getContactsByNameAndAge(data: TContactsData, searchValue: string) {
  const trimmedSearchString = searchValue.trim();
  const splittedSearchString = trimmedSearchString.split(" ");

  const formattedName = splittedSearchString[0].toLocaleString();
  const age = Number(splittedSearchString[1]);

  const result: typeof data = [];

  data.forEach((person) => {
    if (
      calculateAge(person.birthday) === age &&
      person.name.toLocaleLowerCase().includes(formattedName)
    ) {
      result.push(person);
    }
  });

  return result;
}

function getContactsByPhoneAndName(data: TContactsData, searchValue: string) {
  const trimmedSearchString = searchValue.trim();
  const splittedSearchString = trimmedSearchString.split(" ");
  const phoneNumber = splittedSearchString[0];
  const phoneNumberPrefix = phoneNumber.slice(0, 3);
  const phoneNumberBody = phoneNumber.slice(3);
  const formettedPhoneNumber = `(${phoneNumberPrefix}) ${phoneNumberBody}`;
  const formattedName = splittedSearchString[1].toLocaleLowerCase();

  const result: typeof data = [];

  data.forEach((person) => {
    if (
      formettedPhoneNumber === person.phone_number &&
      person.name.includes(formattedName)
    ) {
      result.push(person);
    }
  });

  return result;
}

function getContactsByName(data: TContactsData, searchValue: string) {
  return data.filter((person) =>
    person.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
  );
}
