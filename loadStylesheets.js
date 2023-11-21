import fs from "fs";

fetch("https://locaties.nl/nonexistent")
  .then(res => res.text())
  .then(async text => {
    const urls = [...text.matchAll(/<link rel="stylesheet" href="(.*?)"/g)]
                   .map(arr => "https://locaties.nl" + arr[1]);
    
    // save all stylesheets to dist/style.css
    let str = "";

    for (const url of urls) {
      await fetch(url)
        .then(res => res.text())
        .then(text => str += text);
    }

    fs.writeFileSync("dist/style.css", str);
  })