const page = require('page')
const empty = require('empty-element')
const yo = require('yo-yo')
const banner = require('../banner.config')
const laborTemplate = require('../labor/template')
const ordersTemplate = require('../ordenes/template')
const co = require('co')

// let bannerTime = 60000
// let banners = [
//   work,
//   order
// ]

page('/johansen/proyector', function (ctx, next) {

  task()
  .then(() => {
      let owl = $('.owl-carousel')
      owl.owlCarousel({
          items:1,
          loop:true,
          margin:0,
          autoplay:true,
          autoplayTimeout:30000,
          autoplayHoverPause:false
      })
      owl.on('changed.owl.carousel', (event) => {
      updateContainers()

      })
  })

})

const updateContainers = co.wrap(function * () {
  let laborContainer = document.getElementById('labor-container')
  let orderContainer = document.getElementById('order-container')
  let labor = yield laborTemplate()
  let orders = yield ordersTemplate()
  yo.update(laborContainer,labor)
  yo.update(orderContainer,orders)
})

const task = co.wrap(function * () {
  let mainContainer = document.getElementById('main-container')
  let labor = yield laborTemplate()
  let orders = yield ordersTemplate()

  let finalTemplate = yo`
  <div class="owl-carousel owl-theme">
    <div id="labor-container" class='item'> ${labor} </div>
    <div id="order-container" class='item'>${orders}</div>
  </div>`

  empty(mainContainer).appendChild(finalTemplate)
})
