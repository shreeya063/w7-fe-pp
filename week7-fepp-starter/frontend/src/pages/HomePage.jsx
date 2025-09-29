import JobListings from "../components/JobListings";
import {useEffect, useState} from "react";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  
  useEffect(() => {
    const fetchJobs= async () =>{
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(data);
  }
  fetchJobs();
},[]);

  return (
    <div className="home">
      <JobListings jobs={jobs} />
    </div>
  );
};

export default Home;
