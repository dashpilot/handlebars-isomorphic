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
