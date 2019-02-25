/* global describe it */
var assert = require('assert')
var util = require('../src/validation')

describe('Validation Tests', function () {
  describe('isDateValid', function () {
    // Valid date string
    it('Should return true for a valid date string', function () {
      assert.strictEqual(util.isDateValid('2018-01-01'), true)
    })
    // Invalid date string
    it('Should return false for an invalid date string', function () {
      assert.strictEqual(util.isDateValid('20180-01-01'), false)
    })
    // empty string
    it('Should return false for an empty string', function () {
      assert.strictEqual(util.isDateValid(''), false)
    })
    // Undefined
    it('Should return false for an undefined input', function () {
      assert.strictEqual(util.isDateValid(undefined), false)
    })
    // non string
    it('Should return false for an undefined input', function () {
      assert.strictEqual(util.isDateValid({}), false)
    })
    // No month
    it('Should return false for 00 month', function () {
      assert.strictEqual(util.isDateValid('2018-00-01'), false)
    })
    // No day
    it('Should return false for 00 day', function () {
      assert.strictEqual(util.isDateValid('2018-01-00'), false)
    })
  })

  describe('isDateRangeValid', function () {
    it('Should return false when both inputs are undefined', function () {
      assert.strictEqual(util.isDateRangeValid(undefined, undefined), false)
    })
    it('Should return false when start is undefined', function () {
      assert.strictEqual(util.isDateRangeValid(undefined, '2018-01-01'), false)
    })
    it('Should return false when end is undefined', function () {
      assert.strictEqual(util.isDateRangeValid('2018-01-01', undefined), false)
    })
    it('Should return false when end is before start', function () {
      assert.strictEqual(util.isDateRangeValid('2018-01-03', '2018-01-01'), false)
    })
    it('Should return false when range is over 90 days', function () {
      assert.strictEqual(util.isDateRangeValid('2018-01-01', '2018-09-10'), false)
    })
    it('Should return true when date range is 89 days', function () {
      assert.strictEqual(util.isDateRangeValid('2018-01-01', '2018-03-30'), true)
    })
  })
})
