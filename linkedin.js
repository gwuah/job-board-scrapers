const Scrappy = require('./src/scrappy');

const url = "https://www.linkedin.com/jobs/search/?f_E=2&f_F=it&f_I=4&f_TP=1%2C2&location=Worldwide&locationId=OTHERS.worldwide";

const api = Scrappy(url);

api.init((err, $)=> {
  if (err) {
    return console.log("err as", err)
  }

  // the $ is a cheerio constructor
  const box = {};

  // console.log($('.card-list.card-list--column.jobs-search-results__list'))

  $(".card-list.card-list--column.jobs-search-results__list")
    .find("li")
    .each(function() {
      const id = $(this).attr("id");
      box[id] = {};
      box[id]["img"] = $(this).find(".lazy-image.job-card-search__logo-image").text();
      box[id]["title"] = $(this).find(".job-card-search__title").text();
      box[id]["company"] = $(this).find(".job-card-search__company-name").text();
      box[id]["location"] = $(this).find(".job-card-search__location").text();
      box[id]["description"] = $(this).find(".job-card-search__description-snippet").text()
    })

    console.log(JSON.stringify(box));

})