import React, {useState} from 'react';
import { employees } from '../Data';
import ExportExcel from '../Export/ExportExcel';
import ExportPdf from '../Export/ExportPdf';

const EmployeeList = (props) => {
    const allColumns = Object.keys(employees[0]);
    const [EmployeeList, setEmployeeList] = useState(employees);
    const [employeesortColumn, setemployeesortColumn] = useState('EmpID');
    const [employeesortOrder, setemployeesortOrder] = useState('asc');
    const [employeesearch, setemployeesearch] = useState('');
    const [selectedemployee, setselectedemployee] = useState(null);
    const [modalAction, setModalAction] = useState('');
    const [showExportModal, setShowExportModal] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState(allColumns);
    const [filteredEmployeeList, setFilteredEmployeeList] = useState(EmployeeList);

    React.useEffect(() => {

        const filteredList = EmployeeList.filter((employee) => {
            return (
                employee.EmpFirstName.toLowerCase().includes(employeesearch.toLowerCase()) ||
                employee.EmpLastName.toLowerCase().includes(employeesearch.toLowerCase()) ||
                employee.EmpStreetAddress.toLowerCase().includes(employeesearch.toLowerCase()) ||
                employee.EmpCity.toLowerCase().includes(employeesearch.toLowerCase()) ||
                employee.EmpState.toLowerCase().includes(employeesearch.toLowerCase()) ||
                employee.EmpZipcode.toLowerCase().includes(employeesearch.toLowerCase() ||
                    employee.EmpPhone.toLowerCase().includes(employeesearch.toLowerCase()) ||
                    employee.Position.toLowerCase().includes(employeesearch.toLowerCase()) ||
                    employee.HourlyRate.toLowerCase().includes(employeesearch.toLowerCase()) ||
                    employee.DateHired.toLowerCase().includes(employeesearch.toLowerCase())
                )
                
            );
        });
        setFilteredEmployeeList(filteredList);
    }, [employeesearch]);

    const handleSortCustomer = (columnName) => {
    // If sorting the same column, toggle the sort order

        const sortedEmployeeList = filteredEmployeeList.sort((a, b) => {
            if (columnName === 'EmpID') {
                return employeesortOrder === 'asc' ? a.EmpID - b.EmpID : b.EmpID - a.EmpID;
            } else if (columnName === 'EmpFirstName') {
                return employeesortOrder === 'asc' ? a.EmpFirstName.localeCompare(b.EmpFirstName) : b.EmpFirstName.localeCompare(a.EmpFirstName);
            } else if (columnName === 'EmpLastName') {
                return employeesortOrder === 'asc' ? a.EmpLastName.localeCompare(b.EmpLastName) : b.EmpLastName.localeCompare(a.EmpLastName);
            } else if (columnName === 'EmpStreetAddress') {
                return employeesortOrder === 'asc' ? a.EmpStreetAddress.localeCompare(b.EmpStreetAddress) : b.EmpStreetAddress.localeCompare(a.EmpStreetAddress);
            } else if (columnName === 'EmpCity') {
                return employeesortOrder === 'asc' ? a.EmpCity.localeCompare(b.EmpCity) : b.EmpCity.localeCompare(a.EmpCity);
            } else if (columnName === 'EmpState') {
                return employeesortOrder === 'asc' ? a.EmpState.localeCompare(b.EmpState) : b.EmpState.localeCompare(a.EmpState);
            } else if (columnName === 'EmpZipcode') {
                return employeesortOrder === 'asc' ? a.EmpZipcode.localeCompare(b.EmpZipcode) : b.EmpZipcode.localeCompare(a.EmpZipcode);
            } else if (columnName === 'EmpPhone') {
                return employeesortOrder === 'asc' ? a.EmpPhone.localeCompare(b.EmpPhone) : b.EmpPhone.localeCompare(a.EmpPhone);
            } else if (columnName === 'Position') {
                return employeesortOrder === 'asc' ? a.Position.localeCompare(b.Position) : b.Position.localeCompare(a.Position);
            }
        });

        if (columnName === employeesortColumn) {
            setemployeesortOrder(employeesortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Otherwise, set the sort column to the new column and the sort order to ascending
            setemployeesortColumn(columnName);
            setemployeesortOrder('asc');
        }

        setEmployeeList(sortedEmployeeList);
    }

    // Handle customer CRUD operations
    const handleAddCustomer = (formData) => {
        const newCustomer = {
            ...formData,
        };
        setEmployeeList([...EmployeeList, newCustomer]);
    };

    const handleDeleteCustomer = (employeeID) => {
        const updatedList = EmployeeList.filter((employee) => employee.EmpID !== employeeID);
        setEmployeeList(updatedList);
    };

    const handleModalClose = () => {
        setModalAction(null);
        setselectedemployee(null);
    }

    const handleUpdateCustomer = (formData) => {
        console.log(formData);
        const updatedEmployee = { ...selectedemployee, ...formData };
        const updatedEmployeeList = EmployeeList.map((employee) =>
            employee.EmpID === selectedemployee.EmpID ? updatedEmployee : employee
        );
        setEmployeeList(updatedEmployeeList);

        setselectedemployee(updatedEmployee);
    }

    const handleAddButtonClick = () => {
        setModalAction('Add');
    }

    const handleUpdateButtonClick = (id) => {
        const employee = EmployeeList.find(employee => employee.EmpID === id);
        setselectedemployee(employee);
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
        const data = employees.map((employee) =>
        selectedColumns.reduce((obj, col) => {
            obj[col] = employee[col];
            return obj;
        }, {})
        );

        // Export to XLSX or PDF
        if (fileType === 'xlsx') {
            // const columns = selectedColumns.map((col) => ({
            //     header: col,
            //     key: col,
            // }));
            ExportExcel(data, selectedColumns, 'employees.xlsx');
        } else if (fileType === 'pdf') {
            ExportPdf(data, selectedColumns, 'employees.pdf');
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
        <div className="EmployeeList">
            <div style={{
                "display": "flex",
                "alignItems": "center",
            }}>
                <h1>Employees</h1>

            </div>

            <div className="CustHeader">
                <div className="SearchBar">
                    <input type="text" placeholder="Search" onChange={(e) => setemployeesearch(e.target.value)} />
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
                    <th style={{"width": "8%"}} onClick={() => handleSortCustomer("EmpID")}>
                        Customer ID {employeesortColumn === "EmpID" && (employeesortOrder === "asc" ?  <span className="decrease">▼</span> : <span className="increase">▲</span>)}
                    </th>
                    <th style={{"width": "7%"}} onClick={() => handleSortCustomer("EmpFirstName")}>
                        First Name {employeesortColumn === "EmpFirstName" && (employeesortOrder === "asc" ? <span className="decrease">▼</span> : <span className="increase">▲</span>)}
                    </th>
                    <th style={{"width": "7%"}} onClick={() => handleSortCustomer("EmpLastName")}>
                        Last Name {employeesortColumn === "EmpLastName" && (employeesortOrder === "asc" ?  <span className="decrease">▼</span> : <span className="increase">▲</span>)}
                    </th>
                    <th style={{"width": "9%"}} onClick={() => handleSortCustomer("EmpStreetAddress")}>
                        Street Address {employeesortColumn === "EmpStreetAddress" && (employeesortOrder === "asc" ?  <span className="decrease">▼</span> : <span className="increase">▲</span>)}
                    </th>
                    <th style={{"width": "7%"}} onClick={() => handleSortCustomer("EmpCity")}>
                        City {employeesortColumn === "EmpCity" && (employeesortOrder === "asc" ?  <span className="decrease">▼</span> : <span className="increase">▲</span>)}
                    </th>
                    <th style={{"width": "5%"}} onClick={() => handleSortCustomer("EmpState")}>
                        State {employeesortColumn === "EmpState" && (employeesortOrder === "asc" ?  <span className="decrease">▼</span> : <span className="increase">▲</span>)}
                    </th>
                    <th style={{"width": "7%"}} onClick={() => handleSortCustomer("EmpZipcode")}>
                        Zipcode {employeesortColumn === "EmpZipcode" && (employeesortOrder === "asc" ?  <span className="decrease">▼</span> : <span className="increase">▲</span>)}
                    </th>   
                    <th style={{"width": "8%"}} onClick={() => handleSortCustomer("EmpPhone")}>
                        Phone {employeesortColumn === "EmpPhone" && (employeesortOrder === "asc" ?  <span className="decrease">▼</span> : <span className="increase">▲</span>)}
                    </th>
                    <th onClick={() => handleSortCustomer("Position")}>
                        Email {employeesortColumn === "Position" && (employeesortOrder === "asc" ?  <span className="decrease">▼</span> : <span className="increase">▲</span>)}
                    </th>
                    <th style={{"width": "10%"}}>
                        Actions
                    </th>          
                </tr>
                </thead>
                <tbody>
                {filteredEmployeeList.map((employee) => (
                    <tr key={employee.EmpID}>
                        <td onClick={() => handleUpdateButtonClick(employee.EmpID)} style={{"width": "8%"}} >{employee.EmpID}</td>
                        <td onClick={() => handleUpdateButtonClick(employee.EmpID)} style={{"width": "7%"}}>{employee.EmpFirstName}</td>
                        <td onClick={() => handleUpdateButtonClick(employee.EmpID)} style={{"width": "7%"}}>{employee.EmpLastName}</td>
                        <td onClick={() => handleUpdateButtonClick(employee.EmpID)} style={{"width": "9%"}}>{employee.EmpStreetAddress}</td>
                        <td onClick={() => handleUpdateButtonClick(employee.EmpID)} style={{"width": "7%"}}>{employee.EmpCity}</td>
                        <td onClick={() => handleUpdateButtonClick(employee.EmpID)} style={{"width": "5%"}}>{employee.EmpState}</td>
                        <td onClick={() => handleUpdateButtonClick(employee.EmpID)} style={{"width": "7%"}}>{employee.EmpZipcode}</td>
                        <td onClick={() => handleUpdateButtonClick(employee.EmpID)} style={{"width": "8%"}}>{employee.EmpPhone}</td>
                        <td onClick={() => handleUpdateButtonClick(employee.EmpID)}>{employee.Position}</td>
                        <td style={{"width": "10%"}}>
                            
                            <button className="button-2" onClick={() => handleDeleteCustomer(employee.EmpID)}>
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
                                {Object.keys(employees[0]).map((col) => (
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

export default EmployeeList;