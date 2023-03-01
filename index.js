const puppeteer = require("puppeteer");
const fs = require("node:fs");
require("dotenv").config();

const srapping = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const login = `https://course.masaischool.com/login/`;
  await page.goto(login);
  await page.waitForSelector("#email");
  await page.type("#email", process.env.LMS_Email_ID); //{delay: 100}
  await page.waitForSelector("#password");
  await page.type("#password", process.env.LMS_Password); //{delay: 100}
  await page.click("[type=submit]");

  await page.waitForSelector(".divide-y");
  const result = await page.evaluate(() => {
    let sessionsData = document.querySelectorAll("main"); //find ul for all sessions
    let sessionsList = [...sessionsData];
    return sessionsList.map((el) => [el.innerHTML, el.innerText]);
  });

  const scrap = `this is the data I have scraped : ${result} | ${new Date()}.\n`;
  fs.appendFile("./records.txt", scrap, (err) => {
    if (err) console.error(err.message);
  });

  //data has been collected ✅
};

// srapping();

// creating events in google calender

const CreatingEvents = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://calendar.google.com/");
  await page.waitForSelector("input[type='email']");
  await page.type("input[type='email']", process.env.Email_ID);
  await page.keyboard.press("Enter");
};

CreatingEvents();
