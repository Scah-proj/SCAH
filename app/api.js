const API_URL = process.env.NEXT_PUBLIC_API_URL;





export async function postRequest(endpoint, data, token = null ) {
    const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error('Network response was not ok');
    }

    return res.json();
}

