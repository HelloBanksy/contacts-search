import { SyntheticEvent, useState } from "react";
import data from "./assets/contacts-data/contacts.json";
import { SearchInput } from "./components/search-input";
import { calculateAge } from "./utils/calculate-age";
import { getContacts } from "./utils/get-contacts";
import { useInfiniteScroll } from "./utils/use-infinite-scroll";

export type TContactsData = typeof data;

const CONTACTS_PAGE_SIZE = 3;

export function App() {
  const [searchValue, setSetarchValue] = useState<string | undefined>(
    undefined
  );
  const [currentResultsPage, setCurrentResultsPage] = useState(0);

  const contacts = searchValue ? getContacts(data, searchValue) : data;

  const searchedContactsToRender = contacts.slice(
    0,
    currentResultsPage * CONTACTS_PAGE_SIZE
  );

  const { observerTarget } = useInfiniteScroll(() => {
    setCurrentResultsPage((currentPage) => currentPage + 1);
  });

  const onProfilePictureLoadError = (
    e: SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const currentTarget = e.target as HTMLImageElement;
    currentTarget.src = "/profile-pictures/placeholder.png";
  };

  return (
    <div className="flex justify-center h-full">
      <div className="flex flex-col gap-y-4 w-[700px] py-4 h-full">
        <SearchInput onChange={setSetarchValue} wait={500} />
        <div className="h-auto overflow-scroll flex flex-col gap-y-4 flex-1">
          {searchedContactsToRender.map((person) => {
            return (
              <div
                className="w-full border flex gap-x-8 p-4 rounded-xl shadow-xl"
                key={person._id}
              >
                <img
                  className="w-20 h-20 rounded-full object-cover bg-gradient-to-t"
                  src={`/profile-pictures/${person.picture}`}
                  onError={onProfilePictureLoadError}
                />
                <div className="flex flex-col">
                  <h2>
                    <b>{person.name}</b>
                  </h2>
                  <span className="text-sm">
                    Age: {calculateAge(person.birthday)}
                  </span>
                  <span className="text-sm">Phone: {person.phone_number}</span>
                  <span className="text-sm">Address: {person.address}</span>
                </div>
              </div>
            );
          })}

          {searchedContactsToRender.length === 0 && (
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
