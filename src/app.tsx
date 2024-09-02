import { SyntheticEvent, useState } from "react";
import data from "./assets/contacts-data/contacts.json";
import { SearchInput } from "./components/search-input";
import { calculateAge } from "./utils/calculate-age";
import { getContacts } from "./utils/get-contacts";
import { useInfiniteScroll } from "./utils/use-infinite-scroll";

export type TContactsData = typeof data;

const CONTACTS_PAGE_SIZE = 10;

export function App() {
  const [searchValue, setSetarchValue] = useState<string | undefined>(
    undefined
  );
  const [currentResultsPage, setCurrentResultsPage] = useState(0);

  const filteredContacts = searchValue ? getContacts(data, searchValue) : data;

  const searchedContactsToRender = filteredContacts.slice(
    0,
    currentResultsPage * CONTACTS_PAGE_SIZE
  );

  const { observerTarget } = useInfiniteScroll(() => {
    if (filteredContacts.length > searchedContactsToRender.length) {
      setCurrentResultsPage((currentPage) => currentPage + 1);
    }
  });

  const onProfilePictureError = (
    e: SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const currentTarget = e.target as HTMLImageElement;
    currentTarget.src =
      import.meta.env.BASE_URL + "/profile-pictures/placeholder.png";
  };

  const showNoContactsPlaceholder =
    searchedContactsToRender.length === 0 && searchValue?.length;

  return (
    <div className="flex justify-center h-full">
      <div className="flex flex-col gap-y-4 w-[700px] py-4 h-full">
        <SearchInput onChange={setSetarchValue} wait={500} />
        <div className="h-auto overflow-scroll flex flex-col gap-y-4 flex-1">
          {!showNoContactsPlaceholder &&
            searchedContactsToRender.map((person) => {
              return (
                <div
                  className="w-full border flex gap-x-8 p-4 rounded-xl shadow-xl"
                  key={person._id}
                >
                  <img
                    className="w-20 h-20 rounded-full object-cover bg-gradient-to-t"
                    src={`${import.meta.env.BASE_URL}/profile-pictures/${
                      person.picture
                    }`}
                    onError={onProfilePictureError}
                  />
                  <div className="flex flex-col">
                    <h2>
                      <b>{person.name}</b>
                    </h2>
                    <span className="text-sm">
                      Age: {calculateAge(person.birthday)}
                    </span>
                    <span className="text-sm">
                      Phone: {person.phone_number}
                    </span>
                    <span className="text-sm">Address: {person.address}</span>
                  </div>
                </div>
              );
            })}
          {showNoContactsPlaceholder && (
            <span className="font-bold">
              No contacts found for: "{searchValue}"
            </span>
          )}
          <div ref={observerTarget}></div>
        </div>
      </div>
    </div>
  );
}
