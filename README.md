# eternal-summer-vacation

```sh
npm install eternal-summer-vacation
```

In Japan, some people stray off into August 32nd. This is believed to be the result of thaumatologic act taken by students who make resistance against arrival of September 1st, which is the date of the end of their summer vacation.

To help victims of the incident, eternal-summer-vacation provides a [Temporal](https://tc39.es/proposal-temporal/docs/) calendar that supports August 32nd and following dates. Instead of transitioning to September and so on, eternal-summer-vacation suports dates up to August 153rd.

## Usage

```ts
import { Temporal } from "@js-temporal/polyfill";
import { eternalSummerVacationCalendar } from "eternal-summer-vacation";

const today = Temporal.PlainDate.from("2021-08-31").withCalendar(
  eternalSummerVacationCalendar
);

const tomorrow = today.plus(1);

console.log(tomorrow.month, tomorrow.date); // 8, 32   ← Hooray!
```

## Example

Simple Endless Summer Vacation Calendar made with React

https://codesandbox.io/s/eternal-summer-vacation-qctks?file=/src/App.tsx

## License

MIT

## Contributing

Welcome
