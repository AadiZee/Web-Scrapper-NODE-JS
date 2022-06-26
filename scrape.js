const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const url = `https://www.amazon.de/-/en/dp/B07Y4YFQ4T/ref=twister_B083ZBM52C?_encoding=UTF8&th=1`;

const product = { name: "", price: "", link: "" };

//Set interval to make sure app keeps running till minimum price is reached
const handle = setInterval(scrape, 20000);

const scrape = async () => {
  //Fetch Data
  const { data } = await axios.get(url);
  //Load up HTML
  const $ = cheerio.load(data);
  const item = $("div#dp-container");
  //Extract the data we require
  product.name = $(item).find("h1 span#productTitle").text();
  product.link = url;
  let price = $(item)
    .find("span .a-price-whole")
    .first()
    .text()
    .replace(/[,.]/g, "");
  let priceNum = parseFloat(price);
  product.price = priceNum;

  if (product.price < 150) {
    client.messages
      .create({
        body: `The price of ${product.name} went below ${product.price}. You can purchase it at ${product.link}`,
        from: `TWILIO NUMBER HERE`, //this is the number that is provided by twilio to your account
        to: `RECIPIENT NUMBER HERE`, //this is the number you want to send the message to. If you are on trial account then you can only send messages to numbers that are verified on twilio
      })
      .then((message) => {
        console.log("Message Sent Successfully. Message => ", message);
        clearInterval(handle);
      });
  }
};

scrape();
