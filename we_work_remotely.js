const cheerio = require("cheerio");
const axios = require("axios");


async function remoteScraper() {
    console.log("Scraper initialized ....\n");
    // box will contain all your data
    const box = [];
    // get markup
    console.log("fetching markup from We Work Remotely\n");
    const response = await axios.get("https://weworkremotely.com/categories/remote-programming-jobs");
    const html = response.data;
    // pass html to cheerio
    console.log("markup returned, parsing ,,,,,");
    const $ = cheerio.load(html);

    $("li").each(function(x,y) {
        box.push({
            link: $(this).find("a").attr("href"),
            title: $(this).find(".title").text(),
            company: $(this).find(".company").text(),
            date: $(this).find(".date").text()
        })
    })
    
    console.log(JSON.stringify(box, undefined, 2));
    return box
}

// run code 
remoteScraper()
    .catch(e => console.log(e))


