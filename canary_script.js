var synthetics = require('Synthetics');
const log = require('SyntheticsLogger');

const https = require('https');
const fs = require('fs');

const recordedScript = async function () {
  let page = await synthetics.getPage();
  
  const file = fs.createWriteStream("/tmp/test-image.png");
  const request = https.get("https://d2xm9h5is2nkvj.cloudfront.net/test-image.png", function(response) {
    response.pipe(file);
    // after download completed close filestream
    file.on("finish", () => {
        file.close();
        console.log("Download Completed");
    });
  });
  await page.waitForTimeout(3000);
  
  await synthetics.executeStep('Goto_0', async function() {
    await page.goto("https://www.deepfake-detect.com/", {waitUntil: 'domcontentloaded', timeout: 60000})
  })
  
  await page.setViewport({ width: 2560, height: 1247 })
  
  await synthetics.executeStep('Click_1', async function() {
    await page.waitForSelector('.container > .row > .col-lg-6 > div > .btn')
    await page.click('.container > .row > .col-lg-6 > div > .btn')
  })
  
  await synthetics.executeStep('Click_2', async function() {
    await page.waitForSelector('section > .uppload-active-container > .uppload-service > .drop-area > .uppload-button')
    await page.click('section > .uppload-active-container > .uppload-service > .drop-area > .uppload-button')
  })
  
  await synthetics.executeStep('Upload_Image', async function() {
    await page.waitForSelector('section > .uppload-active-container > .uppload-service > .alternate-input > input[type=file]')
    const fileInput = await page.$('section > .uppload-active-container > .uppload-service > .alternate-input > input[type=file]');
    await fileInput.uploadFile("/tmp/test-image.png");
  })
  
  await synthetics.executeStep('Click_3', async function() {
    await page.waitForSelector('.uppload-modal > section > .effects-nav > .effects-continue > .effects-continue--upload')
    await page.click('.uppload-modal > section > .effects-nav > .effects-continue > .effects-continue--upload')
  })
  
  await synthetics.executeStep('Click_4', async function() {
    await page.waitForSelector('.container > .nav-menu > ul > .active > a')
    await page.click('.container > .nav-menu > ul > .active > a')
  })
  
  await synthetics.executeStep('Click_5', async function() {
    await page.waitForSelector('.container > .nav-menu > ul > li:nth-child(2) > a')
    await page.click('.container > .nav-menu > ul > li:nth-child(2) > a')
  })
  
  await synthetics.executeStep('Click_6', async function() {
    await page.waitForSelector('.container > .nav-menu > ul > li:nth-child(3) > a')
    await page.click('.container > .nav-menu > ul > li:nth-child(3) > a')
  })
  
  await synthetics.executeStep('Click_7', async function() {
    await page.waitForSelector('#footer > .container > .copyright > strong > a')
    await page.click('#footer > .container > .copyright > strong > a')
  })
  
  await synthetics.executeStep('GitHub', async function() {
    await page.waitForSelector('#repo-content-pjax-container > .clearfix > div > .Layout > .Layout-sidebar')
    await page.click('#repo-content-pjax-container > .clearfix > div > .Layout > .Layout-sidebar')
  })
  
};

exports.handler = async () => {
    return await recordedScript();
};