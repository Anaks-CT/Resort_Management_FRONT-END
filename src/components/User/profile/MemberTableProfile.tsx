import rightArrow  from '../../../assets/icons/icons8-right-arrow-24 (2).png'
import { Iuser } from '../../../interface/user.interface'

type props ={
  userDetails?: Iuser
}

function MemberTableProfile({userDetails}: props) {
    const currrentStatusClassname = "bg-white bg-opacity-25 py-2 px-3 border"
    let moneyToSpend = 0
    if(userDetails && userDetails?.totalmoneySpent < 30000){
      moneyToSpend = 30000 - userDetails.totalmoneySpent
    }else if(userDetails && userDetails.totalmoneySpent < 100000){
      moneyToSpend = 100000 - userDetails.totalmoneySpent
    }
    let nextMemberType
    if(userDetails?.type==="member"){
      nextMemberType = "Platinum"      
    }else{
      nextMemberType = "Diamond"
    }
  return (
    <>
        <div className='text-center text-xs grid gap-1'>
            <div className='tracking-wider text-5xl lg:text-7xl font-sans'>{userDetails?.points}</div>
            <div className='tracking-[9px]'>POINTS</div>
            <div className='mt-2 lg:text-base'>You can Apply your points in your next booking</div>
        </div>
        <div className='flex text-xs justify-between lg:justify-center items-center mt-5 lg:gap-3'>
            <div className={`${userDetails?.type === "member" && currrentStatusClassname}`}>MEMBER</div>
            <div><img className='object-fill w-10 lg:w-20 h-6' src={rightArrow} alt="" /></div>
            <div className={`${userDetails?.type === "platinum" && currrentStatusClassname}`}>PLATINUM</div>
            <div><img className='object-fill w-10 lg:w-20 h-6' src={rightArrow} alt="" /></div>
            <div className={`${userDetails?.type === "diamond" && currrentStatusClassname}`}>DIAMOND</div>
        </div>
        {userDetails?.type !== "diamond" ? <div className='text-xs lg:text-base lg:text-center'>{`spend INR ${moneyToSpend} to become a ${nextMemberType} member and avail offers for rooms.`}</div> : (
          <div className='text-xs lg:text-base lg:text-center'>Thank you for being our trusted member, You can avail the lifetime membership card from our TRINITY !!</div>
        )}
    </>
  )
}

export default MemberTableProfile