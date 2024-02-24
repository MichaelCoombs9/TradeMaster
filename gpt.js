

export default async function fetchGPTResponse(formData) {
    const response = await fetch('http://localhost:3000/api/gpt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
}

