export default eventHandler(async (event) => {
    const { slug } = getRouterParams(event)
    const page = await queryCollection(event, 'docs').path(`/docs/${slug}`).first()
    return page
  })
  