const formatDuration = duration => {
  const { years, months, days } = duration

  let text = ''

  if (years > 0) text += `${years}年`
  if (months > 0) text += `${months}ヵ月`
  if (days > 0) text += `${days}日`

  return text
}

module.exports = formatDuration
