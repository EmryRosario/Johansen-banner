'use strict'

const yo = require('yo-yo')
const axios = require('axios')

function template () {
  return new Promise((resolve, reject) => {
    let options = {
      method: 'GET',
      url: '/api/ordenes'
    }
    axios(options)
    .then(result => {
      let orders = result.data

      let el = yo`
       <div id="order-container" class="col-xs-12">
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

       </div>
      `
      resolve(el)
    })
    .catch(err => {
      reject(err)
    })
  })

}


module.exports = template
