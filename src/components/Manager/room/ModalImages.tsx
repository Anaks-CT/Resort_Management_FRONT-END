import React, { useState } from 'react'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { RxCross1 } from 'react-icons/rx'

type props = {
    images: string[]
    roomName: string
    closeModal: () => void
}



function ModalImages({images , roomName, closeModal} : props) {

    const [number, setNumber] = useState(0)
    const incrementNumber = () => number === images.length - 1 ? setNumber(0) : setNumber(number + 1)
    const decrementNumber = () => number === 0 ? setNumber(images.length - 1) : setNumber(number - 1)

  return (
    <div className='w-full flex justify-center '>
        <div className=' bg-white flex flex-col mt-52 lg:mt-36 md:mt-20 py-5 h-auto relative w-full lg:w-1/2 lg:px-10 border-premium border-4'>
            <RxCross1 className='absolute lg:top-6 top-7 text-sm lg:text-2xl cursor-pointer' onClick={closeModal}/>
            <AiFillCaretLeft className='absolute top-1/2 lg:text-xl text-white cursor-pointer lg:left-2 lg:text-black' onClick={decrementNumber}/> 
            <AiFillCaretRight className='absolute top-1/2 lg:text-xl right-0 text-white cursor-pointer lg:right-2 lg:text-black' onClick={incrementNumber}/> 
            <div className='text-center mb-6 text-2xl tracking-wide px-5 text-premium'>{roomName}</div>
            <img src={images[number]} alt="" />
        </div>
    </div>
  )
}

export default ModalImages