import express from 'express'
import cors from 'cors'

import { logServer } from './middlewares/logServer.js'
import { findAll, findFiltered } from './models/joyas.models.js'
import { hateoasstructure } from '../utils/hateoas.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

app.use(logServer)

app.get('/joyas', async (req, res) => {
  try {
    const result = await findAll(req.query)
    const HATEOAS = hateoasstructure(result)
    res.status(200).json(HATEOAS)
  } catch (error) {
    res.status(500).json({ status: false, message: `Ha ocurrido un error, código: ${error.message.code}` })
  }
})

app.get('/joyas/filtros', async (req, res) => {
  try {
    const result = await findFiltered(req.query)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ status: false, message: `Ha ocurrido un error, código: ${error.message.code}` })
  }
})

app.listen(PORT, () => console.log(`Servidor funcionando en puerto: ${PORT}`))

export default app
