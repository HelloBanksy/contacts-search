import { TContactsData } from '../app'
import { calculateAge } from './calculate-age'

const NAME_AND_AGE_REGEX = /^\s*[A-Za-z]+ +\d+\s*$/ // "<name> <age>" - Josh 11
const PHONE_AND_NAME_REGEX = /^\s*\d{10}\s+[A-Za-z]+\s*$/ // "<phone> <name>" 0535271540 Josh

/**
 * Matching patterns: any string given (searches through names) || "<name> <age>" (Josh 11) || "<phone> <name>" (0535271540 Josh)
 * Suggested future TODOs: add more matching patters, fuzzy search
 */
export function searchContacts(originalContacts: TContactsData, searchValue: string | undefined) {
  if (!searchValue) {
    return []
  }

  if (searchValue.match(NAME_AND_AGE_REGEX)) {
    return searchContactsByNameAndAge(originalContacts, searchValue)
  }

  if (searchValue.match(PHONE_AND_NAME_REGEX)) {
    return searchContactsByPhoneAndName(originalContacts, searchValue)
  }

  return searchContactsByName(originalContacts, searchValue)
}

/**
 * Helper funcitons
 */
function searchContactsByNameAndAge(originalContacts: TContactsData, searchValue: string) {
  const trimmedSearchString = searchValue.trim()
  const splittedSearchString = trimmedSearchString.split(' ')

  const formattedName = splittedSearchString[0].toLocaleString()
  const age = Number(splittedSearchString[1])

  const result: TContactsData = []

  originalContacts.forEach((person) => {
    if (calculateAge(person.birthday) === age && person.name.toLocaleLowerCase().includes(formattedName)) {
      result.push(person)
    }
  })

  return result
}

function searchContactsByPhoneAndName(originalContacts: TContactsData, searchValue: string) {
  const trimmedSearchString = searchValue.trim()
  const splittedSearchString = trimmedSearchString.split(' ')
  const phoneNumber = splittedSearchString[0]
  const phoneNumberPrefix = phoneNumber.slice(0, 3)
  const phoneNumberBody = phoneNumber.slice(3)
  const formettedPhoneNumber = `(${phoneNumberPrefix}) ${phoneNumberBody}`
  const formattedName = splittedSearchString[1].toLocaleLowerCase()

  const result: TContactsData = []

  originalContacts.forEach((person) => {
    if (formettedPhoneNumber === person.phone_number && person.name.includes(formattedName)) {
      result.push(person)
    }
  })

  return result
}

function searchContactsByName(originalContacts: TContactsData, searchValue: string) {
  return originalContacts.filter((person) => person.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
}
