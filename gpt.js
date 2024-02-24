export default async function fetchGPTResponse(formData) {
    // Point to your local server endpoint
    const localEndpoint = 'http://localhost:3000/api/gpt';

    console.log("Sending formData:", formData);
    
    const response = await fetch(localEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

 