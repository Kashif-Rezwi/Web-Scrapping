
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const puppeteer = require('puppeteer')
const superagent = require('superagent').agent()

const PORT = 8080
const app = express()

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}. Thank you`)
})

// const url = `https://course.masaischool.com/dashboard`
// const demo = `https://www.scraping-bot.io/web-scraping-documentation/`
// const Scrapping = (url) => {
//     axios.get(url)
//         .then((res) => {
//             const data = res.data;
//             console.log(data);
//         })
//         .catch((err) => console.log(err.message))
// }

// Scrapping(demo)


////////////////////////////////////////////////////////////////


// const reqURL = `https://course.masaischool.com/login/`

// const Auth = async () => {
//     try {
//         let dashboard = await superagent.post(reqURL)
//             .send({ email: "kashifrezwi850@gmail.com", password: "Rezwi007" })
//             .set('Content-Type', 'application/x-www-form-urlencoded')

//             console.log(dashboard.text)


//     } catch (err) {
//         console.log(err.message)
//     }
// }

// Auth();



////////////////////////////////////////////////////////////////


const srapping = async () => {

    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    const login = `https://course.masaischool.com/login/`
    await page.goto(login);
    await page.waitForSelector("#email")
    await page.type("#email", "kashifrezwi850@gmail.com") //{delay: 100}
    await page.waitForSelector("#password")
    await page.type("#password", "Rezwi007") //{delay: 100}
    await page.click("[type=submit]")

    await page.waitForSelector(".divide-y")
    const result = await page.evaluate(() => {
        let sessionsData = document.querySelectorAll("li")
        let sessionsList = [...sessionsData]
        return sessionsList.map((el) => {
            return [el.innerHTML, el.innerText]
        })
    })

    console.log(result)
    
    //data has been collected ✅
}

srapping()