const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");

async function saucedemoLoginTest() {
  let options = new chrome.Options();
  options.addArguments("--headless");

  //Membuat koneksi dengan webdriver
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
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
    console.log("testing running success headless in chrome!");
  } finally {
    //console.log('Selamat')
    setTimeout(async () => {
      await driver.quit();
    }, 5000);
    //await driver.quit();
  }
}

saucedemoLoginTest();
