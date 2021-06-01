const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

let FUNDCODE = '';

if (process.argv.length > 2) {
  FUNDCODE = process.argv[2].trim();
} else {
  throw new Error('FUNDCODE is not defined')
}

fetch('https://codequiz.azurewebsites.net/', {
  headers: {
    cookie: 'hasCookie=true'
  }
})
.then((res) => res.text())
.then((text) => {
  const { window } = new JSDOM(text.replace());
  const rows = window.document.getElementsByTagName('tr')
  let indexOfNav = -1;
  let indexOfFundName = -1;
  for (let i = 0; i < rows[0].children.length; i++) {
    const cell = rows[0].children.item(i);
    const textContent = cell.textContent.trim();
    if (textContent === 'Fund Name') {
      indexOfFundName = i;
    } else if (textContent === 'Nav') {
      indexOfNav = i;
    }
  }
  if (indexOfNav === -1 || indexOfFundName === -1) {
    throw new Error('Column "Fund Name" or "Nav" not found')
  }
  for (let i = 1; i < rows.length; i++) {
    const row = rows.item(i);
    if (row.children.item(indexOfFundName).textContent.trim() === FUNDCODE) {
      return row.children.item(indexOfNav).textContent.trim()
    }
  }
})
.then((nav) => {
  if (nav) {
    console.log(nav)
  } else {
    console.log(`${FUNDCODE} not found`)
  }
})
.catch(console.error)
.finally(() => {
  process.exit();
})
