const formatDuration = duration => {
  // https://github.com/moment/luxon/issues/328
  const { years, months, days } = duration.shiftTo('years', 'months', 'days')

  let text = ''

  if (years > 0) text += `${years}年`
  if (months > 0) text += `${months}ヶ月`
  if (days > 0) text += `${days}日`

  return text
}

module.exports = formatDuration
