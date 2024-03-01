import {useState} from 'react';

export default function AccountPage () {
  const [formData, setFormData] = useState ({
    firstName : '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: ''
  });
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send the form data to the server here
    console.log(formData);
  };
  return(
    <div>
      <h1>Account Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type='text' name='lastName' value={formData.lastName} onChange={handleChange}/>
        </label>
        <label>
          Address:
          <input type='text' name='address' value={formData.address} onChange={handleChange}/>
        </label>
        <label>
          Email:
        <input type='email' name='email' value={formData.email} onChange={handleChange}/>
        </label>
          Phone Number:
          <input type='tel' name='phoneNumber' value={formData.phoneNumber} onChange={handleChange}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}