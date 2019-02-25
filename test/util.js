/* global describe it */
var assert = require('assert')
var util = require('../src/util')

describe('Util Tests', function () {
  describe('getDateRange', function () {
    // Date objects
    const resultsByObjects = util.getDateRange(new Date('2018-01-01'), new Date('2018-01-02'))
    it('Should return date range for object inputs', function () {
      assert.strictEqual(resultsByObjects[0], '2018-01-01')
      assert.strictEqual(resultsByObjects[1], '2018-01-02')
    })
    // Date strings
    const resultsByStrings = util.getDateRange('2018-01-01', '2018-01-02')
    it('Should return date range for string inputs', function () {
      assert.strictEqual(resultsByStrings[0], '2018-01-01')
      assert.strictEqual(resultsByStrings[1], '2018-01-02')
    })
    // Same start and date dates
    const resultsSameDate = util.getDateRange('2018-01-01', '2018-01-02')
    it('Should return one date if start and end are the same', function () {
      assert.strictEqual(resultsSameDate[0], '2018-01-01')
    })

    // Start object, end string
    const resultsByEndStringAndStartObject = util.getDateRange(new Date('2018-01-01'), '2018-01-02')
    it('Should return date range for end string and start object inputs', function () {
      assert.strictEqual(resultsByEndStringAndStartObject[0], '2018-01-01')
      assert.strictEqual(resultsByEndStringAndStartObject[1], '2018-01-02')
    })

    // Start string, end object
    const resultsByStartStringAndObjectEnd = util.getDateRange('2018-01-01', new Date('2018-01-02'))
    it('Should return date range for start string and end object inputs', function () {
      assert.strictEqual(resultsByStartStringAndObjectEnd[0], '2018-01-01')
      assert.strictEqual(resultsByStartStringAndObjectEnd[1], '2018-01-02')
    })

    // Start date is after end
    it('Should throw an exception if start is later then end date', function () {
      assert.throws(() => util.getDateRange('2018-01-02', '2018-01-01'), Error)
    })
    // Unexpected start date type sent
    it('Should throw an exception if start is not a date string', function () {
      assert.throws(() => util.getDateRange({}, '2018-01-01'), Error)
    })

    // Unexpected end date type sent
    it('Should throw an exception if start is not a date string', function () {
      assert.throws(() => util.getDateRange('2018-01-01', {}), Error)
    })

    // Unexpected start and end date typed sent
    it('Should throw an exception if start is not a date string', function () {
      assert.throws(() => util.getDateRange({}, {}), Error)
    })
  })

  describe('getDatesByWeekStarting', function () {
    // Date objects
    const resultsByObject = util.getDatesByWeekStarting(new Date('2018-01-01'))
    it('Should return week range for object start date', function () {
      assert.strictEqual(resultsByObject[0], '2018-01-01')
      assert.strictEqual(resultsByObject[6], '2018-01-07')
    })
    // Date strings
    const resultsByString = util.getDatesByWeekStarting('2018-01-01')
    it('Should return week range for string start date', function () {
      assert.strictEqual(resultsByString[0], '2018-01-01')
      assert.strictEqual(resultsByString[6], '2018-01-07')
    })

    // Unexpected date type sent
    it('Should throw an exception if unexpected type sent', function () {
      assert.throws(() => util.getDatesByWeekStarting({}), Error)
    })
  })

  describe('getDatesByWeekEnding', function () {
    // Date objects
    const resultsByObject = util.getDatesByWeekEnding(new Date('2018-01-07'))
    it('Should return week range for object end date', function () {
      assert.strictEqual(resultsByObject[0], '2018-01-01')
      assert.strictEqual(resultsByObject[6], '2018-01-07')
    })
    // Date strings
    const resultsByString = util.getDatesByWeekEnding('2018-01-07')
    it('Should return week range for string end date', function () {
      assert.strictEqual(resultsByString[0], '2018-01-01')
      assert.strictEqual(resultsByString[6], '2018-01-07')
    })

    // Unexpected date type sent
    it('Should throw an exception if unexpected type sent', function () {
      assert.throws(() => util.getDatesByWeekEnding({}), Error)
    })
  })

  describe('getDatesByOffest', function () {
    // Date objects
    const resultsByObjectReverseOffset = util.getDateRangeByOffset(new Date('2018-01-07'), -6)
    it('Should return week range for object end date', function () {
      assert.strictEqual(resultsByObjectReverseOffset[0], '2018-01-01')
      assert.strictEqual(resultsByObjectReverseOffset[6], '2018-01-07')
    })

    // Date strings
    const resultsByStringReverseOffset = util.getDateRangeByOffset('2018-01-07', -6)
    it('Should return week range for string end date', function () {
      assert.strictEqual(resultsByStringReverseOffset[0], '2018-01-01')
      assert.strictEqual(resultsByStringReverseOffset[6], '2018-01-07')
    })

    // Date objects
    const resultsByObjectForwardOffset = util.getDateRangeByOffset(new Date('2018-01-01'), 6)
    it('Should return week range for object start date date', function () {
      assert.strictEqual(resultsByObjectForwardOffset[0], '2018-01-01')
      assert.strictEqual(resultsByObjectForwardOffset[6], '2018-01-07')
    })

    // Date strings
    const resultsByStringsForwardOffset = util.getDateRangeByOffset('2018-01-01', 6)
    it('Should return week range for string start date', function () {
      assert.strictEqual(resultsByStringsForwardOffset[0], '2018-01-01')
      assert.strictEqual(resultsByStringsForwardOffset[6], '2018-01-07')
    })

    // negative numeric string offset
    const resultsByStringsReverseStringOffset = util.getDateRangeByOffset('2018-01-07', '-6.9')
    it('Should return week range for string start date and a negative string offset', function () {
      assert.strictEqual(resultsByStringsReverseStringOffset[0], '2018-01-01')
      assert.strictEqual(resultsByStringsReverseStringOffset[6], '2018-01-07')
    })

    // positive numeric string offset
    const resultsByStringsForwardStringOffset = util.getDateRangeByOffset('2018-01-01', '6.9')
    it('Should return week range for string start date and a string offset', function () {
      assert.strictEqual(resultsByStringsForwardStringOffset[0], '2018-01-01')
      assert.strictEqual(resultsByStringsForwardStringOffset[6], '2018-01-07')
    })

    // Unexpected date type sent
    it('Should throw an exception if unexpected type sent', function () {
      assert.throws(() => util.getDateRangeByOffset({}, 3), Error)
    })

    // Unexpected offset type sent
    it('Should throw an exception if unexpected offset type sent', function () {
      assert.throws(() => util.getDateRangeByOffset('2018-01-01', {}), Error)
    })
  })

  describe('getDatesInMonthByYear', function () {
    // Numeric year and month
    const resultsByNumeric = util.getDatesInMonthByYear(2018, 12)
    it('Should return month range for numeric month and year', function () {
      assert.strictEqual(resultsByNumeric[0], '2018-12-01')
      assert.strictEqual(resultsByNumeric[30], '2018-12-31')
    })

    // String year and month
    const resultsByString = util.getDatesInMonthByYear('2018', '12')
    it('Should return month range for string month and year', function () {
      assert.strictEqual(resultsByString[0], '2018-12-01')
      assert.strictEqual(resultsByString[30], '2018-12-31')
    })

    // Unexpected year type sent
    it('Should throw an exception if unexpected year type sent', function () {
      assert.throws(() => util.getDatesInMonthByYear({}, 12), Error)
    })

    // Unexpected month type sent
    it('Should throw an exception if unexpected month type sent', function () {
      assert.throws(() => util.getDatesInMonthByYear(2018, {}), Error)
    })

    // Invalid numeric year value sent
    it('Should throw an exception if invalid numeric year sent', function () {
      assert.throws(() => util.getDatesInMonthByYear(-2018, 12), Error)
    })

    // Invalid numeric month value sent
    it('Should throw an exception if invalud numeric month sent', function () {
      assert.throws(() => util.getDatesInMonthByYear(2018, 0), Error)
    })
  })

  describe('getLastDayOfMonthInYear', function () {
    // Numeric year and month
    const resultByNumeric = util.getLastDayOfMonthInYear(2020, 2)
    it('Should return last day of month for numeric month and year', function () {
      assert.strictEqual(resultByNumeric, '2020-02-29')
    })

    // String year and month
    const resultByString = util.getLastDayOfMonthInYear('2020', '02')
    it('Should return last day of month for string month and year', function () {
      assert.strictEqual(resultByString, '2020-02-29')
    })

    // Unexpected year type sent
    it('Should throw an exception if unexpected year type sent', function () {
      assert.throws(() => util.getLastDayOfMonthInYear({}, 12), Error)
    })

    // Unexpected month type sent
    it('Should throw an exception if unexpected month type sent', function () {
      assert.throws(() => util.getLastDayOfMonthInYear(2018, {}), Error)
    })

    // Invalid numeric year value sent
    it('Should throw an exception if invalid numeric year sent', function () {
      assert.throws(() => util.getLastDayOfMonthInYear(-2018, 12), Error)
    })

    // Invalid numeric month value sent
    it('Should throw an exception if invalud numeric month sent', function () {
      assert.throws(() => util.getLastDayOfMonthInYear(2018, 0), Error)
    })
  })
})
