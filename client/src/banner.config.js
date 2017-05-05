const page = require('page')
module.exports = {
  time: 300000,
  change: (path, time) => {
    return setTimeout(() => {
      page.redirect(path)
    }, time)
  },
  banners: [
    '/johansen/proyector',
    '/johansen/laborado',
    '/johansen/consulta/1'
  ],
  links: function (obj) {
    let {route, leftButton, rightButton} = obj
    let position = this.banners.indexOf(route)

    let next = position === (this.banners.length - 1) ? 1 : position + 1
    let prev = position <= 1 ? (this.banners.length - 1) : position - 1

    leftButton.href = this.banners[prev]
    rightButton.href = this.banners[next]
  }
}
