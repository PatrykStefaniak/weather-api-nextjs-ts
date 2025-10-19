export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const api = searchParams.get('api');

    if (!api) {
        return Response.json({ error: 'Api name required' }, { status: 400 });
    }

    searchParams.delete('type');

    const response = await fetch(
        `http://api.weatherapi.com/v1/${api}.json?key=${process.env.API_KEY}&${searchParams.toString()}`
    );

    const data = await response.json();

    if (!response.ok) {
        return Response.json(
            data,
            {status: response.status},
        );
    }

    return Response.json(data);
}