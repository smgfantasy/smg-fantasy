const getUserMadeTransfers = async (sessionCookie) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/get-user-transfers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: `session=${sessionCookie.value}`,
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (data.error) {
            console.error("Error from API:", data.error);
            return null;
        }

        return data.madeTransfers ?? 0;
    } catch (error) {
        console.error("Failed to fetch madeTransfers:", error);
        return null;
    }
}

export default getUserMadeTransfers;
