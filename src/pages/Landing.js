import Navbar from "../components/Navbar"
import LandingHero from "../components/LandingHero"

const Landing = () => {
    return (
        <div className='max-h-screen overflow-y-hidden'>
            <Navbar/>
            <LandingHero/>
        </div>
    )
}

export default Landing