const express = require('express')
const compression = require('compression')
var cors = require('cors')
var util = require('./util')

const app = express()

app.disable('x-powered-by')
app.use(compression({ level: 9 }))
app.use(cors())
app.use(express.urlencoded({ extended: true }))

/**
 * Get date range using a start and end date
 *
 * Both start and end dates must be supplied, valid and be a valid range.
 */
app.get('/range', function (req, res, next) {
  try {
    res.json(util.getDateRange(req.query.start, req.query.end))
  } catch (error) {
    res.statusMessage = 'Invalid date range'
    res.status(400).end()
  }
})

/**
 * Get date range using a date and an offset
 *
 * Positive integer offset gives a forward range, negative integer offset is a reverse range
 */
app.get('/range/offset', function (req, res, next) {
  try {
    res.json(util.getDateRangeByOffset(req.query.date, req.query.offset))
  } catch (error) {
    res.statusMessage = 'Invalid date or offset'
    res.status(400).end()
  }
})

/**
 * Get dates in a week by start date
 */
app.get('/weekStarting', function (req, res, next) {
  try {
    res.json(util.getDatesByWeekStarting(req.query.date))
  } catch (error) {
    res.statusMessage = 'Invalid date'
    res.status(400).end()
  }
})

/**
 * Get dates in a week by end date
 */
app.get('/weekEnding', function (req, res, next) {
  try {
    res.json(util.getDatesByWeekEnding(req.query.date))
  } catch (error) {
    res.statusMessage = 'Invalid date'
    res.status(400).end()
  }
})

/**
 * Get dates for a particular month in a year
 */
app.get('/inMonth', function (req, res, next) {
  try {
    res.json(util.getDatesInMonthByYear(req.query.year, req.query.month))
  } catch (error) {
    res.statusMessage = 'Invalid year or month'
    res.status(400).end()
  }
})

// Default error handler
app.use(function (err, req, res, next) {
  console.error(err)
  res.status(500).end()
})

module.exports = app
