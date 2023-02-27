import React, {useState} from 'react';
import './Home.css';
import { Tab, TabList, TabPanel } from '../TabComponent/TabComponent';
import CustomerList from '../CustomerList/CustomerList';
import EmployeeList from '../EmployeeList/EmployeeList';

function Home(props) {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    return (
        <div className="HomeGlass">
            <TabList activeTab={activeTab} onTabClick={handleTabClick}>
                <Tab index={0}>
                    <div className="tab-item">
                        Customers
                    </div>
                </Tab>
                <Tab index={1}>
                    <div className="tab-item">
                        Orders
                    </div>
                </Tab>
                <Tab index={2}>
                    <div className="tab-item">
                        Employee
                    </div>
                </Tab>
            </TabList>
            <div className="content">
                <TabPanel activeTab={activeTab} index={0}>
                    <CustomerList />
                </TabPanel>
                <TabPanel activeTab={activeTab} index={1}>
                    <h1>Order</h1>
                </TabPanel>
                <TabPanel activeTab={activeTab} index={2}>
                    <h1>Employee</h1>
                </TabPanel>
            </div>

        </div>
    );
}

export default Home;