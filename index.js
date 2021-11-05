
const puppeteer = require("puppeteer");

let page = null;
let browser = null;

browser = puppeteer
    .launch({ headless: false })
    .then(async (browser) => {
        // open chrome
        page = await browser.newPage();
        // open the paid link
        page.goto("http://gestyy.com/epA6rg", {
            waitUntil: "networkidle0",
        });

        // wait for the 'skip ad' button to show
        await page.waitForSelector('.skip-btn.show');

        // click skip ad (get 1st ad popup)
        await page.click('#skip_button');
        // select correct tab
        await page.bringToFront();

        // click skip ad (get 2nd ad popup)
        await page.click('#skip_button');
        // select correct tab
        await page.bringToFront();

        // click skip ad (get 3rd ad popup)
        await page.click('#skip_button');
        // select correct tab
        await page.bringToFront();

        // click skip ad for the final time (no more ads load)
        await page.click('#skip_button');

        // wait for youtube to fully load
        await page.waitForNavigation({
            waitUntil: 'networkidle0',
        });

        // exit script
        await browser.close();
    })
    .catch((error) => {
        console.log(error);
    });