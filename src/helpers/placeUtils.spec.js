const { groupDaysWithSameOpeningHours } = require("./placeUtils");

describe("placeUtils", () => {
  describe("groupDaysWithSameOpeningHours()", () => {
    it("groups days with the same opening hours together", () => {
      const ungroupedDays = {
        monday: [],
        tuesday: [
          { start: "11:30", end: "15:00", type: "OPEN" },
          {
            start: "18:30",
            end: "00:00",
            type: "OPEN",
          },
        ],
        wednesday: [
          { start: "11:30", end: "15:00", type: "OPEN" },
          {
            start: "18:30",
            end: "00:00",
            type: "OPEN",
          },
        ],
        thursday: [
          { start: "11:30", end: "15:00", type: "OPEN" },
          {
            start: "18:30",
            end: "00:00",
            type: "OPEN",
          },
        ],
        friday: [{ start: "18:00", end: "00:00", type: "OPEN" }],
      };

      const expected = {
        monday: [],
        "tuesday - thursday": [
          { start: "11:30", end: "15:00", type: "OPEN" },
          {
            start: "18:30",
            end: "00:00",
            type: "OPEN",
          },
        ],
        friday: [{ start: "18:00", end: "00:00", type: "OPEN" }],
      };

      const actual = groupDaysWithSameOpeningHours(ungroupedDays);

      expect(actual).toEqual(expected);
    });
  });
});
