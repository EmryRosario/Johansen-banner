const express = require('express')
const path = require('path')
const app = express()
const clientRoutes = require('./client-routes')
// const config = require('./config/db')
// const knex = require('knex')(config)

var mysql = require('mysql')
var connection = mysql.createConnection({
  host: '65.39.193.20',
  user: 'siste534_admuser',
  password: 'S123456',
  database: 'siste534_DBSGS'
})

app.set('view engine', 'pug')
app.set('views', path.resolve(__dirname, 'views'))

app.use(express.static(path.resolve(__dirname, 'public')))

connection.connect()
app.get(clientRoutes, (req, res) => {
  res.render('index.pug')
})

app.get('/api/ordenes', (req, res) => {
  connection.query(`Select Ped_Fecha fecha,
       Ped_Hora hora,
       Ped_DesBuq buque,
       Ped_DesPro producto,
       Cli_Nombre cliente,
       Ped_NumOrd orden,
       Emp_Inic sup,
       Ped_DesLug pedDeslug
From GENPEDIDO,
     VW_CLIENTES,
     GENEMPLEADO
Where Ped_Cia = Cli_Cia
  And Ped_CodCli = Cli_Codigo
  And Ped_Cia = Emp_Cia
  And Ped_CodSup = Emp_Codigo
  And Ped_estado = 1
  Order by hora ASC

  `, function (error, results, fields) {
    if (error) console.log(error)
    console.log(results)
    res.json(results)
  })
})

app.get('/api/labor/inspectores', (req, res) => {
  connection.query(`Select Emp_Codigo Codigo,Emp_Nombre Nombre
            From VW_EMPLEADOS e
            Where Emp_Cia = 1
            And Emp_CodCarg = 2
            And Emp_Estado = 1
            And e.Emp_Codigo Not In(Select enc.Hoe_CodEmp
                  From NOMHORAD det,
                  NOMHORAE enc
                  Where Hoe_Cia = 1
                    And Hoe_Cia = Hod_Cia
                   And Hoe_Numero = Hod_Numero
                  And Hod_Fecha >= (Select Fec_Desde From NOMFECHAS)
                  And Hod_Fecha <= (Select Fec_Desde From NOMFECHAS))
                  And e.Emp_Codigo
                  Not In(Select enc.Cie_CodEmp
                  From NOMCIID det,
                       NOMCIIE enc
                  Where Cie_Cia = 1
                  And Cie_Cia = Cid_Cia
                  And Cie_Numero = Cid_Numero
                  And Cid_Fecha >= (Select Fec_Desde From NOMFECHAS)
                  And Cid_Fecha <= (Select Fec_Hasta From NOMFECHAS))`, function (error, results, fields) {
    connection.query(`Select Codigo,Nombre,Sum(Horas) TotalHoras 
            From VW_HORASXINPECTOR 
            Where Cia = 1
            And Estado = 1 
            And Fecha >= (Select Fec_Desde From NOMFECHAS)
            And Fecha <=  (Select Fec_Hasta From NOMFECHAS)            
            Group by Codigo,Nombre 
            Order by  Sum(Horas) Desc`, function (error2, results2, fields2) {
      if (error || error2) {
        console.log(error)
        return res.status(500)
      }
      res.json({
        notWork: results,
        work: results2
      })
    })
  })
})
app.listen(3006, () => {
  console.log('Server Listen on port 3006')
})
