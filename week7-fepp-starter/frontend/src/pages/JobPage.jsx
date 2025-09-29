import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditJobPage from './EditJobPage';


const JobPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);

useEffect(()=>{
        const fetchJob = async() => {
            try{
        const res = await fetch(`/api/jobs/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"},
        });
        if (!res.ok){
            throw new Error ("Failed to fetch job");
        }
        const job = await res.json();
        setJob(job)}
        catch(err){
            console.log("Error fetching data", err);
        }
            };
        fetchJob();
        },[id]);

        const deleteJob = async()=>{
        
            try{
                const res = await fetch(`/api/jobs/${id}`, {
            method: "DELETE",
            headers: {"Content-Type" : "application/json"}
            })
            if(!res.ok){
                throw new Error("failed to fetch to delete");
            }
            console.log("Job deleted");
            navigate("/");
            
        } catch(err){
            console.error("Error deleting", err);
        }
        }


          if (!job) {
    return <div>Loading...</div>;
  }
  return (
        <div className="job-view">
        <h2>{job.title}</h2>
        <p>Type: {job.type}</p>
        <p>Description: {job.description}</p>
        <p>Company: {job.company.name}</p>
        <p>Email: {job.company.contactEmail}</p>
        <p>Phone: {job.company.contactPhone}</p>
        <button onClick={deleteJob}>Delete Job</button>
        <button onClick={() => navigate(`/edit-job/${id}`) }>Edit Job</button>
    </div>
  )
}

export default JobPage