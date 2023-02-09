import "./style.css";
import { getTemplate, getData, renderPage } from "./helpers.js";
import Navigo from "navigo";

const router = new Navigo("/");

Handlebars.registerHelper("ifEq", function (v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

router.on("/", async function () {
  var tpl = await getTemplate();
  var data = await getData();
  renderPage(tpl, data, "home");
});

router.on("/about", async function () {
  var tpl = await getTemplate();
  var data = await getData();
  renderPage(tpl, data, "about");
});

router.on("/contact", async function () {
  var tpl = await getTemplate();
  var data = await getData();
  renderPage(tpl, data, "contact");
});

router.resolve();
