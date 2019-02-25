var validation = require('./validation')

/**
 * Gets array of days between two dates
 * @param {String|Date} startInput
 * @param {String|Date} endInput
 * @return {Array}
 */
exports.getDateRange = function (startInput, endInput) {
  // Support both string and date object inputs
  if (typeof (startInput) === 'string' && validation.isDateValid(startInput)) {
    var start = new Date(startInput)
    var startString = startInput
  } else if (startInput instanceof Date) {
    start = startInput
    startString = startInput.toISOString().substr(0, 10)
  } else {
    throw new Error('Start date input error')
  }
  // Support both string
  if (typeof (endInput) === 'string' && validation.isDateValid(endInput)) {
    var end = new Date(endInput)
    var endString = endInput
  } else if (endInput instanceof Date) {
    end = endInput
    endString = endInput.toISOString().substr(0, 10)
  } else {
    throw new Error('End date input error')
  }

  if (!validation.isDateRangeValid(startString, endString)) {
    throw new Error('Date range invalid')
  }

  var output = []
  for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
    output.push(d.toISOString().substr(0, 10))
  }
  return output
}

/**
 * Gets days for a week starting at a specified date
 * @param {String|Date} dateInput
 * @return {Array}
 */
exports.getDatesByWeekStarting = function (dateInput) {
  return exports.getDateRangeByOffset(dateInput, 6)
}

/**
 * Gets days for a week ending at a specified date
 * @param {String|Date} dateInput
 * @return {Array}
 */
exports.getDatesByWeekEnding = function (dateInput) {
  return exports.getDateRangeByOffset(dateInput, -6)
}

/**
 * Gets range of days by date and a forward (+ve)/backward (-ve) offset
 • @param {String|Date} dateInput
 * @param {String|Number} offset integer numer of days +ve = forward, -ve = backwards
 */
exports.getDateRangeByOffset = function (dateInput, offset) {
  var offsetInt = parseInt(offset)
  if (isNaN(offsetInt)) {
    throw new Error('Invalid offset input')
  }

  // parse inputs
  if (typeof (dateInput) === 'string') {
    var start = new Date(dateInput)
    var end = new Date(dateInput)
  } else if (dateInput instanceof Date) {
    start = new Date(dateInput.toISOString().substr(0, 10))
    end = new Date(dateInput.toISOString().substr(0, 10))
  } else {
    throw new Error('Invalid intput date')
  }

  // calculate start/end date based on offset direction
  if (offsetInt < 0) {
    start.setDate(end.getDate() + offsetInt)
  } else {
    end.setDate(start.getDate() + offsetInt)
  }
  // get date range
  return exports.getDateRange(start, end)
}

/**
 * Gets range of days by month and year
 • @param {String|Number} year
 * @param {String|Number} month
 */
exports.getDatesInMonthByYear = function (year, month) {
  // Check validity of year
  if (!validation.isYearValid(year)) {
    throw new Error('Invalid year input')
  }

  // Check validity of month
  if (!validation.isMonthValid(month)) {
    throw new Error('Invalid month input')
  }

  // Calculate start and end for specific month
  var start = new Date(year, month - 1, 1)
  var end = new Date(year, month, 0)
  return exports.getDateRange(start, end)
}

exports.getLastDayOfMonthInYear = function (year, month) {
  // Check validity of year
  if (!validation.isYearValid(year)) {
    throw new Error('Invalid year input')
  }

  // Check validity of month
  if (!validation.isMonthValid(month)) {
    throw new Error('Invalid month input')
  }

  // Calculate last day of month
  var lastDay = new Date(year, month, 0)
  return lastDay.toISOString().substr(0, 10)
}
