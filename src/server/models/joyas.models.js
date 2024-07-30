import db from '../database/db_connect.js'
import format from 'pg-format'

export const findAll = async ({ limits = 10, page = 1, order_by = 'precio_DESC' }) => {
  const query = 'SELECT * FROM inventario'

  const [column, sort] = order_by.split('_')
  const offset = Math.abs(page > 0 ? page - 1 : 0) * limits
  const formatedQuey = format(`${query} ORDER BY %s %s LIMIT %s OFFSET %s;`, column, sort, limits, offset)
  return await db(formatedQuey)
}

export const findFiltered = async ({ precioMin, precioMax, categoria, metal }) => {
  let query = 'SELECT * FROM inventario'
  const filters = []
  const values = []

  if (precioMin) {
    values.push(precioMin)
    filters.push(`precio > $${values.length}`)
  }

  if (precioMax) {
    values.push(precioMax)
    filters.push(`precio < $${values.length}`)
  }

  if (categoria) {
    values.push(categoria)
    filters.push(`categoria = $${values.length}`)
  }

  if (metal) {
    values.push(metal)
    filters.push(`metal = $${values.length}`)
  }

  if (filters.length > 0) {
    query += ` WHERE ${filters.join(' AND ')}`
  }

  return await db(query, values)
}
