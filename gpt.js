export default async function fetchGPTResponse(formData) {
    const response = await fetch('https://trade-master-9a80f6716536.herokuapp.com/api/gpt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
}

