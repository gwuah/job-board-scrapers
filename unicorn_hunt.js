const cheerio = require("cheerio");
const axios = require("axios");


async function remoteScraper() {
    console.log("Scraper initialized ....\n");
    // box will contain all your data
    const box = {}
    // get markup
    console.log("fetching markup from Unicornhunt\n");
    const response = await axios.get("https://unicornhunt.io/?q=junior");
    const html = response.data;
    // pass html to cheerio
    console.log("markup returned, parsing ,,,,,");
    const $ = cheerio.load(html);

    $(".job-card").each(function(x, y) {
    	box[$(this).data("reactid")] = {};
		  box[$(this).data("reactid")]["link"] = $(this).find("a").attr("href")
		  box[$(this).data("reactid")]["name"] = $(this).find(".job-overview__role-name").text()
		  box[$(this).data("reactid")]["company"] = $(this).find(".job-overview__company-name").text()
		  box[$(this).data("reactid")]["problem"] = $(this).find(".job-overview__problem").text()
		  box[$(this).data("reactid")]["posted_at"] = $(this).find(".job-overview__posted-at").text()
		  box[$(this).data("reactid")]["location"] = $(this).find(".job-overview__rough-location").text()
		})

    console.log(JSON.stringify(box, undefined, 2));
    return box
}

// run code 
remoteScraper()
    .catch(e => console.log(e))


