const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const edge = require("selenium-webdriver/edge");
const assert = require("assert");

async function saucedemoLoginTest() {
  const browsers = [
    {
      name: "chrome",
      options: new chrome.Options().addArguments("--headless"),
    },
    {
      name: "firefox",
      options: new firefox.Options().addArguments("--headless"),
    },
    {
      name: "MicrosoftEdge",
      options: new edge.Options().addArguments("--headless"),
    },
  ];

  for (let browser of browsers) {
    //Membuat koneksi dengan webdriver
    let driver = await new Builder()
      .forBrowser(browser.name)
      .setChromeOptions(browser.name === "chrome" ? browser.options : undefined)
      .setFirefoxOptions(
        browser.name === "firefox" ? browser.options : undefined
      )
      .setEdgeOptions(
        browser.name === "MicrosoftEdge" ? browser.options : undefined
      )
      .build();

    //Exception Handling & Conclusion
    try {
      await driver.get("https://www.saucedemo.com/");

      await driver.findElement(By.id("user-name")).sendKeys("standard_user");
      await driver
        .findElement(By.xpath("//input[@id='password']"))
        .sendKeys("secret_sauce");

      await driver.findElement(By.name("login-button")).click();

      //assertion
      let titleText = await driver
        .findElement(By.xpath("//div[@class='app_logo']"))
        .getText();
      assert.strictEqual(
        titleText.includes("Swag Lab"),
        true,
        "Title does not include Swag Lab"
      );
      console.log(`testing running success headless in ${browser.name}!`);
    } finally {
      //console.log('Selamat')
      setTimeout(async () => {
        await driver.quit();
      }, 5000);
      //await driver.quit();
    }
  }
}

saucedemoLoginTest();
