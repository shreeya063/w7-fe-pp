import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditJobPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);

    const [title, setTitle] = useState("");
    const [type, setType] = useState("Full-Time");
    const [description, setDescription] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const user= JSON.parse(localStorage.getItem("user"));
  const token = user? user.token: null;

    const updateJob= async (job) =>{
        try{
            const res = await fetch(`/api/jobs/${id}`,{
                method:"PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
                body: JSON.stringify(job),
            });
            if (!res.ok){ 
                throw new Error("Failed to update job")
            }
            return res.ok;
        } catch(err){
            console.error("Error updating job:",err)
        }
    }

    useEffect(() => {
        const fetchJob = async() => {
            try{
                const res = await fetch(`/api/jobs/${id}`);
                if (!res.ok){
                    throw new Error ("Failed to fetch job");
                }
                const data = await res.json();
                setJob(data)
                setTitle(data.title);
                setType(data.type);
                setDescription(data.description);
                setCompany(data.company.name);
                setEmail(data.company.contactEmail);
                setPhone(data.company.contactPhone);
            } catch (error){
                console.log("Failed to fetch job", error) 
                }
            }
            fetchJob()
        },[id])

  const submitForm = async (e) => {
    e.preventDefault();
    const updatedJob = {
      title,
      type,
      description,
      company: {
        name: company,
        contactEmail: email,
        contactPhone: phone
      }
    };
    const success = await updateJob(updatedJob);
    if (success) {
      navigate(`/jobs/${id}`);
    } else {
    }
  };
  return (
    <div className="create">
      <h2>Edit Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <label>Job type:</label>
        <select 
        id = "type"
        value = {type}
        onChange ={(e)=> setType(e.target.value)}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          required
          value={description}
          onChange={(e)=>setDescription(e.target.value)}

        ></textarea>
        <label>Company Name:</label>
        <input
          type="text"
          required
          value={company}
          onChange={(e)=>setCompany(e.target.value)}
        />
        <label>Contact Email:</label>
        <input
          type="text"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <label>Contact Phone:</label>
        <input
          type="text"
          required
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
        />
        <button type="submit">Update Job</button>
      </form>
    </div>
  )
}

export default EditJobPage;