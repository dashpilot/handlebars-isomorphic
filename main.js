var head = document.getElementsByTagName("head")[0];
var script = document.createElement("script");
script.type = "text/javascript";
script.src =
  "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js";
head.appendChild(script);

import "./style.css";
import { getTemplate, getData, renderPage } from "./render-client.js";
import Navigo from "navigo";

const router = new Navigo("/");

async function init() {
  const tpl = await getTemplate();
  const data = await getData();

  Handlebars.registerHelper("ifEq", function (v1, v2, options) {
    if (v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  router.on("/", async function () {
    renderPage(tpl, data, "home");
  });

  router.on("/about", async function () {
    renderPage(tpl, data, "about");
  });

  router.on("/contact", async function () {
    renderPage(tpl, data, "contact");
  });

  router.resolve();

  document.body.addEventListener(
    "update",
    (e) => {
      console.log("update event fired");
      renderPage(tpl, e.detail, e.detail.page);
    },
    false
  );
}

init();
