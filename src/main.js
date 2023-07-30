/** Crawl wikipedia and use jquery syntax to extract information from the page **/

var huntsman = require("huntsman");
var spider = huntsman.spider();
const fs = require("fs");

const fileName = "output.txt";
spider.extensions = [
	huntsman.extension("recurse"), // load recurse extension & follow anchor links
	huntsman.extension("cheerio"), // load cheerio extension
	huntsman.extension("links"),
];
var data = [];
// follow pages which match this uri regex
// spider.on(
// 	/^http:\/\/brotee\.org(?:\/\w+(?:-\w+)*)?(?:\/[^\/]*)?$/,
// 	function (err, res) {
// 		console.log(res.uri);
// 		data.push({ uri: res.uri });

// 		var $ = res.extension.cheerio;
// 		if (!$) return; // content is not html

// 		// extract information from page body
// 		var wikipedia = {
// 			uri: res.uri,
// 			heading: $("h1.firstHeading").text().trim(),
// 			body: $("div#mw-content-text p").text().trim(),
// 		};

// 		fs.writeFile(fileName, JSON.stringify(data, null, 2), "utf8", (err) => {
// 			if (err) {
// 				console.error("Error writing to file:", err);
// 			} else {
// 				console.log("Data has been written to " + fileName);
// 			}
// 		});
// 		console.log(wikipedia.uri);
// 	}
// );

spider.on("^(https?|ftp)://[^s/$.?#].[^s]*$", function (err, res) {
	if (!res.extension.links) return; // content is not a string

	// extract all image tags from body
	var images = res.extension.links({
		pattern: {
			search: /<([a-zA-Z]+)([^>]+)?>(.*?)<\/\1>/gi, // extract img tags
			// filter: /\.jpg|\.gif|\.png/i, // filter file types
		},
	});

	console.log(images);
});
spider.queue.add("http://brotee.org");
spider.start();
