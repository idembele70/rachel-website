
const getTotalQuantity  =(colors)=> {
  return colors?.reduce(
    (somme, {details})=>{
      const detailsSomme = details?.reduce(
        (dSomme,{quantity})=>dSomme+quantity,0
      )
      return somme + detailsSomme
    }, 0
  )
}

export {
  getTotalQuantity
}
