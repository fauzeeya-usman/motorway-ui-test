import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [images, setImages] = useState();

  useEffect(() => {
    fetch('images?limit=10')
      .then(res => res.json())
      .then(data => {
        console.log('Success:', data);
        setImages(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    color: '',
    salary: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation or any additional logic here
  };

  return (
    <div className='app'>
      <h1>Welcome to the Image Gallery</h1>
      {
        images && images.map(img => (
          <div key={img.id} className='thumbnail'>
            <img src={`${img.url}.jpg`} alt='' className='thumbnail-image' />
            <img src={`${img.user.profile_image}.webp`} alt='' className='thumbnail-image' />
          </div>
        ))
      }
      <h3>Error:</h3>
      <p>I was unable to retrieve the images for the thumbnail, Modal and its effects.</p>
      <hr />

      <h1>This is the form below:</h1>
      <form onSubmit={handleSubmit}>
        <h2>Form</h2>
        <div className="form-field">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label htmlFor="color">Favorite Colour:</label>
          <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label htmlFor="salary">Salary:</label>
          <input type="range" id="salary" name="salary" min="10000" max="40000" value={formData.salary} onChange={handleChange} required />
          <br />
          <output htmlFor="salary">{formData.salary}</output>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
