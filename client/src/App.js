import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import './App.css';
import Profile from "./Profile";
import BankDetails from "./BankDetails";

function App() {
  return (
    <div class="container-fluid">
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="profile" title="Profile">
          <Profile  />
        </Tab>
        <Tab eventKey="bankDetails" title="Bank Details">
          <BankDetails />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
