import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'


const AddForm = () => {

    const navigate = useNavigate()

    // fixed: error → errors
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [store, useStore] = useState([])
    const { empId } = useParams()

    async function showApi() {
        try {
            await axios.get(`https://6908d27a2d902d0651b1d4c4.mockapi.io/api/Data`);
        } catch (err) {
            console.error("Error fetching API:", err.message);
            alert("Unable to fetch data. Please check your internet or API URL.");
        }
    }

    useEffect(() => { showApi() }, [])

    async function AddData(data) {
        if (empId == null) {
            await axios.post(`https://6908d27a2d902d0651b1d4c4.mockapi.io/api/Data`, data)

            reset()
            showApi()

            Swal.fire({
                icon: "success",
                title: "New Employee Added!",
                text: "Employee successfully added! ✅",
                timer: 1800,
                showConfirmButton: false,
            });

        } else {
            await axios.put(`https://6908d27a2d902d0651b1d4c4.mockapi.io/api/Data/${empId}`, data)

            showApi()

            Swal.fire({
                icon: "success",
                title: "Employee Updated!",
                text: "Employee data updated successfully!",
                timer: 1800,
                showConfirmButton: false,
            });

            reset()
        }

        navigate("/")
    }

    async function update() {
        if (!empId) return;
        const res = await axios.get(`https://6908d27a2d902d0651b1d4c4.mockapi.io/api/Data/${empId}`)
        reset(res.data)
    }

    useEffect(() => { update() }, [])



    return (
        <div className="form-container">
            <div className="form-wrapper">
                <form className="premium-form" onSubmit={handleSubmit(AddData)}>
                    <h1 className="form-title">{empId ? "Update Employee" : "Add Employee"}</h1>

                    {/* CATEGORY */}
                    <div className="form-group">
                        <label>Task Category</label>
                        <select className="form-select"
                            {...register("role", { required: "Please select a category." })}>
                            <option value="">Select Task Category</option>
                            <option value="Sales">Sales</option>
                            <option value="Accounts">Accounts</option>
                            <option value="Data-Entry">Data Entry</option>
                        </select>
                        {errors.role && <p className="error-text">{errors.role.message}</p>}
                    </div>

                    {/* EMPLOYEE NAME */}
                    <div className="form-group">
                        <label>Employee Name</label>
                        <input type="text"
                            placeholder="Enter Employee Name"
                            className="form-input"
                            {...register("name", { required: "Name is required." })}
                        />
                        {errors.name && <p className="error-text">{errors.name.message}</p>}
                    </div>

                    {/* PHOTO URL */}
                    <div className="form-group">
                        <label>Profile Logo</label>
                        <input type="url"
                            placeholder="Enter Image URL"
                            className="form-input"
                            {...register("employ_photo", { required: "Photo URL is required." })}
                        />
                        {errors.employ_photo && <p className="error-text">{errors.employ_photo.message}</p>}
                    </div>

                    {/* JOIN DATE */}
                    <div className="form-group">
                        <label>Join Date</label>
                        <input type="date"
                            className="form-input"
                            {...register("join_date", { required: "Join date is required." })}
                        />
                        {errors.join_date && <p className="error-text">{errors.join_date.message}</p>}
                    </div>

                    {/* STATUS */}
                    <div className="form-group">
                        <label>Status</label>
                        <select className="form-select"
                            {...register("Status", { required: "Please select status." })}>
                            <option value="">Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        {errors.Status && <p className="error-text">{errors.Status.message}</p>}
                    </div>

                    {/* SALARY */}
                    <div className="form-group">
                        <label>Salary</label>
                        <input type="number"
                            placeholder="Enter Salary"
                            className="form-input"
                            {...register("salary", { required: "Salary is required." })}
                        />
                        {errors.salary && <p className="error-text">{errors.salary.message}</p>}
                    </div>

                    <div className="form-group">
                        <button className="submit-btn" type="submit">
                            {empId ? "Update" : "Add ✅"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddForm
