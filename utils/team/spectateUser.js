async function spectateUser(uid) {
    try {


        // Append the UID to the URL as a query parameter
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/spectate?uid=${uid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        return null;
    }
}

export default spectateUser;
