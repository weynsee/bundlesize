const bytes = require('bytes')
const { error, info } = require('prettycli')

const reporter = files => {
  let fail = false

  files.map(file => {
    const prettySize = bytes(file.size)
    const prettyThreshold = bytes(bytes(file.threshold))

    if (file.size <= bytes(file.threshold)) {
      info(
        `PASS`,
        `${file.path}: ${prettySize} <= threshold ${prettyThreshold}`
      )
    } else {
      fail = true
      error(`${file.path}: ${prettySize} > threshold ${prettyThreshold}`, {
        fail: false
      })
    }
  })

  if (fail) process.exit(1)
}

module.exports = reporter
