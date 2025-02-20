const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

async function saucedemoLoginTest(){
    describe("Saucedemo Login Test", function(done){
        it ("TC01 - Login Success", async function () {
            //Menambah timeout
            this.timeout(5000) //menunggu 5000ms


            // script login success

             //Membuat koneksi dengan webdriver
              let driver = await new Builder()
                .forBrowser("chrome")
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
                console.log("Sukses Login");
              } finally {
                //console.log('Selamat')
                setTimeout(async () => {
                  await driver.quit();
                }, 5000);
                //await driver.quit();
              }
        }),
        it ("TC02 - Login Failed", async function () {
             //Membuat koneksi dengan webdriver
              let driver = await new Builder()
                .forBrowser("chrome")
                .build();
            
              //Exception Handling & Conclusion
              try {
                await driver.get("https://www.saucedemo.com/");
            
                await driver.findElement(By.id("user-name")).sendKeys("standard_user");
                await driver
                  .findElement(By.xpath("//input[@id='password']"))
                  .sendKeys("secret_saucy");
            
                await driver.findElement(By.name("login-button")).click();
            
                //assertion
                let titleText = await driver
                  .findElement(By.css(".error-message-container"))
                  .getText();
                assert.strictEqual(
                  titleText.includes("Epic sadface: Username and password do not match any user in this service"),
                  true,
                  "Error message"
                );
                console.log("Gagal Login");
              } finally {
                //console.log('Selamat')
                setTimeout(async () => {
                  await driver.quit();
                }, 5000);
                //await driver.quit();
              }
        })
    })
}

saucedemoLoginTest()