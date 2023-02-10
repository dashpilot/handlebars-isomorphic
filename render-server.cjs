const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

Handlebars.registerHelper("ifEq", function (a, b, options) {
  if (a === b) {
    return options.fn(this);
  }
  return options.inverse(this);
});

async function render() {
  const resp = await fetch(
    "https://vercel-ssg.website-eu-central-1.linodeobjects.com/src/data.json"
  );
  const data = await resp.json();

  var partialPath = path.join(process.cwd(), "public", "tpl", "main.html");
  var main = fs.readFileSync(partialPath, "utf-8");
  Handlebars.registerPartial("main", main);

  //let compiled = Handlebars.precompile(main);
  // fs.writeFile("./dist/tpl/main.compiled.js", compiled, "utf-8");

  var source = fs.readFileSync("./dist/index.html", "utf-8");
  const template = Handlebars.compile(source);

  const data_old = data;

  for (const item of data.pages) {
    //
    write(template, data, item);
  }
}

function write(template, data, item) {
  var page = item.slug;
  // data.entries = data.entries.filter((x) => x.page == page);
  data.page = page;
  var result = template(data);
  if (item.slug == "home") {
    fs.writeFileSync("./dist/index.html", result, "utf-8");
  } else {
    fs.mkdirSync("./dist/" + page);
    fs.writeFileSync("./dist/" + page + "/index.html", result, "utf-8");
  }
}

render();
