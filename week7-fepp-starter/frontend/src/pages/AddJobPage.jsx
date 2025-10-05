import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-Time");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");


  const user= JSON.parse(localStorage.getItem("user"));
  const token = user? user.token: null;

  const navigate = useNavigate();
  
    const submitForm = async(e) => {
      e.preventDefault();

      const newJob= { title, type, description, company :{
        name: company,
        contactEmail: email,
        contactPhone: phone
      }}
      //console.log("submitForm called");
      //return;
      const addJob = async (job) => {
        const response = await fetch('/api/jobs', 
        {method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(job)
      });
      if (response.ok) {
        console.log('Job added successfully');
        navigate("/");
        
  } else{
    console.log("Error adding job");
  }

    }
    
    await addJob(newJob);
    console.log(newJob);
    
    };
      


  return (
    <div className="create">
      <h2>Add a New Job</h2>
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
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
