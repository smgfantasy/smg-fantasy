import React from 'react';

const RatingChild = ({ statistic, value }) => {
    return (
        <div className='w-full border-t border-gray-200 py-2'>
            <div className='flex justify-between'>
                <span className='text-purple'>{statistic}</span>
                <span className='text-purple'>{value}</span>
            </div>
        </div>
    );
}

const Rating = () => {
    return (
        <div className='px-1'>
            <div style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 20px, rgba(255, 255, 255, 0.5) 50px, white 80px), url(https://fantasy.premierleague.com/static/media/pattern-2-crop-90.0e86ae39.png), linear-gradient(to right, rgb(2, 239, 255), rgb(98, 123, 255))', backgroundSize: 'auto, 90px 60px, auto', backgroundRepeat: 'no-repeat', backgroundPosition: '0px center, right top, 0px center' }} className='mt-10 w-full bg-[#2C3E50] h-[650px] rounded-md'>
                <div className='flex justify-between px-2 py-4'>
                    <div className='flex flex-col'>
                        <div className='text-sm text-purple'>Atanas Filipov</div>
                        <div className='text-2xl font-bold text-purple'>Pergisha FC</div>
                    </div>
                    <div>
                        <img className='max-w-[55px]' src='https://upload.wikimedia.org/wikipedia/commons/8/8a/Flag_of_Bulgaria.png' />
                    </div>
                </div>
                <div className='px-2'>
                    <div className='w-full border-t border-gray-200'>
                        <span className='bg-purple px-4 py-1 rounded-b-xl '>
                            <span style={{ backgroundImage: 'linear-gradient(to right, rgb(5, 240, 255), rgb(0, 255, 135))', backgroundClip: 'text' }}
                                className='text-sm font-bold text-transparent'>Points/Rankings</span>
                        </span>
                    </div>
                    <RatingChild statistic={'Overall points'} value={'688'} />
                    <RatingChild statistic={'Overall rank'} value={'4,424,969'} />
                    <RatingChild statistic={'Total players'} value={'10,851,286'} />
                    <RatingChild statistic={'Gameweek points'} value={'57'} />
                </div>
            </div>
        </div >
    )
}

export default Rating;