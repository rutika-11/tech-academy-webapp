import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

const API_URL = "https://tech-academy-api-blb0.onrender.com/api/courses";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    description: "",
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      setCourses(data);
      setError(null);
    } catch (err) {
      setError("Error loading courses. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create course");
      }

      setFormData({ title: "", duration: "", description: "" });
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
      
      // Refresh list
      fetchCourses();
    } catch (err) {
      setError("Error creating course.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete course");
      }

      // Refresh list
      fetchCourses();
    } catch (err) {
      setError("Error deleting course.");
      console.error(err);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your Tech Academy courses</p>
      </div>

      <div className="admin-content">
        <section className="form-section">
          <div className="card">
            <h2>Create New Course</h2>
            {submitSuccess && <div className="alert success">Course created successfully!</div>}
            {error && <div className="alert error">{error}</div>}
            
            <form onSubmit={handleCreateCourse}>
              <div className="form-group">
                <label htmlFor="title">Course Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Fullstack React"
                />
              </div>

              <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. 12 Weeks"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description (Optional)</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="What will students learn?"
                  rows="4"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Course"}
              </button>
            </form>
          </div>
        </section>

        <section className="list-section">
          <h2>All Courses</h2>
          
          {loading ? (
            <div className="loading-spinner">Loading courses...</div>
          ) : courses.length === 0 ? (
            <div className="empty-state">No courses found. Add one above!</div>
          ) : (
            <div className="course-grid">
              {courses.map((course) => (
                <div key={course._id || course.id} className="course-card">
                  <div className="course-info">
                    <h3>{course.title}</h3>
                    {course.duration && <span className="badge">{course.duration}</span>}
                    <p>{course.description || "No description provided."}</p>
                  </div>
                  <div className="course-actions">
                    <button 
                      onClick={() => handleDeleteCourse(course._id || course.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
