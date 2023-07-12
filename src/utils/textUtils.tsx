export const splitText = (text: React.ReactNode) => {
  if (typeof text !== 'string') {
    return text
  }

  const replacedText = text.replace(/\\n/g, '\n')
  const parsedText = replacedText
    .split(/\n/)
    .map((splittedText, index) => <div key={index}>{splittedText ? splittedText : <br />}</div>)

  return parsedText
}
