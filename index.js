const needle = require("needle");
const mongodb = require("./mongodb/mongodb.connect");
const fetch = require("node-fetch")
const { TwitterScraper } = require("@tcortega/twitter-scraper")
const cron = require('node-cron')


cron.schedule('* * * */1 *', async function main() {
 
  const mongoClient = await mongodb();
  const qsdb = mongoClient.db("qs");
  const results = qsdb.collection("crypto-results");
  const filteredResults = qsdb.collection("filtered-crypto-results");
  const airdropResults = qsdb.collection("airdrop-crypto-results");
  
  (async () => {
    try {
      const twtScraper = await TwitterScraper.create();
      const tweetMeta = await twtScraper.getTweetMeta("https://twitter.com/thedefiedge/status/1514997232436613120");
      console.log(tweetMeta);
    } catch (error) {
      console.log(error);
    }
  })();
 
  let totalPages=50;        
  for (let page=0; page<totalPages; page=page+1){
  const response = await fetch(
    `https://cryptopanic.com/api/v1/posts/?auth_token=c3ceddec592cb179c35da110aa7a339b04a09e51&currencies=ETH&filter=rising&page=${page}`
  ).then( token => {
    return token.json();
  });

  await filteredResults.updateMany(response.results);
  console.log(response);
  console.log(page);
  await sleep(500);
}

       
for (let page=0; page<1; page=page+1){
const responseAir = await fetch("https://api.coinmarketcap.com/data-api/v3/airdrop/query?status=Ended&start=100&limit=100", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "platform": "web",
      "pragma": "no-cache",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": "\"Android\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-request-id": "9ff732e9036c4bdbaa03156a3363dddd",
      "Referer": "https://coinmarketcap.com/",
      "Referrer-Policy": "origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  }).then( token => {
  return token.json();
});
console.log(responseAir)
await airdropResults.insertMany(responseAir.data.projects);

}

      
  for (let page=0; page<totalPages; page=page+1){
    const result = await needle(
        `https://cryptopanic.com/api/v1/posts/?auth_token=c3ceddec592cb179c35da110aa7a339b04a09e51&public=true&page=${page}`
      );
      await results.insertMany(result.body.results);
      await sleep(500);
      console.log(page);
      console.log(result.body.results);
  }
  
  


async function sleep(milliseconds){
    return new Promise(resolve=> setTimeout(resolve,milliseconds));
}
})

