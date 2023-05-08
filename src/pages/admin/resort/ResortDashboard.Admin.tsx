import React from 'react'
import { useSelector } from 'react-redux';
import { IStore } from '../../../interface/slice.interface';



function ResortDashboard() {
  const resortName = useSelector((state: IStore) => state.resort.resortName)


  return (

      <h1 className="pt-20 font-normal tracking-wide text-5xl">{resortName.toUpperCase()} DASHBOARD</h1>

      
  )
}

export default ResortDashboard