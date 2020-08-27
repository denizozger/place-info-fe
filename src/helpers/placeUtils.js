const _isEqual = require("lodash.isequal");

function groupDaysWithSameOpeningHours(days) {
  const dayNameOpeningHoursPairs = Object.entries(days);
  const groupedDaysAndOpeningHours = {};

  for (let i = 0; i < dayNameOpeningHoursPairs.length; i++) {
    let [thisDayName, thisOpeningHours] = dayNameOpeningHoursPairs[i];

    const startingIndex = i + 1; // we want to search the rest of the array, so calculate the point to start the search
    const lastDayWithSameOpeningHours = getTheLastConsecutiveDayWithTheSameOpeningHours(
      thisOpeningHours,
      dayNameOpeningHoursPairs,
      startingIndex
    );

    if (lastDayWithSameOpeningHours) {
      thisDayName = `${thisDayName} - ${lastDayWithSameOpeningHours.dayName}`;
      i = lastDayWithSameOpeningHours.index;
    }

    groupedDaysAndOpeningHours[thisDayName] = thisOpeningHours;
  }
  return groupedDaysAndOpeningHours;
}

function getTheLastConsecutiveDayWithTheSameOpeningHours(
  openingHoursToCompareAgainst,
  dayNameOpeningHoursPairs,
  startingIndex
) {
  if (!dayNameOpeningHoursPairs || dayNameOpeningHoursPairs.length === 0) {
    return null;
  }

  let lastConsecutiveDayWithTheSameOpeningHours = null;

  for (let i = startingIndex; i < dayNameOpeningHoursPairs.length; i++) {
    const [thisDayName, thisOpeningHours] = dayNameOpeningHoursPairs[i];

    if (_isEqual(openingHoursToCompareAgainst, thisOpeningHours)) {
      lastConsecutiveDayWithTheSameOpeningHours = {
        dayName: thisDayName,
        index: i,
      };
    } else {
      break; // we're looking for consecutive days so if opening hours aren't the same on this day, abort the search
    }
  }

  return lastConsecutiveDayWithTheSameOpeningHours;
}

module.exports = {
  groupDaysWithSameOpeningHours,
};
