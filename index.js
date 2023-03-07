import puppeteer from 'puppeteer';

async function run () {
  return new Promise(async (resolve, reject) => {
      try {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto("https://elpais.com/");
          let urls = await page.evaluate(() => {
              let results = [];
              let items = document.querySelectorAll('a');
              items.forEach((item) => {
                if(item.innerText.includes("Fernando Alonso"))
                  results.push({
                      titulo: item.innerText
                  });
                  
              });
              return results;
              
          })
          const pdf = await page.pdf({ format: 'A4', });
          browser.close();
          return resolve(urls), pdf;
      } catch (e) {
          return reject(e);
      }
  })
}
console.log(await run())