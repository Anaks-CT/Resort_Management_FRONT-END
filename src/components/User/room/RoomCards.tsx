import React from 'react'
import { TbDiamondFilled } from "react-icons/tb";
import Button from '../../UI/Button';
import { useNavigate } from 'react-router-dom';

type props = any

export default function RoomCards({image, roomName, description, facilities}: props) {
    const navigate = useNavigate()
    const facilitiesListing = facilities?.slice(0, 3).map((item: any) => (
        <div key={item} className=' flex gap-3'>
            <div><TbDiamondFilled className='text-white my-auto mt-1' /></div>
            <div><p className='mb-3 text-white text-sm md:text-md'>{item}</p></div>
        </div>
    ))
  return (
    <div className='bg-[#222020] w-[308px] h-[650px] md:h-[700px] relative'>
        <div className='bg-red-100 h-[190px]'>
            <img className='object-cover w-[308px] h-[190px]' src={image} alt="" />
        </div>
        <div className='p-8 h-full absolute w-full top-0 pt-[210px] flex flex-col justify-between'>
            <h1 className='text-white text-xl md:text-2xl tracking-wide text-center'>{roomName}</h1>
            <h2 className='text-white text-xs md:text-sm font-extralight tracking-wider mt-5 mb-8'>{description}</h2>
            <div>{facilitiesListing}</div>
            <div className='flex justify-center text-center'>
                <Button class='mt-6 px-7' color='transparent' onClick={() => navigate('/booking/explore')} outline>Book Now</Button>
            </div>
        </div>
    </div>
  )
}