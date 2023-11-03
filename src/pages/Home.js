import Navbar from "../components/Navbar";


const Home = () => {
    return (
        <div className="lg:overflow-y-hidden max-h-screen">
            <Navbar/>
            <div className='h-[90vh] w-screen max-w-full grid grid-cols-2 grid-rows-2 items-center justify-items-center bg-base-200'>
                <div className='h-[90%] w-[90%] bg-black rounded-xl'></div>
                <div className='h-[90%] w-[90%] bg-black rounded-xl'></div>
                <div className='h-[90%] w-[90%] bg-black rounded-xl'></div>
                <div className='h-[90%] w-[90%] bg-black rounded-xl'></div>
            </div>
        </div>
    )
}

export default Home;