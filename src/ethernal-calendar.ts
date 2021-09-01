import { Temporal } from "@js-temporal/polyfill";
export const ethernalSummerVacationCalendar = Temporal.Calendar.from({
  id: "ethernal-summer-vacation",
  year(date) {
    return iso8601Date(date).year;
  },
  month(date) {
    return ethernalDate(date)[0];
  },
  day(date) {
    return ethernalDate(date)[1];
  },
  monthCode(date) {
    const [month, , isoDate] = ethernalDate(date);
    return Temporal.PlainYearMonth.from({ year: isoDate.year, month })
      .monthCode;
  },
  era(date) {
    return iso8601Date(date).era;
  },
  eraYear(date) {
    return iso8601Date(date).eraYear;
  },
  dateFromFields(fields, options) {
    return dateFromFields(fields, options);
  },
  yearMonthFromFields(fields, options) {
    return dateFromFields({ ...fields, day: 1 }, options).toPlainYearMonth();
  },
  monthDayFromFields(fields, options) {
    return dateFromFields({ ...fields, day: 1 }, options).toPlainMonthDay();
  },
});

type DateLike =
  | Temporal.PlainDate
  | Temporal.PlainDateTime
  | Temporal.PlainYearMonth
  | Temporal.DateLike
  | string;

function iso8601Date(
  date: DateLike,
  options?: Temporal.AssignmentOptions
): Temporal.PlainDate {
  return Temporal.PlainDate.from(date, options).withCalendar("iso8601");
}

function ethernalDate(
  date: DateLike
): [month: number, day: number, isoDate: Temporal.PlainDate] {
  const isoDate = iso8601Date(date);
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
function dateFromFields(
  fields: {
    year: number | undefined;
    month: number | undefined;
    monthCode: string | undefined;
    day: number | undefined;
  },
  options: Temporal.AssignmentOptions
) {
  const { year = 0, month = 1 } = fields;
  if (month < 8 || month === 12) {
    return Temporal.PlainDate.from(
      { year, month, day: fields.day ?? 1 },
      options
    );
  }
  if (month === 8) {
    const day = fields.day ?? 1;
    if ((day < 1 || 99 < day) && options.overflow === "reject") {
      throw new RangeError("Invalid Date");
    }
    const constrainedDay = constrain(day, 1, 99);
    return Temporal.PlainDate.from({ year, month: 8, day: 1 }).add({
      days: constrainedDay - 1,
    });
  }
  // 08-99 in ethernal calendar corresponds to 11-07 in ISO calendar
  if (month === 9 || month === 10) {
    throw new RangeError("Invalid Date");
  }
  if (month === 11) {
    let day = fields.day ?? 7;
    if ((day < 8 || 30 < day) && options.overflow === "reject") {
      throw new RangeError("Invalid Date");
    }
    day = constrain(day, 8, 30);
    return Temporal.PlainDate.from({ year, month, day }, options);
  }
  throw new RangeError("Invalid Date");
}
