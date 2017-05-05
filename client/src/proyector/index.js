const page = require('page')
const empty = require('empty-element')
const yo = require('yo-yo')
const banner = require('../banner.config')

// let bannerTime = 60000
// let banners = [
//   work,
//   order
// ]

page('/johansen/proyector', function (ctx, next) {
  // let task = co.wrap(function * () {
  // let mainContainer = document.getElementById('main-container')
  // let headerContainer = document.getElementById('header-container')
  clearTimeout(window.localStorage.currentTimeout)
  const leftButton = yo`<a class="btn btn-primary " id="left-button"></a>`
  leftButton.appendChild(document.createTextNode('<'))
  // leftButton.href = banner.banners
  const rightButton = yo`<a class="btn btn-primary" id="right-button"></a>`
  rightButton.appendChild(document.createTextNode('>'))

  empty(document.getElementById('left-container')).appendChild(leftButton)
  empty(document.getElementById('right-container')).appendChild(rightButton)

  window.localStorage.currentTimeout = banner.change('/johansen/laborado', 1)

  //   // for (let i = 0; i < banners.length; i++) {
  //   //   let banner = yield banners[i]()
  //   //   pausecomp(bannerTime)
  //   //   yo.update(headerContainer, banner.header)
  //   //   yo.update(mainContainer, banner.body)
  //   // }
  //   let works = yield work()
  //   console.log(works)

  //   empty(headerContainer).appendChild(works.header)
  //   empty(mainContainer).appendChild(works.body)

  //   let orders = yield order()
  //   console.log(orders)
  //   pausecomp(bannerTime)

  //   empty(headerContainer).appendChild(orders.header)
  //   empty(mainContainer).appendChild(orders.body)

  //   // let esto = page('/johansen/consulta/1')
  //   // console.log(esto)
  //   // mainContainer.onload = function () {
  //   //   pausecomp(bannerTime)
  //   //   page('/johansen/laborado')
  //   // }
  // })

  // task()
  // .then(() => {
  //   function taskProcess () {
  //     task()
  //     .then()
  //   }
  //   ctx.projectInterval = setInterval(taskProcess, (1000 * 180))
  // })
})

// function pausecomp (millis) {
//   let date = new Date()
//   let curDate = null
//   do { curDate = new Date() }
//   while (curDate - date < millis)
// }
