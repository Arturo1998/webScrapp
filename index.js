import puppeteer from 'puppeteer'

const medios = [
    {nombre:"El Pais", url: "https://elpais.com/"},
    {nombre:"El Mundo", url:"https://elmundo.es/"}
];

(async () => {
  try {
    
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://elpais.com/')
    const urls = await page.evaluate(() => {
      let items = document.querySelectorAll('a')
      let results = []

      items.forEach((item) => {
        if (item.innerText.includes('Ucrania'))
          results.push({
            titulo: item.innerText
          })
      })
      return results
    })
    //const pdf = await page.pdf({ format: 'A4', path:"Example.pdf" });
    console.log(urls)
    await browser.close()
  } catch (e) {
    console.log(e)
  }
})()
