export async function getTemplate() {
  // document.querySelector("#app").innerHTML = "";
  if (typeof cfg.remote_domain !== "undefined") {
    var tpl = await fetch(cfg.remote_domain + "/tpl/main.html");
  } else {
    var tpl = await fetch("/tpl/main.html");
  }
  const result = await tpl.text();
  return result;
}

export async function getData() {
  const data = await fetch(
    "https://api.eu-central-1.linodeobjects.com/test/data.json"
  );
  const result = await data.json();
  return result;
}

export async function renderPage(tpl, data, page) {
  var template = Handlebars.compile(tpl);
  // data.entries = data.entries.filter((x) => x.page == page);
  data.page = page;

  document.querySelector("#app").innerHTML = template(data);
  console.log("template rendered");
}
