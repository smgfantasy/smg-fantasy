export async function getUserData(sessionCookie) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: `session=${sessionCookie.value}`,
            },
        });
        // Check if the response status is ok (200)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "An error occurred while fetching data");
        }

        // Parse the JSON response
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user team data:", error);
        throw error; // Re-throw the error for further handling if needed
    }
}
