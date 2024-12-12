const createNewUser = async (uid, name, clubName, email, creationDate) => {

    await fetch(`/api/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, name, clubName, email, creationDate })
    })
}

export default createNewUser;