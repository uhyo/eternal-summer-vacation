import { Temporal } from "@js-temporal/polyfill";
const calendarId = "ethernal-summer-vacation";
export const ethernalSummerVacationCalendar =
  new (class extends Temporal.Calendar {
    override id: string = calendarId;
    constructor() {
      super("iso8601");
    }
    override month(date: DateLike) {
      return ethernalDate(getPlainDateWithISOCalendar(date, 8))[0];
    }
    override day(date: DateLike) {
      return ethernalDate(getPlainDateWithISOCalendar(date))[1];
    }
    override monthCode(date: DateLike) {
      const [month, , isoDate] = ethernalDate(
        getPlainDateWithISOCalendar(date)
      );
      return Temporal.PlainYearMonth.from({ year: isoDate.year, month })
        .monthCode;
    }
    override dateFromFields(
      fields: Parameters<typeof isoDateFromFields>[0],
      options: Temporal.AssignmentOptions
    ): Temporal.PlainDate {
      const { year, month, day } = isoDateFromFields(fields, options);
      return new Temporal.PlainDate(
        year,
        month,
        day,
        ethernalSummerVacationCalendar
      );
    }
    override yearMonthFromFields(
      fields: {
        year: number | undefined;
        month: number | undefined;
      },
      options: Temporal.AssignmentOptions
    ): Temporal.PlainYearMonth {
      const { year, month } = isoDateFromFields(
        { ...fields, day: undefined },
        options
      );
      return new Temporal.PlainYearMonth(
        year,
        month,
        ethernalSummerVacationCalendar
      );
    }
    override monthDayFromFields(
      fields: {
        month: number | undefined;
        day: number;
      },
      options: Temporal.AssignmentOptions
    ): Temporal.PlainMonthDay {
      const { month, day } = isoDateFromFields({ ...fields, year: 0 }, options);
      return new Temporal.PlainMonthDay(
        month,
        day,
        ethernalSummerVacationCalendar
      );
    }
    override daysInMonth(date: DateLike) {
      const [m, , isoDate] = ethernalDate(getPlainDateWithISOCalendar(date, 8));
      if (m === 8) {
        return 99;
      }
      if (m === 11) {
        // 1-7 are absorbed by Augst
        return 30 - 7;
      }
      return super.daysInMonth(isoDate);
    }

    override fields(fields: Iterable<string>) {
      return super.fields(fields);
    }
  })();

type DateLike =
  | Temporal.PlainDate
  | Temporal.PlainDateTime
  | Temporal.PlainYearMonth
  | Temporal.DateLike
  | string;

function ethernalDate(
  isoDate: Temporal.PlainDate
): [month: number, day: number, isoDate: Temporal.PlainDate] {
  if (isoDate.month < 8) {
    return [isoDate.month, isoDate.day, isoDate];
  }
  const august1st = isoDate.with({ month: 8, day: 1 });
  const daysFromAugust1st =
    isoDate.since(august1st, { largestUnit: "day" }).days + 1;
  if (daysFromAugust1st <= 99) {
    return [8, daysFromAugust1st, isoDate];
  } else {
    return [isoDate.month, isoDate.day, isoDate];
  }
}

function getPlainDateWithISOCalendar(date: DateLike, defaultDay?: number) {
  if (date instanceof Temporal.PlainYearMonth) {
    const fields = date.getISOFields();
    return new Temporal.PlainDate(
      fields.isoYear,
      fields.isoMonth,
      defaultDay ?? fields.isoDay
    );
  }
  if (isTemporalDateLike(date)) {
    const fields = date.getISOFields();
    return new Temporal.PlainDate(
      fields.isoYear,
      fields.isoMonth,
      fields.isoDay
    );
  } else if (typeof date === "string") {
    return Temporal.PlainDate.from(date);
  } else {
    return Temporal.PlainDate.from({ ...date, calendar: "iso8601" });
  }
}

function constrain(num: number, min: number, max: number) {
  if (num < min) {
    return min;
  }
  if (num > max) {
    return max;
  }
  return num;
}

/**
 * Converts an ethernal date to ISO date.
 */
function isoDateFromFields(
  fields: {
    year: number | undefined;
    month: number | undefined;
    day: number | undefined;
  },
  options: Temporal.AssignmentOptions
): {
  year: number;
  month: number;
  day: number;
} {
  let { year = 0, month = 1, day } = fields;
  if (month === 8) {
    day = fields.day ?? 1;
    if ((day < 1 || 99 < day) && options.overflow === "reject") {
      throw new RangeError("Invalid Date");
    }
    day = constrain(day, 1, 99);
    const august1st = new Temporal.PlainDate(year, 8, 1);
    const targetDate = august1st.add({ days: day - 1 });
    return {
      year: targetDate.year,
      month: targetDate.month,
      day: targetDate.day,
    };
  }
  // 08-99 in ethernal calendar corresponds to 11-07 in ISO calendar
  if (month === 9 || month === 10) {
    throw new RangeError("Invalid Date");
  }
  if (month === 11) {
    day = fields.day ?? 8;
    if ((day < 8 || 30 < day) && options.overflow === "reject") {
      throw new RangeError("Invalid Date");
    }
    day = constrain(day, 8, 30);
  }
  return {
    year,
    month,
    day: day ?? 1,
  };
}

function isTemporalDateLike(
  date: DateLike
): date is
  | Temporal.PlainDate
  | Temporal.PlainYearMonth
  | Temporal.PlainMonthDay {
  return (
    date instanceof Temporal.PlainDate ||
    date instanceof Temporal.PlainYearMonth ||
    date instanceof Temporal.PlainMonthDay
  );
}
