const { container } = require("webpack");

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template)
}


