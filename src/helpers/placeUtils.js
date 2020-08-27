const _isEqual = require("lodash.isequal");

function groupDaysWithSameOpeningHours(days) {
  const dayNameOpeningHourPairs = Object.entries(days);
  const groupedDaysAndOpeningHours = {};

  for (let i = 0; i < dayNameOpeningHourPairs.length; i++) {
    let [thisDayName, thisOpeningHours] = dayNameOpeningHourPairs[i];

    const startingIndex = i + 1; // we want to search the rest of the array, so calculate the point to start the search
    const lastDayWithSameOpeningHours = getTheLastConsecutiveDayWithTheSameOpeningHours(
      thisOpeningHours,
      dayNameOpeningHourPairs,
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
  dayNameOpeningHourPairs,
  startingIndex
) {
  if (!dayNameOpeningHourPairs || dayNameOpeningHourPairs.length === 0) {
    return null;
  }

  let lastConsecutiveDayWithTheSameOpeningHours = null;

  for (let i = startingIndex; i < dayNameOpeningHourPairs.length; i++) {
    const [thisDayName, thisOpeningHours] = dayNameOpeningHourPairs[i];

    if (_isEqual(openingHoursToCompareAgainst, thisOpeningHours)) {
      lastConsecutiveDayWithTheSameOpeningHours = {
        dayName: thisDayName,
        index: i,
      };
    } else {
      break; // we're looking for consecutive days, if opening hours aren't the same then abort now
    }
  }

  return lastConsecutiveDayWithTheSameOpeningHours;
}

module.exports = {
  groupDaysWithSameOpeningHours,
};
