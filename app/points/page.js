import Points from "@/components/Points";
import Rating from "@/components/Rating";
import PlayerInfoMenu from "@/components/PlayerInfoMenu";
import { cookies } from "next/headers";

export default async function Home() {

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    return (
        // <Navbar />
        <>
            <Points sessionCookie={sessionCookie} />
            <Rating />
            <PlayerInfoMenu currVariant={"points"} />
        </>
    );
}
