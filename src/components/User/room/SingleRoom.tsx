import React, { useState } from 'react'
import { AiOutlineCaretDown } from 'react-icons/ai'
import { BsPeopleFill } from 'react-icons/bs'
import { TbArrowsMove, TbSquareRounded } from 'react-icons/tb'
import RoomDetails from './RoomDetails'
import Button from '../../UI/Button'
import TransitionsModal from '../../UI/Modal'
import ModalImages from '../../UI/ModalImages'

type props = {
    roomDetail: any
    startingPrice: number
    handleViewRateToggle: () => void
    setCurrentRoomDetails: React.Dispatch<any>
}

function SingleRoomType({ roomDetail, startingPrice, handleViewRateToggle, setCurrentRoomDetails}:props) {
  const [viewDetails, setViewDetails] = useState(false);
  const toggleRoomDetails = () => setViewDetails(!viewDetails)

  const [open, setOpen] = useState(false)
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)
  return (
    <div className="p-6 bg-white mb-14">
        <TransitionsModal
          modalForm={() => <ModalImages closeModal={closeModal} images={roomDetail.images} heading={roomDetail.name}/>}
          open={open}
          openModal={openModal}
          closeModal={closeModal}
          noBorder
        />
            <div className="lg:flex items-start justify-between rounded-sm gap-3">
              <div className='lg:max-w-[250px] lg:w-1/3 md:py-6 '>
                <img
                  className="object-contain rounded-lg cursor-pointer"
                  src={roomDetail.images[0]}
                  alt=""
                  onClick={openModal}
                />
              </div>
              <div className='lg:w-1/3'>
                <div className="py-6">
                  <span className="text-2xl ">
                    {roomDetail.name}
                  </span>
                </div>
                <div className="font-sans text-sm ">
                  {roomDetail.description}
                </div>
                <div className="py-5 flex gap-7">
                  <div className="flex items-center gap-1">
                    <TbArrowsMove className="text-3xl" />
                    <span>{roomDetail.area} m2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BsPeopleFill className="text-2xl" />
                    <span>Sleeps {roomDetail.maxPeople}</span>
                  </div>
                </div>
                <div className="pb-8">
                  <div
                    onClick={toggleRoomDetails}
                    className="text-premium cursor-pointer flex items-center gap-2"
                  >
                    {!viewDetails ? "VIEW DETAILS" : "HIDE DETAILS"}
                    <AiOutlineCaretDown />
                  </div>
                  {viewDetails && (
                    <div className="py-5 border-y mt-8 block lg:hidden">
                      <RoomDetails amenities={roomDetail.amenities} facilities={roomDetail.facilities} highlights={roomDetail.highlights} />
                    </div>
                  )}
                </div>
              </div>
              <div className="">
                <div className="flex p-2 flex-col items-center gap-2 md:p-7">
                  <p className="text-premium font-sans tracking-wide whitespace-nowrap">
                    STARTING FROM
                  </p>
                  <div className="flex gap-4 items-center">
                    <div className="font-sans">INR</div>
                    <div className="text-4xl">{startingPrice.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="text-xs">exc. taxes and fees</div>
                </div>
                <Button class="w-full  my-5 text-sm" color="premium" onClick={() => {handleViewRateToggle(); setCurrentRoomDetails(roomDetail)}}>
                  SHOW RATES
                </Button>
              </div>
            </div>
            {viewDetails && (
              <div className="py-5 border-y hidden lg:block">
                <RoomDetails amenities={roomDetail.amenities} facilities={roomDetail.facilities} highlights={roomDetail.highlights} />
              </div>
            )}
          </div>

  )
}

export default SingleRoomType