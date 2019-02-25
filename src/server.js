'use strict'
const https = require('https')
const http = require('http')
const fs = require('fs')
const express = require('express')
const app = require('./index')

app.use(express.static('./public'))

if (process.env.DATE_API_CRT === undefined || process.env.DATE_API_KEY === undefined) {
  // Use HTTP becuase both Cert and Key were not supplied,
  const server = http.createServer(app)
  server.listen(process.env.DATE_API_PORT || 80, function () {})
} else {
  // Cert and Key supplied, use HTTPS
  const server = https.createServer({
    cert: fs.readFileSync(process.env.DATE_API_CRT),
    key: fs.readFileSync(process.env.DATE_API_KEY)
  }, app)
  server.listen(process.env.DATE_API_PORT || 443, function () {})
}
