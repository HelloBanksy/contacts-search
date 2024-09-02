### Local Dev Setup
- clone the repository and navigate inside of the directory in your terminal
- if you have not already, install `pnpm` package manager - `npm install -g pnpm`
- install dependencies `pnpm install`
- run dev server `pnpm dev`
- navigate to `http://localhost:3000/contacts-search/` in your browser


### Local Production Setup
- `pnpm build`
- `pnpm preview`
- navigate to `http://localhost:3000/contacts-search/` in your browser


### Notes:
To accomplish true pagination, the app would need a running BE with an endpoint that serves pages of contacts.
#### Example Get Contacts Endpoint:

`GET /api/contacts`

**Description:**

This endpoint retrieves information about contacts.

**Request:**

- **URL Parameters:**
  - `page` (number, required): Requested page number.
 
**Response:**
```
{
  items: [{
    _id: "5dd6a1bfc38a0e09ff3486e3",
    picture: "image4.png",
    birthday: "1937-09-16T11:20:19 -02:00",
    name: "Clarissa Donaldson",
    address: "226 Hubbard Street, Innsbrook, Maryland, 3501",
    phone_number: "(052) 5710163"
  }],
  page: 2,
  totalNumberOfContacts: 875,
}
```




[production version](https://hellobanksy.github.io/contacts-search/)
