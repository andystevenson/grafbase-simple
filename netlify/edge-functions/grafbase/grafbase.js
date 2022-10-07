export default async (request) => {
  try {
    const url = new URL(request.url)
    const query = url.searchParams.get('query')

    const grafbase =
      url.hostname === 'localhost'
        ? 'http://127.0.0.1:4000/graphql'
        : `${url.origin}/graphql`

    const response = await fetch(grafbase, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    if (response.ok) {
      const json = await response.json()
      return new Response(JSON.stringify(json), {
        headers: { 'content-type': 'application/json' },
      })
    }

    return new Response(
      JSON.stringify({ message: 'nothing good has happened' }),
      { status: response.status, statusText: response.statusText },
    )
  } catch (error) {
    console.error(error.message)
  }
}
