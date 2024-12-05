import React from 'react';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, ArrowDown } from 'lucide-react';

const Header = () => {
    return (
        <>
            <div className='flex justify-between px-2 pt-3 pb-1 items-center'>
                <div className='py-1 px-3 bg-[#ffffff99] rounded-xl'>
                    <ArrowLeftCircleIcon size={20} />
                </div>
                <div className='font-bold text-purple'>Gameweek 12</div>
                <div className='py-1 px-3 bg-[#ffffff99] rounded-xl'>
                    <ArrowRightCircleIcon size={20} />
                </div>
            </div>
            <div className='h-px w-full' style={{ backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)' }}></div>
            <div className='my-3 text-center text-purple text-sm'>All times are shown in your <b>local time</b></div>
        </>
    );
}
const page = () => {
    return (
        <div className='pt-8 px-1'>
            <h1 className='font-bold text-xl text-purple text-center'>Fixtures & Results</h1>
            <div style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 60px, rgba(255, 255, 255, 0.5) 150px, white 240px), url(https://fantasy.premierleague.com/static/media/pattern-2-crop-90.0e86ae39.png), linear-gradient(to right, rgb(2, 239, 255), rgb(98, 123, 255))', backgroundSize: 'auto, 90px 60px, auto', backgroundRepeat: 'no-repeat', backgroundPosition: '0px center, right top, 0px center' }} className='mt-10 w-full bg-[#2C3E50] h-[650px] rounded-md'>
                <Header />
                <div className='flex justify-center'>
                    <span className='bg-purple px-4 py-1 rounded-b-xl'>
                        <span style={{ backgroundImage: 'linear-gradient(to right, rgb(5, 240, 255), rgb(0, 255, 135))', backgroundClip: 'text' }}
                            className='text-sm font-bold text-transparent'>
                            Tuesday 3 December 2024
                        </span>
                    </span>
                </div>
                <div className='flex flex-col'>
                    <div className='flex'>
                        <div className='border-b border-[#37003c]'></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default page;