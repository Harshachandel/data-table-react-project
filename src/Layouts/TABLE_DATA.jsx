import React, { useEffect, useState } from "react";
import "../App.css";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { FaEye, FaFilter, FaRegEye, FaTrash } from "react-icons/fa";
import { FaArrowDownLong, FaArrowUpLong, FaPenClip } from "react-icons/fa6";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import { MdEditDocument } from "react-icons/md";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Funnel } from "react-bootstrap-icons";
import { HiOutlineFunnel } from "react-icons/hi2";




export default function PremiumTable() {
  
  // States ::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const [sortOrder, setSortOrder] = useState("asc");  // default UP arrow
  
  const [updateId , setUpdateId] = useState()
  const [empDetails, setEmpDetails] = useState([])
  const [viewData,setViewData] = useState("")
  const {register , handleSubmit , reset} = useForm()
  const [search , setSearch] = useState("")
  const [roleState , setRoleUse] = useState("")
  const [priceStore , setPriceStore] = useState("")
  const [limit, setLimit] = useState("");

  // Api Calling ::::::::::::::::::::::::::::::::::::::::::::::::::::

  async function showApi() {
    try {
      const res = await axios.get(`https://6908d27a2d902d0651b1d4c4.mockapi.io/api/Data`);
      console.table(res.data)
      setEmpDetails(res.data)
    } catch (err) {
      console.error("Error fetching API:", err.message);
      alert("Unable to fetch data. Please check your internet or API URL.");
    }
  }

  useEffect(() => {
    showApi()
  }, [])


  // Delete Employees Data ::::::::::::::::::::::::::::::::::::::::::

  async function transh(id) {

    await axios.delete(`https://6908d27a2d902d0651b1d4c4.mockapi.io/api/Data/${id}`).then(() => {
      toast.success("🗑️Employee Data Deleted successfully!", {
        position: "top-center",
        autoClose: 1500,
        theme: "dark",
      });
      showApi() // refresh the data

    }).catch((err) => {
            console.log(err)
            toast.error("❌ Failed to delete task", {
                position: "top-center",
                autoClose: 1000,  
                theme: "dark",
            });
        })

  }

  //View on this page :::::::::::::::::::::::::::::::::::::::::::::::

  function view(id){
    const singleData = empDetails.find((ele)=> ele.id === id )
    setViewData(singleData)
  }
  
  //Update on this page ::::::::::::::::::::::::::::::::::::::::::
  
  async function getData(data){
      
      await axios.put(`https://6908d27a2d902d0651b1d4c4.mockapi.io/api/Data/${updateId}`,data)
      Swal.fire({
                  icon: "success",
                  title: "Employee Data Updated!",
                  text: "Your employee data was successfully updated ✅",
                  showConfirmButton: false,
                  timer: 1800,
                  timerProgressBar: true,
              });
      reset()
      showApi()
  }


  async function update(id){
    setUpdateId(id)
    const res = await axios.get(`https://6908d27a2d902d0651b1d4c4.mockapi.io/api/Data/${id}`)
    reset(res.data)
  }



  // Searching :::::::::::::::::::::::::::::::::::::::::::::::::::

  const filterData =  empDetails.filter((ele)=>{
    if(search == ""){
      return ele;
    }else{
      return ele.name.toLowerCase().includes(search.toLowerCase()) || ele.Status.toLowerCase().includes(search.toLowerCase());
    }
  })
  
  // Filtering :::::::::::::::::::::::::::::::::::::::::::::::::::

  .filter((ele)=>{
    return ele.role.includes(roleState)
  })
  
  //Sorting ::::::::::::::::::::::::::::::::::::::::::::::::::::::

  // .sort((a,b)=>{
  //   if(priceStore=="low"){
  //     return a.salary-b.salary;
  //   }else if(priceStore =="high"){
  //     return b.salary-a.salary
  //   }
  // })

  .sort((a, b) => {
  if (sortOrder === "asc") {
    return a.salary - b.salary; // ascending
  } else {
    return b.salary - a.salary; // descending
  }
})


  //Slicing ::::::::::::::::::::::::::::::::::::::::::::::::::::::

  .slice(0, limit ? Number(limit) : empDetails.length);

  return (

    <>

      {/* Searching , Sorting , Filtering , slicing */}

       <div className="top-bar-container">
      
      {/* Search */}
      <input
        type="text"
        className="search-input"
        placeholder="Search employee name or status..."
        onChange={(e)=>{setSearch(e.target.value)}}
      />

      {/* Slicing */}

      <input
  type="number"
  className="search-input"
  placeholder="Enter number of rows..."
  onChange={(e) => setLimit(e.target.value)}
/>

      {/* Filter */}
      <select className="filter-dropdown" onChange={(e)=>(setRoleUse(e.target.value))}>
        <option value="">Filter by Role </option>
        <option value={"Accounts"}>Accounts</option>
        <option value={"Data-Entry"}>Data-Entry</option>
        <option value={"Officer"}>Officer</option>
        <option value={"Engineer"}>Engineer</option>
        <option value={"Technician"}>Technician</option>
        <option value={"Sales"}>Sales</option>
      </select>

      {/* Sort */}
      <button
  className="sort-btn"
  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
>
  Salary Sort 
  {sortOrder === "asc" ? (
    <FaArrowDownLong size={20} className="ms-2" />
  ) : (
    <FaArrowUpLong size={20} className="ms-2" />
  )}
</button>


      {/* {priceStore === "low" && (
    <FaArrowUpLong className="sort-icon" size={20} />
  )}

  {priceStore === "high" && (
    <FaArrowDownLong className="sort-icon" size={20} />
  )} */}

  

    </div>



      {/* Data Table */}
      <div className="table-container">
        <h2 className="table-title ">TCS Employees Data Table </h2>
        <div className="responsive-table-wrapper">
          <table className="premium-table">
            <thead>
              <tr>
                <th>Name</th>
                {/* <th>Email</th> */}
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              
               {filterData.length === 0 ? (
    <tr>
      <td colSpan="6" className="text-center bg-dark text-white fs-5 p-3">
        No Data Found
      </td>
    </tr>
  ) : (
    filterData.map((item) => (
      // your existing <tr> code
      <tr key={item.id}>
                  <td data-label="Name">
                    <div className="user-cell">
                      <img src={item.employ_photo} alt="User Logo" className="user-logo" />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  {/* <td data-label="Email">{item.email}</td> */}
                  <td data-label="Role">{item.role}</td>
                  <td data-label="Status">
                    <span className={`status-badge ${item.Status.toLowerCase()}`}>
                      {item.Status}
                    </span>
                  </td>
                  <td data-label="Joined">{item.join_date}</td>
                  <td data-label="Joined">{item.salary}</td>

                  <td data-label="Action ">
                    <button className="action-btn me-2" onClick={() => { transh(item.id) }}><FaTrash size={18} /></button>
                    {/* <button className="action-btn me-3" ><MdPreview /></button> */}
                    <NavLink className="action-btn me-2" to={`/singleView/${item.id}`}><FiExternalLink size={18}/></NavLink>
                    <button className="action-btn me-2" onClick={() => {view(item.id)} } data-bs-toggle="modal" data-bs-target="#staticBackdrop"><FaEye size={18}/></button>
                    <NavLink to={`/addform/${item.id}`} className="action-btn me-2"><FaPenClip /></NavLink>
                    {/* <button className="action-btn "><MdEditDocument size={18} /></button> */}

                    <button type="button" className="action-btn me-2 " data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat" onClick={()=>{update(item.id)}}><MdEditDocument size={18} /></button>

                  </td>
                </tr>
    ))
  )}
              
              {/* // limit>limit.length ? <tr><th className="text-center bg-dark-subtle" colSpan="6">No Data</th></tr> : */}

              
            </tbody>
          </table>
        </div>
      </div>

      {/* Add new employees */}
      <div className="row mx-auto col-4 ">
        <div className="text-center">
          <NavLink className="btn btn-secondary w-50 " to={"/addform"}>ADD NEW EMPLOYEES</NavLink>
        </div>
      </div>

      <ToastContainer />

      {/* Modal {View on this Page} */}
<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5 " id="staticBackdropLabel">Employee Details</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body ">
          <div className="image-div-modal text-center">
            <img src={viewData.employ_photo} className="w-50 modal-image" alt="Profile Image" />
          </div>
          <h4 className="text-center pt-4">{viewData.name}</h4>
          <div className="p-3 mt-4 text-center text-bg-secondary-opacity custom-opacity-card text-body-emphasis">
            <span className="ps-5 pe-5 text-body-emphasis">Status : {viewData.Status}</span>
            <span className="pe-5">Role : {viewData.role}</span>
          </div>
          <div className="p-3 mt-1 text-center text-bg-secondary-opacity text-body-emphasis">
            <span className="ps-5 pe-5 text-body-emphasis">Joining Date : {viewData.join_date}</span>
          </div>
          <div>
            <h1 className="text-center ">{viewData.salary}<span className="text-danger">$</span> </h1>
          </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        {/* <button type="button" className="btn btn-primary">Understood</button> */}
      </div>
    </div>
  </div>
</div>

      {/* Edit on this Page  */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">New message</h1>``
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form className="premium-form" onSubmit={handleSubmit(getData)}>
          <h1 className="form-title">Update Employees Details</h1>

          <div className="form-group">
            <label className="form-label text-dark category-label">Task Category</label>
            <select className="form-select" {...register('role')}>
              <option value="">Select Task Category</option>
              <option value="Sales">Sales</option>
              <option value="Accounts">Accounts</option>
              <option value="Data-Entry">Data Entry</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label text-dark title-label">Employee Name </label>
            <input type="text" placeholder="Enter Employee Name" {...register('name')} className="form-control" />
          </div>

          <div className="form-group">
            <label className="form-label text-dark url-label">Profile Logo</label>
            <input type="url" placeholder="Enter Profile Image URL" {...register('employ_photo')}  className="form-control" />
          </div>

          <div className="form-group">
            <label className="form-label text-dark title-label">Join Date</label>
            <input type="date" placeholder="Enter Employee Name" {...register('join_date')} className="form-control" />
          </div>

          <div className="form-group">
            <label className="form-label text-dark category-label">Active / Inactive</label>
            <select className="form-select" {...register('Status')}>
              <option value="">Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">InActive</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label text-dark title-label">Salary </label>
            <input type="number" placeholder="Enter Employee Salary" {...register('salary')} className="form-control" />
          </div>


          {/* <div className="form-group">
            <label className="form-label description-label">Task Description</label>
            <textarea className="form-textarea" placeholder="Describe your task..."></textarea>
          </div> */}

          <div className="form-group">
            <button className="submit-btn" data-bs-dismiss="modal" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
      </div>
    </div>
  </div>
</div>

    </>
  );
}
