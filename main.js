import "./style.css";
import { getTemplate, getData, renderPage } from "./helpers.js";
import Navigo from "navigo";

const router = new Navigo("/");

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
