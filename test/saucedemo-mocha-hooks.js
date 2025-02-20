const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const { resolve } = require("path");

async function saucedemoLoginTest() {
  describe("Saucedemo Login Test", function (done) {
    let driver;
    let browserName = "chrome";
    beforeEach(async function () {
      //Menambah timeout
      this.timeout(5000); //menunggu 5000ms

      // script login success
      //Membuat koneksi dengan webdriver
      driver = await new Builder().forBrowser(browserName).build();
      await driver.get("https://www.saucedemo.com/");
      
      //membuat cookies
      //cookies = await driver.manage().getCookies();
    })

    it("TC01 - Login Success", async function () {
      //Exception Handling & Conclusion
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
        console.log("Sukses Login");
    }),
    it("TC02 - Login Failed", async function () {
        await driver
          .findElement(By.id("user-name"))
          .sendKeys("standard_user");
        await driver
          .findElement(By.xpath("//input[@id='password']"))
          .sendKeys("secret_saucy");

        await driver.findElement(By.name("login-button")).click();

        //assertion
        let titleText = await driver
          .findElement(By.css(".error-message-container"))
          .getText();
        assert.strictEqual(
          titleText.includes(
            "Epic sadface: Username and password do not match any user in this service"
          ),
          true,
          "Error message"
        );
        console.log("Gagal Login");
    });
    afterEach(async function () {
      setTimeout(async () => {
        await driver.quit();
      }, 5000);
    })
  }); 
}

saucedemoLoginTest();
