const getSpectatedUser = async (uid) => {
    if (!uid) {
        console.error("UID is required to fetch user data.");
        return null;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/get-spectated-user?uid=${uid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching user data:", errorData.error);
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

export default getSpectatedUser;