async function updateUserTeam(sessionCookie, players) {
    try {
        // Send a PUT request to the API endpoint with the players data
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/team`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Cookie: `session=${sessionCookie.value}`,
            },
            body: JSON.stringify({ players }), // Pass the players array in the body
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to update team:", error);
        return null;
    }
}

export default updateUserTeam;
