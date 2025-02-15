const { Builder, By, Key, until } = require("selenium-webdriver");

const chrome = require("selenium-webdriver/chrome");

async function exampleTest() {

  // Menambahkan chrome option untuk menggunakan User Agent yang menyerupai browser asli
  let options = new chrome.Options();

  options.addArguments("Chrome/132.0.6834.197");
  options.addArguments("--disable-blink-features=AutomationControlled"); //sembunyikan otomisasi

  // Membuat koneksi dengan driver
  let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  //Exception handling & conclusion
  try {
    // buka URL di browser
    await driver.get("https://google.com");

    // Melakukan pencarian di google
    let searchBox = await driver.findElement(By.name("q")); //element typing

    // Melakukan user behaviour typing hello word
    await searchBox.sendKeys("Hello World", Key.RETURN);
    await driver.wait(until.elementLocated(By.id("result-state")), 10000); //nunggu 10.000 ms

    let title = await driver.getTitle();
    console.log(`Page title is ${title}`);
  } finally {
    await driver.quit();
  }
}

exampleTest();
