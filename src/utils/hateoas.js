export const hateoasstructure = (joyas) => {
  let totalJoyas = 0
  let totalStock = 0

  const results = joyas.map((element) => {
    totalJoyas += 1
    totalStock += element.stock
    return {
      name: element.nombre,
      href: `/joyas/joya/${element.id}`
    }
  })

  return {
    totalJoyas,
    totalStock,
    results
  }
}
