export const ifContainCommonElement = (array1, array2) => {
  if (
    array1.some((val) => {
      return array2.includes(val)
    })
  )
    return true
  return false
}

export const ifArrayContains = (array, elem) => {
  if (
    array.some((val) => {
      return elem === val
    })
  )
    return true
  return false
}
