import { Temporal } from "@js-temporal/polyfill";
const calendarId = "eternal-summer-vacation";
export const eternalSummerVacationCalendar =
  new (class EternalSummerVacationCalendar extends Temporal.Calendar {
    override id: string = calendarId;
    constructor() {
      super("iso8601");
    }
    override month(date: DateLike) {
      return eternalDate(getPlainDateWithISOCalendar(date))[0];
    }
    override day(date: DateLike) {
      return eternalDate(getPlainDateWithISOCalendar(date))[1];
    }
    override monthCode(date: DateLike) {
      const [month, , isoDate] = eternalDate(getPlainDateWithISOCalendar(date));
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
        eternalSummerVacationCalendar
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
        eternalSummerVacationCalendar
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
        eternalSummerVacationCalendar
      );
    }
    override daysInMonth(date: DateLike) {
      const [m, , isoDate] = eternalDate(getPlainDateWithISOCalendar(date));
      if (m === 8) {
        return AugustDays;
      }
      return super.daysInMonth(isoDate);
    }

    override dateAdd(
      dateLike: string | Temporal.PlainDate | Temporal.DateLike,
      durationLike: string | Temporal.Duration | Temporal.DurationLike,
      options: Temporal.ArithmeticOptions
    ): Temporal.PlainDate {
      const date = getPlainDateWithISOCalendar(dateLike).withCalendar(
        eternalSummerVacationCalendar
      );
      const duration = Temporal.Duration.from(durationLike);

      let newYear = date.year + duration.years;
      let newMonth = date.month + duration.months;
      // -15 -- -8 -> -2
      //  -7 --  0 -> -1
      //   1 --  8 -> 0
      //   9 -- 15 -> +1
      //  16 -- 23 -> +2 ...
      const diffy = Math.floor((newMonth - 1) / 8);
      newYear += diffy;
      newMonth -= diffy * 8;

      let newDay = date.day;
      if (duration.months) {
        // if months changed, we need to check if the day is still valid
        const yearMonth = eternalSummerVacationCalendar.yearMonthFromFields(
          {
            year: newYear,
            month: newMonth,
          },
          { overflow: "reject" }
        );
        if (options.overflow === "reject") {
          if (date.day > yearMonth.daysInMonth) {
            throw new RangeError(
              `${date.day} is not a valid day for ${yearMonth.monthCode}`
            );
          }
        } else {
          if (newDay > yearMonth.daysInMonth) {
            newDay = yearMonth.daysInMonth;
          }
        }
      }

      newDay += duration.days;
      // TODO: this loop may be heavy
      do {
        if (newDay < 1) {
          newMonth--;
          if (newMonth < 1) {
            newYear--;
            newMonth = 8;
          }
          const prevYearMonth =
            eternalSummerVacationCalendar.yearMonthFromFields(
              {
                year: newYear,
                month: newMonth,
              },
              { overflow: "reject" }
            );
          newDay = prevYearMonth.daysInMonth + newDay;
          continue;
        }
        const yearMonth = eternalSummerVacationCalendar.yearMonthFromFields(
          {
            year: newYear,
            month: newMonth,
          },
          { overflow: "reject" }
        );
        if (newDay > yearMonth.daysInMonth) {
          newDay -= yearMonth.daysInMonth;
          newMonth++;
          if (newMonth > 8) {
            newYear++;
            newMonth = 1;
          }
          continue;
        }
        break;
      } while (true);

      return Temporal.PlainDate.from({
        year: newYear,
        month: newMonth,
        day: newDay,
        calendar: eternalSummerVacationCalendar,
      });
    }

    override fields(fields: Iterable<string>) {
      return super.fields(fields);
    }
  })();

const AugustDays = 31 + 30 + 31 + 30 + 31;

type DateLike =
  | Temporal.PlainDate
  | Temporal.PlainDateTime
  | Temporal.PlainYearMonth
  | Temporal.DateLike
  | string;

function eternalDate(
  isoDate: Temporal.PlainDate
): [month: number, day: number, isoDate: Temporal.PlainDate] {
  if (isoDate.month < 8) {
    return [isoDate.month, isoDate.day, isoDate];
  }
  const august1st = isoDate.with({ month: 8, day: 1 });
  const daysFromAugust1st =
    isoDate.since(august1st, { largestUnit: "day" }).days + 1;
  return [8, daysFromAugust1st, isoDate];
}

function getPlainDateWithISOCalendar(date: DateLike) {
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
 * Converts an eternal date to ISO date.
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
    if ((day < 1 || AugustDays < day) && options.overflow === "reject") {
      throw new RangeError("Invalid Date");
    }
    day = constrain(day, 1, AugustDays);
    const august1st = new Temporal.PlainDate(year, 8, 1);
    const targetDate = august1st.add({ days: day - 1 });
    return {
      year: targetDate.year,
      month: targetDate.month,
      day: targetDate.day,
    };
  }
  if (month > 8) {
    throw new RangeError("Invalid Date");
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
