const page = require('page')
const empty = require('empty-element')
const template = require('./template')
const yo = require('yo-yo')
const banner = require('../banner.config')

page('/johansen/consulta/:page', function (ctx, next) {
  clearTimeout(window.localStorage.currentTimeout)
  banner.links({
    route: window.location.pathname,
    rightButton: document.getElementById('right-button'),
    leftButton: document.getElementById('left-button')
  })
  // let consult = function () {
// module.exports = function ordenes () {
  // return new Promise((resolve, reject) => {
  const header = yo`<div class="text-center">
  <h2> JOHANSEN & Co.</h2>
  <h2>LISTADO DE ORDENES ABIERTAS</h2>
  </div>`
  empty(document.getElementById('header-container')).appendChild(header)
  template(ctx.params.page)
.then(el => {
  yo.update(document.getElementById('main-container'), el)
  window.localStorage.currentTimeout = banner.change('/johansen/proyector', banner.time)
// console.log('Refrescado...')
})
  // })
// }

  // }

  // consult()

  // ctx.interval = window.setInterval(consult, 5000000)
})

// page.exit('/johansen/consulta/:page', function (ctx, next) {
//   window.clearInterval(ctx.interval)
//   next()
// })
