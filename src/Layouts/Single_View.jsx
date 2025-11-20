import React, { useEffect, useState } from 'react'
import "../App.css"
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'

const Single_View = () => {
  
  const {empId} = useParams()
  const [showData , setShowData] = useState()
  
  async function ApiGet(){
    const res = await axios.get(`https://6908d27a2d902d0651b1d4c4.mockapi.io/api/Data/${empId}`)
    console.table(res.data)
    setShowData(res.data)
  }

  useEffect(()=>{
    ApiGet()
  },[empId]) // When ever empId get to us it will (ApiGet) call 

  return (
    <>

    <div className='single_view_main_div'>
         <div className="employee-card">

        <div>
            <img src={showData?.employ_photo} className='w-100' alt="" srcSet="" />
        </div>

      <h2 className="employee-name pt-3">{showData?.name}</h2>
      <p className="employee-role">{showData?.role} </p>

      <div className="employee-details">
        <div className="detail">
          <span className="label">ID:</span>
          <span className="value">employee.id</span>
        </div>
        <div className="detail">
          <span className="label">Status:</span>
          <span className="value">{showData?.Status}</span>
        </div>
        <div className="detail">
          <span className="label">Phone:</span>
          <span className="value">{showData?.salary}<span className='text-danger'>$</span></span>
        </div>
        <div className="detail">
          <span className="label">Location:</span>
          <span className="value">employee.location </span>
        </div>
      </div>
    </div>

    <div className='text-center pt-5'>
             <NavLink to={"/"} className="btn bg-secondary text-white">Data-Table</NavLink>
    </div>

    </div>
       


    </>
  )
}

export default Single_View