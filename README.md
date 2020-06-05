# apollo-datasource-givefood

🥫 Apollo [data source](https://www.apollographql.com/docs/apollo-server/features/data-sources) for [GiveFood API](https://www.givefood.org.uk/api).

[Donate to Food Banks](https://www.givefood.org.uk) | [Find Nearby Food Banks](https://www.givefood.org.uk/needs)

## Install

```bash
npm i apollo-datasource-givefood
```

## Usage

The simplest way to get going is by using the DataSource directly.

```js
import { GiveFoodDataSource } from 'apollo-datasource-givefood';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    givefood: new GiveFoodDataSource(),
  }),
});
```

An alternative is subclassing `GiveFoodDataSource`.

```js
import { GiveFoodDataSource } from 'apollo-datasource-givefood';

class FoodBanks extends GiveFoodDataSource {
  constructor() {
    super();
    this.baseURL = '...';
  }

  getFoodBankBySlug(slug) {
    return this.getBySlug(slug);
  }
}
```

## API

### `getAll`

#### Example

```js
const resolvers = {
  Query: {
    organisations: (_source, _args, { dataSoures: { givefood } }) =>
      givefood.getAll(),
  },
};
```

### `getBySlug(slug)`

Get a food bank by `slug`, and all their needs and outlets.

#### Args

- `slug`: A slug for an individual food bank

#### Example

```js
const resolvers = {
  Query: {
    foodbank: (_source, { slug }, { dataSoures: { givefood } }) =>
      givefood.getBySlug(slug),
  },
};
```

### `getByLatLng(lat, lng)`

Get food banks near the provided `lat`/`lng`. Returns needs, along with distance in miles.

#### Args

- `lat` **(required)**: Latitude
- `lng` **(required)**: Longitude

#### Example

```js
const resolvers = {
  Query: {
    search: (_source, { lat, lng }, { dataSoures: { givefood } }) =>
      givefood.getByLatLng(slug),
  },
};
```

### `getByAddress(address)`

**It's recommended you don't use this**. Use `getByLatLng` where possible.

Use with caution, and **expect slower response times**.

#### Args

- `address` **(required)**: The address, e.g. `66 The Headrow Leeds LS1 8EQ

#### Example

```js
const resolvers = {
  Query: {
    search: (_source, { address }, { dataSoures: { givefood } }) =>
      givefood.getByAddress(address),
  },
};
```
