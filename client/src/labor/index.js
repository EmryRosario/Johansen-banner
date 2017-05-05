const page = require('page')
const empty = require('empty-element')
const template = require('./template')
const yo = require('yo-yo')
const banner = require('../banner.config')

page('/johansen/laborado', function (ctx, next) {
  clearTimeout(window.localStorage.currentTimeout)
  banner.links({
    route: window.location.pathname,
    rightButton: document.getElementById('right-button'),
    leftButton: document.getElementById('left-button')
  })
  const header = yo`<div class="text-center">
  <h2> JOHANSEN & Co.</h2>
  <h2>ACTIVIDADES DE LOS INSPECTORES</h2>
  </div>`
  empty(document.getElementById('header-container')).appendChild(header)
  template()
  .then(el => {
    yo.update(document.getElementById('main-container'), el)
    window.localStorage.currentTimeout = banner.change('/johansen/consulta/1', banner.time)
  })
})
