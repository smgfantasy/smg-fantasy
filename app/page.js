import Points from "@/components/Points";
import Rating from "@/components/Rating";
import PlayerInfoMenu from "@/components/PlayerInfoMenu";

export default function Home() {
    return (
        // <Navbar />
        <>
            <Points />
            <Rating />
            <PlayerInfoMenu currVariant={"points"} />
        </>
    );
}
