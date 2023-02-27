import React, { useState } from 'react';
import './Modal.css';

const ModalCustomer = (props) => {
    const highestID = props.customers.reduce((maxId, customer) => Math.max(maxId, customer.CustID), 0);

    const [formData, setFormData] = useState(props.action === "Update" ? props.formData : {
        CustID: highestID + 1,
        CustFirstName: '',
        CustLastName: '',
        CustStreetAddress: '',
        CustCity: '',
        CustState: '',
        CustZipcode: '',
        CustPhone: '',
        CustEmail: ''
    });

    

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(formData);
    closeModal();
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const closeModal = () => {
    props.onClose();
    setFormData({
      CustID: '',
      CustFirstName: '',
      CustLastName: '',
      CustStreetAddress: '',
      CustCity: '',
      CustState: '',
      CustZipcode: '',
      CustPhone: '',
      CustEmail: ''
    });
  }

  return (
    <div className="modal" style={{ display: props.show ? 'block' : 'none' }}>
          <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
              
              <div className="formHead">
                  <h2>{props.action} Customer</h2>
                </div>
              
            <label>
                Customer ID: {formData.CustID}
            </label>
            <form onSubmit={handleSubmit}>
                <div className="group">
                <label>
                    First Name:
                    <input type="text" name="CustFirstName" value={formData.CustFirstName} onChange={handleChange} required/>
                </label>
                <label>
                    Last Name:
                    <input type="text" name="CustLastName" value={formData.CustLastName} onChange={handleChange} required/>
                      </label>
                  </div>
                <div className="formElement">
                    Email:
                    <input type="text" name="CustEmail" value={formData.CustEmail} onChange={handleChange} required/>
                </div>
                <div className="formElement">
                    Street Address:
                    <input type="text" name="CustStreetAddress" value={formData.CustStreetAddress} onChange={handleChange} required/>
                </div>
                <div className="group">
                    <label>
                        City:
                        <input type="text" name="CustCity" value={formData.CustCity} onChange={handleChange} required/>
                    </label>
                    <label>
                        State:
                        <input type="text" name="CustState" value={formData.CustState} onChange={handleChange} required/>
                    </label>
                </div>
                <div className="group">
                    <label>
                        Zipcode:
                        <input type="text" name="CustZipcode" value={formData.CustZipcode} onChange={handleChange} required/>
                    </label>
                    <label>
                        Phone:
                        <input type="text" name="CustPhone" value={formData.CustPhone} onChange={handleChange} required />
                    </label>
                  </div>  
                  <div className="btn">
                    <input type="submit" value={props.action.toUpperCase()} />
                      
                  </div>
            </form>
      </div>
    </div>
  );
}

export default ModalCustomer;