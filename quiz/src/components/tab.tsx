import React, {useState} from "react";
import FirstTab from "./alltabs/firstTab";
import SecondTab from "./alltabs/secondTab";
import ThirdTab from "./alltabs/thirdTab";
import FourTab from "./alltabs/fourTab";

const Tab = () => {
    const [activeTab, setActiveTab] = useState("tab01");

    const handleTab1 = () => {
        setActiveTab("tab01");
      };
    
    const handleTab2 = () => {
        setActiveTab("tab02");
    };

    const handleTab3 = () => {
        setActiveTab("tab03");
      };
    
    const handleTab4 = () => {
        setActiveTab("tab04");
    };  

  return (

    <div className="main">
      {/* Tab nav */}
      <div className="nav">
        <button className={activeTab === "tab01" ? "active" : ""} onClick={handleTab1}>Tab 01</button>
        <button className={activeTab === "tab02" ? "active" : ""} onClick={handleTab2}>Tab 02</button>
        <button className={activeTab === "tab03" ? "active" : ""} onClick={handleTab3}>Tab 03</button>
        <button className={activeTab === "tab04" ? "active" : ""} onClick={handleTab4}>Tab 04</button>
      </div>
      <div className="outlet">
        {activeTab === "tab01" ? <FirstTab /> : (activeTab === "tab02" ? <SecondTab /> : activeTab === "tab03" ? <ThirdTab/> : activeTab === "tab04" ? <FourTab/> : <FirstTab/>)} 
      </div>
    </div>
  );
};
export default Tab;