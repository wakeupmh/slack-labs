import puppeteer from 'puppeteer'
import dotenv from 'dotenv'
dotenv.config()

const scraper = async () => {
  const password = process.env.PASSWORD
  const email = process.env.EMAIL

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    headless: false,
    args: ['--no-sandbox']
  })

  const page = await browser.newPage()

  await page.goto(process.env.URL)
  await page.waitForNavigation()

  await page.$eval('#userNameInput', (el, email) => {
    el.value = email
  }, email)

  await page.$eval('#passwordInput', (el, password) => {
    el.value = password
  }, password)

  await page.click('.submit')

  await page.waitForSelector('#__image1')
  await page.click('#__image1')
}

scraper()
