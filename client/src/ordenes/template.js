'use strict'

const yo = require('yo-yo')
const axios = require('axios')

function template (page) {
  page = parseInt(page)
  return new Promise((resolve, reject) => {
    let options = {
      method: 'GET',
      url: '/api/ordenes'
    }
    axios(options)
    .then(result => {
      // debugger
      let orders = []
      let startOrder

      if (page === 1) {
        startOrder = 0
      } else {
        startOrder = (page * 30) - 30
      }
      for (let i = startOrder; (i < (startOrder + 30) && i < result.data.length); i++) {
        orders.push(result.data[i])
      }
      let el = yo`
       <div id="main-container" class="col-xs-12">
          <span class="text-right text-danger col-xs-12"><h3>${result.data.length} ${result.data.length === 1 ? 'Orden.' : 'Ordenes.'}</h3></span>
          <table class="table table-hover" id="order-table">
          <thead>
          <tr>
              <th>Orden</th>
              <th>Buque</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Lugar</th>
              <th>Producto</th>
              <th>Sup</th>
            </tr>
          </thead>
          <tbody>
            ${orders.map(order => {
              return yo`<tr>
                <td>${order.orden}</td>
                <td>${order.buque}</td>
                <td>${order.cliente}</td>
                <td>${order.fecha.substring(0, 10)}</td>
                <td>${order.hora}</td>  
                <td>${order.pedDeslug}</td>  
                <td>${order.producto}</td> 
                <td>${order.sup}</td>
              </tr>`
            })}
          </tbody>
         </table>
        
        <div id="pagination-container" class="container col-xs-12 text-right">
          <ul class="pagination">
            ${paginationBody(result.data.length)
              .map(p => p)
            }
          </ul>

        </div>
       </div>
      `
      resolve(el)
    })
    .catch(err => {
      reject(err)
    })
  })

  function paginationBody (rows) {
    let pagesEl = []
    for (let i = 1; i <= (Math.ceil(rows / 30)); i++) {
      if (page !== i) {
        pagesEl.push(yo`<li><a href="/johansen/consulta/${i}">${i}</a></li>`)
      } else {
        pagesEl.push(yo`<li class="active"><a href="/johansen/consulta/${i}">${i}</a></li>`)
      }
    }
    return pagesEl
  }
}

// function getPages (result) {
//   let pagesSizes = Math.ceil((result.legth / 30))
//   let pages = []
//   for (let i = 0; i < pagesSizes; i++) {
//     pages[i] = yo`<li data-pagenum=${i}>${i}</li>`
//   }
//   return pages
// }

module.exports = template
