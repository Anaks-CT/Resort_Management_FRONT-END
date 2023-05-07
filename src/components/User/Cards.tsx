import React from 'react'
import { TbDiamondFilled } from "react-icons/tb";
import Button from '../UI/Button';
import { useDispatch } from 'react-redux';
import { updateCurrentResort } from '../../store/slices/currentResortUserSlice';
import { IResort } from '../../interface/resort.interface';
import { useNavigate } from 'react-router-dom';

type props = {
    image?: string,
    heading?: string,
    description?: string,
    features?: string[]
    resortDetails? : IResort
}

function Cards({image, heading, description, features, resortDetails}: props) {
    const featuresListing = features?.map(item => (
        <div key={item} className=' flex gap-3'>
            <TbDiamondFilled className='text-white my-auto' />
            <p className='mb-3 text-white'>{item}</p>
        </div>
    ))
    const dispatch = useDispatch()
    const navigate = useNavigate()
  return (
    <div className='bg-[#222020] w-[308px]'>
        <div className='bg-red-100 h-[190px]'>
            <img className='object-cover w-[308px] h-[190px]' src={image} alt="" />
        </div>
        <div className='p-3 md:p-7'>
            <h1 className='text-white text-2xl tracking-wide'>{heading}</h1>
            <p className='text-white text-sm font-sans tracking-wider mt-5 mb-8'>{description}</p>
            {featuresListing}
            <div className='flex justify-center'>
                <Button class='mt-6 px-7' color='transparent' outline 
                onClick={() =>
                    {dispatch(updateCurrentResort({resortId: resortDetails?._id, resortName: resortDetails?.resortDetails.name}))
                    navigate(`/${resortDetails?.resortDetails.name}`, {
                      state: { resortDetails: resortDetails },
                    })}
                  }
                >DISCOVER MORE</Button>
            </div>
        </div>
    </div>
  )
}

export default Cards