import Points from "@/components/Points";
import Rating from "@/components/Rating";
import PlayerInfoMenu from "@/components/PlayerInfoMenu";
import { cookies } from "next/headers";
import { getUserData } from "@/utils/user/getUserData";

export default async function Home() {

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    const userData = await getUserData(sessionCookie);
    return (
        <>
            <Points userData={userData} sessionCookie={sessionCookie} />
            <Rating userData={userData} />
            <PlayerInfoMenu currVariant={"points"} />
        </>
    );
}
