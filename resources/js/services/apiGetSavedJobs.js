
export async function getSavedJobs() {
  try {
    const res = await fetch("http://localhost:5000/savedJobs");
    if (!res.ok) {
      throw new Error("Failed to fetch saved jobs");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Saved jobs could not be loaded");
  }
}

// Save a job (PUT/POST depending on your backend)
export async function putSavedJobs(job) {
  try {
    const res = await fetch("http://localhost:5000/savedJobs", {
      method: "POST", // use POST for adding new jobs
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });

    if (!res.ok) {
      throw new Error("Failed to save job");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Job could not be saved");
  }
}

// Delete a saved job
export async function deleteSavedJob(id) {
  try {
    const res = await fetch(`http://localhost:5000/savedJobs/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete job");
    }

    return true; // we don’t need data, just success
  } catch (error) {
    console.error(error);
    throw new Error("Job could not be deleted");
  }
}
