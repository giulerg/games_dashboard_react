export function parseCsv(text) {
  const rows = []
  let field = ''
  let row = []
  let quoted = false

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    const next = text[i + 1]

    if (char === '"' && quoted && next === '"') {
      field += '"'
      i += 1
    } else if (char === '"') {
      quoted = !quoted
    } else if (char === ',' && !quoted) {
      row.push(field)
      field = ''
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') i += 1
      row.push(field)
      if (row.some(Boolean)) rows.push(row)
      row = []
      field = ''
    } else {
      field += char
    }
  }

  row.push(field)
  if (row.some(Boolean)) rows.push(row)

  const [headers = [], ...data] = rows

  return data.map((values) =>
    headers.reduce((item, header, index) => {
      item[header] = values[index] ?? ''
      return item
    }, {}),
  )
}

export function average(values) {
  const validValues = values.filter((value) => Number.isFinite(value))
  if (!validValues.length) return 0

  return validValues.reduce((sum, value) => sum + value, 0) / validValues.length
}
