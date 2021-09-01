import { ethernalSummerVacationCalendar } from "./ethernal-calendar";
import { Temporal } from "@js-temporal/polyfill";

const calendar = ethernalSummerVacationCalendar;

describe("withCalendar", () => {
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
    expect(date.month).toBe(11);
    expect(date.day).toBe(8);
  });
  it("2021-12-31", () => {
    const date = Temporal.PlainDate.from("2021-12-31").withCalendar(calendar);
    expect(date.year).toBe(2021);
    expect(date.month).toBe(12);
    expect(date.day).toBe(31);
  });
  it("2020-02-29", () => {
    const date = Temporal.PlainDate.from("2020-02-29").withCalendar(calendar);
    expect(date.year).toBe(2020);
    expect(date.month).toBe(2);
    expect(date.day).toBe(29);
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
            monthCode: undefined,
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
            monthCode: undefined,
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
            monthCode: undefined,
            day: 99,
          },
          { overflow: "constrain" }
        )
        .toJSON()
    ).toEqual("2021-11-07");
  });
  it("2021-11-08", () => {
    expect(
      calendar
        .dateFromFields(
          {
            year: 2021,
            month: 11,
            monthCode: undefined,
            day: 8,
          },
          { overflow: "constrain" }
        )
        .toJSON()
    ).toEqual("2021-11-08");
  });
  it("2021-12-31", () => {
    expect(
      calendar
        .dateFromFields(
          {
            year: 2021,
            month: 12,
            monthCode: undefined,
            day: 31,
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
            monthCode: undefined,
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
          monthCode: undefined,
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
          monthCode: undefined,
          day: 6,
        },
        { overflow: "constrain" }
      )
    ).toThrowError("Invalid Date");
  });
});
