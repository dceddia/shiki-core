const { getHighlighter } = require('shiki')
const fs = require('fs')

const t = () => Date.now()
const printTime = (desc, t0, t1) => console.log((t1 - t0).toString().padStart(5, ' '), 'ms', desc)

;(async function run() {
  console.log('Starting benchmark...')

  const data = fs.readFileSync('big-example.js', 'utf8')
  const t0 = t()

  const highlighter = await getHighlighter({
    theme: 'nord'
  })

  const t1 = t()

  for(let i = 0; i < 10; i++) {
    const out = highlighter.codeToHtml(data, 'js')
  }

  const t2 = t()

  printTime('getHighlighter', t0, t1)
  printTime('codeToHtml', t1, t2)
  printTime('total', t0, t2)
})()
