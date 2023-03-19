import React from 'react'

function Contact() {
  return (
    <>
        <div className='flex flex-col justify-center items-center lg:mb-20 mb-10'>
            <h2 className="text-white font-sans tracking-wide mb-2">CONTACT</h2>
            <h1>Get in touch</h1>
        </div>
        <div className='lg:grid grid-cols-3'>
            <div className='p-6 flex flex-col items-center'>
                <h2 className="text-white font-sans tracking-wide mb-6">ADDRESS</h2>
                <p className="text-slate-600 text-[10px] lg:text-sm text-center">Trinity St - somewhere PO Box 575211 somewhere , India</p>
            </div>
            <div className='p-6 flex flex-col items-center lg:border-l lg:border-r border-l-0 border-r-0 border-b border-t lg:border-t-0 lg:border-b-0 lg:pb-20'>
                <h2 className="text-white font-sans tracking-wide mb-6">EMAIL</h2>
                <p className="text-slate-600 text-[10px] lg:text-sm">anaksthayyil30@gmail.com</p>
            </div>
            <div className='p-6 flex flex-col items-center'>
                <h2 className="text-white font-sans tracking-wide mb-6">TELEPHONE</h2>
                <p className="text-slate-600 text-[10px] lg:text-sm">7356325985</p>
            </div>
        </div>
    </>
  )
}

export default Contact