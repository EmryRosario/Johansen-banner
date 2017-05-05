'use strict'

const yo = require('yo-yo')
const axios = require('axios')

function template (page) {
  return new Promise((resolve, reject) => {
    let options = {
      method: 'GET',
      url: '/api/labor/inspectores'
    }
    axios(options)
    .then(inspectors => {
      let el = yo`<div id="main-container" col-xs-12 class="container">
        <div class="row">
          <div class="col-xs-6">
          <h4 class="text-danger text-center">INSPECTORES NO LABORARON</h4>

          <table class="table table-hover">
          <thead>
            <tr>
              <th>CODIGO</th>
              <th>NOMBRE</th>

            </tr>
          </thead>

          <tbody>
            ${inspectors.data.notWork.map(inspector => {
              return yo`<tr>
                <td>${inspector['Codigo']}</td>
                <td>${inspector['Nombre']}</td>
              </tr>`
            })}
          </tbody>
          </table>
          </div>

          <div class="col-xs-6">
          <h4 class="text-success text-center">INSPECTORES SI LABORARON</h4>

          <table class="table-hover table">

          <thead>
            <tr>
              <th>CODIGO</th>
              <th>NOMBRE</th>
              <th>TOTAL HORAS</th>
            </tr>
          </thead>

          <tbody>
            ${inspectors.data.work.map(inspector => {
              return yo`<tr>
                <td>${inspector['Codigo']}</td>
                <td>${inspector['Nombre']}</td>
                <td>${inspector['TotalHoras']}</td>
              </tr>`
            })}

          </tbody->

          </table>

          </div>
        </div>
      </div>`
      return resolve(el)
    })
    .catch(error => {
      console.log(error)
      return reject(yo`<h3>Ha ocurrido un error. ${error}</h3>`)
    })
  })
}
module.exports = template
