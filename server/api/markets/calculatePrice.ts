export default defineEventHandler(async (event) => {
  const { templateId, gpuCount, rentalDurationHours } = getQuery(event)

  const payload = {
    templateId,
    gpuCount,
    rentalDurationHours
  }

  return await myFetch('/client/package/templates/calculatePrice', {

    params: payload
  })

})
