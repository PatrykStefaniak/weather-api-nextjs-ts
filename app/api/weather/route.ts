export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const api = searchParams.get('api');
    const q = searchParams.get('q');

    if (!api) {
        return Response.json({ error: 'Api name required' }, { status: 400 });
    }

    searchParams.delete('type');

    const response = await fetch(
        `http://api.weatherapi.com/v1/${api}.json?key=${process.env.API_KEY}&${searchParams.toString()}`
    );

    if (!response.ok) {
        return Response.json({ error: 'Failed to fetch weather' }, { status: response.status });
    }

    const data = await response.json();
    return Response.json(data);
}