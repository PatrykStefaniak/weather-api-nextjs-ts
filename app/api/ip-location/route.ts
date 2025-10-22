export async function GET(request: Request) {
    const headers = request.headers;
    const ipFromXff = headers.get('x-forwarded-for')?.split(',')[0].trim();
    let clientIp =
        ipFromXff
        || headers.get('x-real-ip')
        || headers.get('cf-connecting-ip')
        || headers.get('x-vercel-forwarded-for')
        || headers.get('true-client-ip')
        || null;

    if (!clientIp || !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(clientIp)) { // Dev environment fallback
        const response = await fetch('https://api.ipify.org/?format=json');
        const data = await response.json();

        if (!response.ok) {
            return Response.json(
                data,
                {status: response.status},
            );
        }

        clientIp = data.ip;
    }

    const response = await fetch(
        `http://api.weatherapi.com/v1/ip.json?key=${process.env.API_KEY}&q=${clientIp}`
    );

    const data = await response.json();

    if (!response.ok) {
        return Response.json(
            data,
            {status: response.status},
        );
    }

    return Response.json(data);
};