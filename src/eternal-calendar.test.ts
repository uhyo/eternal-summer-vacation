import { eternalSummerVacationCalendar } from "./eternal-calendar";
import { Temporal } from "@js-temporal/polyfill";

const calendar = eternalSummerVacationCalendar;

describe("PlainDate withCalendar", () => {
  it("2021-01-01", () => {
    const date = Temporal.PlainDate.from("2021-01-01").withCalendar(calendar);
    expect(date.year).toBe(2021);
    expect(date.month).toBe(1);
    expect(date.day).toBe(1);
  });
  it("2021-09-01", () => {
    const date = Temporal.PlainDate.from("2021-09-01").withCalendar(calendar);
    expect(date.year).toBe(2021);
    expect(date.month).toBe(8);
    expect(date.day).toBe(32);
  });
  it("2021-11-07", () => {
    const date = Temporal.PlainDate.from("2021-11-07").withCalendar(calendar);
    expect(date.year).toBe(2021);
    expect(date.month).toBe(8);
    expect(date.day).toBe(99);
  });
  it("2021-11-08", () => {
    const date = Temporal.PlainDate.from("2021-11-08").withCalendar(calendar);
    expect(date.year).toBe(2021);
    expect(date.month).toBe(8);
    expect(date.day).toBe(100);
  });
  it("2021-12-31", () => {
    const date = Temporal.PlainDate.from("2021-12-31").withCalendar(calendar);
    expect(date.year).toBe(2021);
    expect(date.month).toBe(8);
    expect(date.day).toBe(153);
  });
  it("2020-02-29", () => {
    const date = Temporal.PlainDate.from("2020-02-29").withCalendar(calendar);
    expect(date.year).toBe(2020);
    expect(date.month).toBe(2);
    expect(date.day).toBe(29);
  });
});

describe("PlainYearMonth withCalendar", () => {
  it("2021-01", () => {
    const yearMonth = Temporal.PlainYearMonth.from({
      year: 2021,
      month: 1,
      calendar,
    });
    expect(yearMonth.year).toBe(2021);
    expect(yearMonth.month).toBe(1);
  });
  it("2021-08", () => {
    const yearMonth = Temporal.PlainYearMonth.from({
      year: 2021,
      month: 8,
      calendar,
    });
    expect(yearMonth.year).toBe(2021);
    expect(yearMonth.month).toBe(8);
  });
  it("error: 2021-09", () => {
    expect(() => {
      Temporal.PlainYearMonth.from({
        year: 2021,
        month: 9,
        calendar,
      });
    }).toThrow("Invalid Date");
  });
  it("error: 2021-10", () => {
    expect(() => {
      Temporal.PlainYearMonth.from({
        year: 2021,
        month: 10,
        calendar,
      });
    }).toThrow("Invalid Date");
  });
  it("error: 2021-11", () => {
    expect(() => {
      Temporal.PlainYearMonth.from({
        year: 2021,
        month: 11,
        calendar,
      });
    }).toThrow("Invalid Date");
  });
  it("error: 2021-12", () => {
    expect(() => {
      Temporal.PlainYearMonth.from({
        year: 2021,
        month: 12,
        calendar,
      });
    }).toThrow("Invalid Date");
  });
});

describe("dateFromFields", () => {
  it("2021-01-01", () => {
    expect(
      calendar
        .dateFromFields(
          {
            year: 2021,
            month: 1,
            day: 1,
          },
          { overflow: "constrain" }
        )
        .toJSON()
    ).toEqual("2021-01-01");
  });
  it("2021-08-32", () => {
    expect(
      calendar
        .dateFromFields(
          {
            year: 2021,
            month: 8,
            day: 32,
          },
          { overflow: "constrain" }
        )
        .toJSON()
    ).toEqual("2021-09-01");
  });
  it("2021-08-99", () => {
    expect(
      calendar
        .dateFromFields(
          {
            year: 2021,
            month: 8,
            day: 99,
          },
          { overflow: "constrain" }
        )
        .toJSON()
    ).toEqual("2021-11-07");
  });
  it("2021-08-100", () => {
    expect(
      calendar
        .dateFromFields(
          {
            year: 2021,
            month: 8,
            day: 100,
          },
          { overflow: "constrain" }
        )
        .toJSON()
    ).toEqual("2021-11-08");
  });
  it("2021-08-153", () => {
    expect(
      calendar
        .dateFromFields(
          {
            year: 2021,
            month: 8,
            day: 153,
          },
          { overflow: "constrain" }
        )
        .toJSON()
    ).toEqual("2021-12-31");
  });
  it("2020-02-29", () => {
    expect(
      calendar
        .dateFromFields(
          {
            year: 2020,
            month: 2,
            day: 29,
          },
          { overflow: "constrain" }
        )
        .toJSON()
    ).toEqual("2020-02-29");
  });
  it("error: 2021-09-01", () => {
    expect(() =>
      calendar.dateFromFields(
        {
          year: 2021,
          month: 9,
          day: 1,
        },
        { overflow: "constrain" }
      )
    ).toThrowError("Invalid Date");
  });
  it("error: 2021-11-06", () => {
    expect(() =>
      calendar.dateFromFields(
        {
          year: 2021,
          month: 11,
          day: 6,
        },
        { overflow: "reject" }
      )
    ).toThrowError("Invalid Date");
  });
  it("error: 2021-08-154", () => {
    expect(() =>
      calendar.dateFromFields(
        {
          year: 2021,
          month: 8,
          day: 154,
        },
        { overflow: "reject" }
      )
    ).toThrowError("Invalid Date");
  });
});

describe("arithmetic", () => {
  describe("add: days", () => {
    it("Next day of 2021-08-31 is 2021-08-32", () => {
      const day = Temporal.PlainDate.from("2021-08-31").withCalendar(calendar);
      const tomorrow = day.add({ days: 1 });
      expect(tomorrow.month).toBe(8);
      expect(tomorrow.day).toBe(32);
    });
    it("Next day of 2021-08-99 is 2021-08-100", () => {
      const day = calendar.dateFromFields(
        {
          year: 2021,
          month: 8,
          day: 99,
        },
        { overflow: "reject" }
      );
      const tomorrow = day.add({ days: 1 });
      expect(tomorrow.month).toBe(8);
      expect(tomorrow.day).toBe(100);
    });
    it("Next day of 2021-08-153 is 2022-01-01", () => {
      const day = calendar.dateFromFields(
        {
          year: 2021,
          month: 8,
          day: 153,
        },
        { overflow: "reject" }
      );
      const tomorrow = day.add({ days: 1 });
      expect(tomorrow.year).toBe(2022);
      expect(tomorrow.month).toBe(1);
      expect(tomorrow.day).toBe(1);
    });
  });
  describe("add: months", () => {
    it("2021-01 + 1 month", () => {
      const month = new Temporal.PlainYearMonth(2021, 1, calendar);
      const result = month.add({ months: 1 });
      expect(result.year).toBe(2021);
      expect(result.month).toBe(2);
    });
    it("2021-07 + 1 month", () => {
      const month = new Temporal.PlainYearMonth(2021, 7, calendar);
      const result = month.add({ months: 1 });
      expect(result.year).toBe(2021);
      expect(result.month).toBe(8);
    });
    it("2021-08 + 1 month", () => {
      const month = new Temporal.PlainYearMonth(2021, 8, calendar);
      const result = month.add({ months: 1 });
      expect(result.year).toBe(2022);
      expect(result.month).toBe(1);
    });
    it("2021-01 - 1 month", () => {
      const month = new Temporal.PlainYearMonth(2021, 1, calendar);
      const result = month.subtract({ months: 1 });
      expect(result.year).toBe(2020);
      expect(result.month).toBe(8);
    });
    it("2021-03-05 + 5 month", () => {
      const month = new Temporal.PlainDate(2021, 3, 5, calendar);
      const result = month.add({ months: 5 });
      expect(result.year).toBe(2021);
      expect(result.month).toBe(8);
      expect(result.day).toBe(5);
    });
    it("2021-03-05 + 15 month", () => {
      const month = new Temporal.PlainDate(2021, 3, 5, calendar);
      const result = month.add({ months: 15 });
      expect(result.year).toBe(2023);
      expect(result.month).toBe(2);
      expect(result.day).toBe(5);
    });
    it("2021-08-99 + 1 month", () => {
      const month = calendar.dateFromFields(
        {
          year: 2021,
          month: 8,
          day: 99,
        },
        { overflow: "reject" }
      );
      const result = month.add({ months: 1 });
      expect(result.year).toBe(2022);
      expect(result.month).toBe(1);
      expect(result.day).toBe(31);
    });
  });
  it("until", () => {
    const day1 = calendar.dateFromFields(
      {
        year: 2021,
        month: 8,
        day: 1,
      },
      { overflow: "reject" }
    );
    const day2 = calendar.dateFromFields(
      {
        year: 2021,
        month: 8,
        day: 60,
      },
      { overflow: "reject" }
    );
    expect(day1.until(day2).toJSON()).toBe("P59D");
  });
});

describe("calendar properties", () => {
  it("dayOfWeek", () => {
    const day = calendar.dateFromFields(
      {
        year: 2021,
        month: 8,
        day: 60,
      },
      { overflow: "reject" }
    );
    expect(day.dayOfWeek).toBe(3);
  });
  it("dayOfYear", () => {
    const day = calendar.dateFromFields(
      {
        year: 2021,
        month: 8,
        day: 60,
      },
      { overflow: "reject" }
    );
    expect(day.dayOfYear).toBe(272);
  });
  it("weekOfYear", () => {
    const day = calendar.dateFromFields(
      {
        year: 2021,
        month: 8,
        day: 60,
      },
      { overflow: "reject" }
    );
    expect(day.weekOfYear).toBe(39);
  });
  it("daysInWeek", () => {
    const day = calendar.dateFromFields(
      {
        year: 2021,
        month: 8,
        day: 60,
      },
      { overflow: "reject" }
    );
    expect(day.daysInWeek).toBe(7);
  });
  describe("daysInMonth", () => {
    it("July", () => {
      const july = calendar.dateFromFields(
        {
          year: 2021,
          month: 7,
          day: 1,
        },
        { overflow: "reject" }
      );
      expect(july.daysInMonth).toBe(31);
    });
    it("August", () => {
      const august = calendar.dateFromFields(
        {
          year: 2021,
          month: 8,
          day: 1,
        },
        { overflow: "reject" }
      );
      console.log(august.calendar);
      expect(august.daysInMonth).toBe(153);
    });
  });
});
