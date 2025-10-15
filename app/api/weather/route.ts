export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    if (!city) {
        return Response.json({ error: 'City is required' }, { status: 400 });
    }

    const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city}`
    );

    if (!response.ok) {
        return Response.json({ error: 'Failed to fetch weather' }, { status: response.status });
    }

    const data = await response.json();
    return Response.json(data);
}