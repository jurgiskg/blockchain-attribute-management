const estimatePrices = (instance, userAccount, serviceAccount, attributeId, attributeValue) => {
  instance.grantAccess.estimateGas(attributeId, serviceAccount, true, attributeValue).then((result) => {
    console.log(`grantAccess(${attributeId}, ${serviceAccount}, true, ${attributeValue}): ${result}`)
  })
  instance.removeAccess.estimateGas(attributeId, serviceAccount).then((result) => {
    console.log(`removeAccess(${attributeId}, ${serviceAccount}): ${result}`)
  })
  instance.getAttribute.estimateGas(attributeId, userAccount, serviceAccount).then((result) => {
    console.log(`getAttribute(${attributeId}, ${userAccount}, ${serviceAccount}): ${result}`)
  })
  instance.requestAccess.estimateGas(attributeId, userAccount).then((result) => {
    console.log(`requestAccess(${attributeId}, ${userAccount}): ${result}`);
  })
}

export { estimatePrices };