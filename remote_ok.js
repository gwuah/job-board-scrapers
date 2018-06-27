const cheerio = require("cheerio");
const axios = require("axios");


async function remoteScraper() {
	console.log("Scraper initialized ...\n");
	// box will contain all your data
	const box = {}
	// get markup
	console.log("fetching markup from RemoteOK\n");
	const response = await axios.get("https://remoteok.io/remote-junior-jobs");
	const html = response.data;
	// pass html to cheerio
	console.log("markup returned, parsing ,,,,,");
	const $ = cheerio.load(html);

	$("table")
		.find("tr")
		.filter(".job")
		.each(function(i, el) {
			let id = $(el).data("id");
			box[id] = { link: $(el).data("href"), company: $(el).data("company")};
			$(this)
				.find("td")
				.each(function(i, el) {
					if ($(this).attr("class").includes("image")) {
						box[id]["logo"] = $(this).find(".logo").data("src")
					} else if ($(this).attr("class").includes("company")) {
						box[id]["title"] = $(this).find("h2").text()
					} else if ($(this).attr("class").includes("tags")) {
						box[id]["tags"] = [];
						$(this).find("h3").each(function(yi, yel) {
							box[id]["tags"].push($(this).text())
						})
					} else if ($(this).attr("class").includes("time")) {
						box[id]["time"] = $(this).text()
					} 
				})
		})

		$("table")
			.find("tr")
			.filter(".expand")
			.each(function(x, y) {
				box[$(this).data("id")]["description"] = $(this).find(".description").text()
			})

	console.log(JSON.stringify(box, undefined, 2));
	return box
}

// run code 
remoteScraper()
	.catch(e => console.log(e))


