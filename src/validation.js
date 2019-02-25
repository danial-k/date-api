exports.constants = {
  'validRangeDays': 89
}

/**
 * Check whether a supplied date string is valid
 * A valid date is the full-date notation as defined by RFC 3339, section 5.6,
 * Example 2017-07-21
 *
 * @param {String} dateString
 * @return {Boolean}
 */
exports.isDateValid = function (dateString) {
  // Check for undefined input
  if (dateString === undefined || typeof (dateString) !== 'string') {
    return false
  }
  // Check for valid date using regex
  var matches = dateString.match(/^\d{4}-\d{2}-\d{2}$/)
  if (matches === null) {
    return false
  }
  // Check for numeric but invalid dates
  var dateTest = new Date(dateString)
  if (isNaN(dateTest.getDate())) {
    return false
  }

  return matches !== null
}

/**
 * Check whether a supplied date range is valid
 * A valid date is the full-date notation as defined by RFC 3339, section 5.6,
 * Example 2017-07-21
 *
 * @param {String} startDateString
 * @param {String} endDateString
 * @return {Boolean}
 */
exports.isDateRangeValid = function (startDateString, endDateString) {
  // Check noth dates for validity
  if (!exports.isDateValid(startDateString) || !exports.isDateValid(endDateString)) {
    return false
  }
  // Ensure date range is within expected range
  var startDate = new Date(startDateString)
  var endDate = new Date(endDateString)
  var maxEndDate = new Date(startDateString)
  maxEndDate.setDate(startDate.getDate() + exports.constants.validRangeDays)
  if (startDate > endDate || endDate > maxEndDate) {
    return false
  }
  return true
}

/**
 * Check whether a supplied year is valid
 *
 * @param {String} year
 * @return {Boolean}
 */
exports.isYearValid = function (year) {
  // Check validity of year
  var yearInt = parseInt(year)
  if (isNaN(yearInt) || yearInt < 1) {
    return false
  }
  return true
}

/**
 * Check whether a supplied month is valid
 *
 * @param {String} month
 * @return {Boolean}
 */
exports.isMonthValid = function (month) {
  var monthInt = parseInt(month)
  if (isNaN(monthInt) || monthInt < 1 || monthInt > 12) {
    return false
  }
  return true
}
