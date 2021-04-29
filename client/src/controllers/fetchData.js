/*
The following fetchWithTimeout() is an improved version of fetch() 
that creates requests with a configurable timeout
 */
async function fetchWithTimeout(resource, options) {
    const { timeout = 8000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(resource, {
        ...options,
        signal: controller.signal  
    });
    clearTimeout(id);

    return response;
}

async function fetchAPIData(url) {
    try {
        const response = await fetchWithTimeout(url, {
            timeout: 6000
        });
        const data = await response.json();
        return data;
    } catch (error) {
        // Timeouts if the request takes
        // longer than 6 seconds
        return {"status": "fail", "data": null};
    }
}

export default fetchAPIData;