import React, {useState} from 'react';
import './CustomerList.css';
import { customers } from '../Data';
import ModalCustomer from '../Modal/ModalCutomer';
import ExportExcel from '../Export/ExportExcel';
import ExportPdf from '../Export/ExportPdf';

const CustomerList = (props) => {
    const allColumns = Object.keys(customers[0]);
    const [customerList, setCustomerList] = useState(customers);
    const [customerSortColumn, setCustomerSortColumn] = useState('CustID');
    const [customerSortOrder, setCustomerSortOrder] = useState('asc');
    const [customerSearch, setCustomerSearch] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [modalAction, setModalAction] = useState('');
    const [showExportModal, setShowExportModal] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState(allColumns);
    const [filteredCustomerList, setFilteredCustomerList] = useState(customerList);

    React.useEffect(() => {

        const filteredList = customerList.filter((customer) => {
            return (
                customer.CustFirstName.toLowerCase().includes(customerSearch.toLowerCase()) ||
                customer.CustLastName.toLowerCase().includes(customerSearch.toLowerCase()) ||
                customer.CustStreetAddress.toLowerCase().includes(customerSearch.toLowerCase()) ||
                customer.CustCity.toLowerCase().includes(customerSearch.toLowerCase()) ||
                customer.CustState.toLowerCase().includes(customerSearch.toLowerCase()) ||
                customer.CustZipcode.toLowerCase().includes(customerSearch.toLowerCase() ||
                    customer.CustPhone.toLowerCase().includes(customerSearch.toLowerCase()) ||
                    customer.CustEmail.toLowerCase().includes(customerSearch.toLowerCase())
                )
                
            );
        });
        setFilteredCustomerList(filteredList);
    }, [customerSearch]);

    const handleSortCustomer = (columnName) => {
    // If sorting the same column, toggle the sort order

        const sortedCustomerList = filteredCustomerList.sort((a, b) => {
            if (columnName === 'CustID') {
                return customerSortOrder === 'asc' ? a.CustID - b.CustID : b.CustID - a.CustID;
            } else if (columnName === 'CustFirstName') {
                return customerSortOrder === 'asc' ? a.CustFirstName.localeCompare(b.CustFirstName) : b.CustFirstName.localeCompare(a.CustFirstName);
            } else if (columnName === 'CustLastName') {
                return customerSortOrder === 'asc' ? a.CustLastName.localeCompare(b.CustLastName) : b.CustLastName.localeCompare(a.CustLastName);
            } else if (columnName === 'CustStreetAddress') {
                return customerSortOrder === 'asc' ? a.CustStreetAddress.localeCompare(b.CustStreetAddress) : b.CustStreetAddress.localeCompare(a.CustStreetAddress);
            } else if (columnName === 'CustCity') {
                return customerSortOrder === 'asc' ? a.CustCity.localeCompare(b.CustCity) : b.CustCity.localeCompare(a.CustCity);
            } else if (columnName === 'CustState') {
                return customerSortOrder === 'asc' ? a.CustState.localeCompare(b.CustState) : b.CustState.localeCompare(a.CustState);
            } else if (columnName === 'CustZipcode') {
                return customerSortOrder === 'asc' ? a.CustZipcode.localeCompare(b.CustZipcode) : b.CustZipcode.localeCompare(a.CustZipcode);
            } else if (columnName === 'CustPhone') {
                return customerSortOrder === 'asc' ? a.CustPhone.localeCompare(b.CustPhone) : b.CustPhone.localeCompare(a.CustPhone);
            } else if (columnName === 'CustEmail') {
                return customerSortOrder === 'asc' ? a.CustEmail.localeCompare(b.CustEmail) : b.CustEmail.localeCompare(a.CustEmail);
            }
        });

        if (columnName === customerSortColumn) {
            setCustomerSortOrder(customerSortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Otherwise, set the sort column to the new column and the sort order to ascending
            setCustomerSortColumn(columnName);
            setCustomerSortOrder('asc');
        }

        setCustomerList(sortedCustomerList);
    }

    // Handle customer CRUD operations
    const handleAddCustomer = (formData) => {
        const newCustomer = {
            ...formData,
        };
        setCustomerList([...customerList, newCustomer]);
    };

    const handleDeleteCustomer = (customerID) => {
        const updatedList = customerList.filter((customer) => customer.CustID !== customerID);
        setCustomerList(updatedList);
    };

    const handleModalClose = () => {
        setModalAction(null);
        setSelectedCustomer(null);
    }

    const handleUpdateCustomer = (formData) => {
        console.log(formData);
        const updatedCustomer = { ...selectedCustomer, ...formData };
        const updatedCustomerList = customerList.map((customer) =>
            customer.CustID === selectedCustomer.CustID ? updatedCustomer : customer
        );
        setCustomerList(updatedCustomerList);

        setSelectedCustomer(updatedCustomer);
    }

    const handleAddButtonClick = () => {
        setModalAction('Add');
    }

    const handleUpdateButtonClick = (id) => {
        const customer = customerList.find(customer => customer.CustID === id);
        setSelectedCustomer(customer);
        setModalAction('Update');
    }

    const handleAllSelect = () => {
        setSelectedColumns(allColumns);
    }

    const handleAllDeselect = () => {
        setSelectedColumns([]);
    }

    const handleExport = () => {
        setShowExportModal(true);
    };

    const handleConfirmExport = (fileType) => {
        // Create a copy of the data with only the selected columns
        const data = customers.map((customer) =>
        selectedColumns.reduce((obj, col) => {
            obj[col] = customer[col];
            return obj;
        }, {})
        );

        // Export to XLSX or PDF
        if (fileType === 'xlsx') {
            // const columns = selectedColumns.map((col) => ({
            //     header: col,
            //     key: col,
            // }));
            ExportExcel(data, selectedColumns, 'customers.xlsx');
        } else if (fileType === 'pdf') {
            ExportPdf(data, selectedColumns, 'customers.pdf');
        }

        // Close the export modal
        setShowExportModal(false);
    };


    const handleAllSelectChange = () => {
        if (selectedColumns.length === allColumns.length) {
            handleAllDeselect();
        } else {
            handleAllSelect();
        }
    }

    const handleColumnChange = (e) => {
        const colName = e.target.name;
        if (e.target.checked) {
            setSelectedColumns((prev) => [...prev, colName]);
        } else {
            setSelectedColumns((prev) => prev.filter((col) => col !== colName));
        }
    };

    return (
        <div className="CustomerList">
            <div style={{
                "display": "flex",
                "alignItems": "center",
            }}>
                <h1>Customers</h1>

            </div>

            <div className="CustHeader">
                <div className="SearchBar">
                    <input type="text" placeholder="Search" onChange={(e) => setCustomerSearch(e.target.value)} />
                </div>

                <div className="function">
                    
                    <button className="button-1" onClick={() => handleExport()}>
                        Export to Excel/PDF
                    </button>
                </div>
                
            </div>
            <table className="customer-table">
                <thead>
                <tr>
                    <th style={{"width": "8%"}} onClick={() => handleSortCustomer("CustID")}>
                        Customer ID {customerSortColumn === "CustID" && (customerSortOrder === "asc" ?  <span className="decrease">▼</span> : <span className="increase">▲</span>)}
                    </th>
                    <th style={{"width": "7%"}} onClick={() => handleSortCustomer("CustFirstName")}>
                        First Name {customerSortColumn === "CustFirstName" && (customerSortOrder === "asc" ? <span className="decrease">▼</span> : <span className="increase">▲</span>)}
                    </th>
                    <th style={{"width": "7%"}} onClick={() => handleSortCustomer("CustLastName")}>
                        Last Name {customerSortColumn === "CustLastName" && (customerSortOrder === "asc" ?  <span className="decrease">▼</span> : <span className="increase">▲</span>)}
                    </th>
                    <th style={{"width": "9%"}} onClick={() => handleSortCustomer("CustStreetAddress")}>
                        Street Address {customerSortColumn === "CustStreetAddress" && (customerSortOrder === "asc" ?  <span className="decrease">▼</span> : <span className="increase">▲</span>)}
                    </th>
                    <th style={{"width": "7%"}} onClick={() => handleSortCustomer("CustCity")}>
                        City {customerSortColumn === "CustCity" && (customerSortOrder === "asc" ?  <span className="decrease">▼</span> : <span className="increase">▲</span>)}
                    </th>
                    <th style={{"width": "5%"}} onClick={() => handleSortCustomer("CustState")}>
                        State {customerSortColumn === "CustState" && (customerSortOrder === "asc" ?  <span className="decrease">▼</span> : <span className="increase">▲</span>)}
                    </th>
                    <th style={{"width": "7%"}} onClick={() => handleSortCustomer("CustZipcode")}>
                        Zipcode {customerSortColumn === "CustZipcode" && (customerSortOrder === "asc" ?  <span className="decrease">▼</span> : <span className="increase">▲</span>)}
                    </th>   
                    <th style={{"width": "8%"}} onClick={() => handleSortCustomer("CustPhone")}>
                        Phone {customerSortColumn === "CustPhone" && (customerSortOrder === "asc" ?  <span className="decrease">▼</span> : <span className="increase">▲</span>)}
                    </th>
                    <th onClick={() => handleSortCustomer("CustEmail")}>
                        Email {customerSortColumn === "CustEmail" && (customerSortOrder === "asc" ?  <span className="decrease">▼</span> : <span className="increase">▲</span>)}
                    </th>
                    <th style={{"width": "10%"}}>
                        Actions
                    </th>          
                </tr>
                </thead>
                <tbody>
                {filteredCustomerList.map((customer) => (
                    <tr key={customer.CustID}>
                        <td onClick={() => handleUpdateButtonClick(customer.CustID)} style={{"width": "8%"}} >{customer.CustID}</td>
                        <td onClick={() => handleUpdateButtonClick(customer.CustID)} style={{"width": "7%"}}>{customer.CustFirstName}</td>
                        <td onClick={() => handleUpdateButtonClick(customer.CustID)} style={{"width": "7%"}}>{customer.CustLastName}</td>
                        <td onClick={() => handleUpdateButtonClick(customer.CustID)} style={{"width": "9%"}}>{customer.CustStreetAddress}</td>
                        <td onClick={() => handleUpdateButtonClick(customer.CustID)} style={{"width": "7%"}}>{customer.CustCity}</td>
                        <td onClick={() => handleUpdateButtonClick(customer.CustID)} style={{"width": "5%"}}>{customer.CustState}</td>
                        <td onClick={() => handleUpdateButtonClick(customer.CustID)} style={{"width": "7%"}}>{customer.CustZipcode}</td>
                        <td onClick={() => handleUpdateButtonClick(customer.CustID)} style={{"width": "8%"}}>{customer.CustPhone}</td>
                        <td onClick={() => handleUpdateButtonClick(customer.CustID)}>{customer.CustEmail}</td>
                        <td style={{"width": "10%"}}>
                            
                            <button className="button-2" onClick={() => handleDeleteCustomer(customer.CustID)}>
                            Delete
                            </button>
                        </td>
                    </tr>
                ))}
                    <tr className="Add" onClick={() => handleAddButtonClick()}>
                        Add Customer
                    </tr>
                </tbody>
            </table>
            {modalAction && (
                <ModalCustomer
                    show={true}
                    action={modalAction}
                    onClose={handleModalClose}
                    onSubmit={modalAction === 'Add' ? handleAddCustomer : handleUpdateCustomer}
                    formData={selectedCustomer}
                    customers={customerList}
                />
            )}
            {showExportModal && (
            <div className="modal-export">
                <div className="modal-export-content">
                    <span className="close" onClick={() => setShowExportModal(false)}>&times;</span>
              
                    <div className="formHead">
                        <h2>Select columns to export</h2>
                    </div>
                        <form className="formExport">
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        name={"All"}
                                        checked={selectedColumns.length === allColumns.length}
                                        onChange={handleAllSelectChange}
                                    />
                                    {"All"}
                                </label>
                                {Object.keys(customers[0]).map((col) => (
                                    <div key={col}>
                                    <label>

                                        <input
                                        type="checkbox"
                                        name={col}
                                        checked={selectedColumns.includes(col)}
                                        onChange={handleColumnChange}
                                        />

                                        {col}
                                    </label>
                                    </div>
                                ))}
                        </div>
                        <div className="function-export">
                            <button className="button-1"
                            type="button"
                            onClick={() => handleConfirmExport('xlsx')}
                            >
                            Export to Excel
                            </button>
                            <button className="button-2"
                            type="button"
                            onClick={() => handleConfirmExport('pdf')}
                            >
                            Export to PDF
                            </button>
                            
                        </div>
                    </form>
                </div>
            </div>
        )}
        </div>
    );
}

export default CustomerList;