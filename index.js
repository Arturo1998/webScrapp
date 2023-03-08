import puppeteer from 'puppeteer'

const medios = [
    {nombre:"El Pais", url: "https://elpais.com/"},
    {nombre:"El Pais Internacional", url:"https://elpais.com/internacional/"},
    {nombre:"El Mundo", url:"https://elmundo.es/"},
    {nombre: "La Vanguardia", url:"https://www.lavanguardia.com/"}
];

(async () => {
  try {
    medios.forEach(async x =>{
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto(x.url)
      const urls = await page.evaluate(() => {
        let items = document.querySelectorAll('a')
        let results = []
  
        items.forEach((item) => {
          if (item.innerText.includes('Victor Gil'))
            results.push({
              titulo: item.innerText
            })
        })
        return results
      })
      //const pdf = await page.pdf({ format: 'A4', path:"Example.pdf" });
      console.log(x.nombre)
      console.log(urls)
      await browser.close()
    })
   
  } catch (e) {
    console.log(e)
  }
})()
