export default async () => {
  try {
    const query = `query {
                    todoCollection(first: 100) {
                      edges {
                        node {
                          id
                          complete
                          title
                        }
                      }
                    }
}`
    const url = 'http://127.0.0.1:4000/graphql'
    const response = await fetch(url, {
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
