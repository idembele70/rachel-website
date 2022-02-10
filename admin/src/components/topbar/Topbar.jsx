import { Language, Settings, ExitToApp } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { logout } from "../../Redux/apiCalls";
import "./topbar.css";

export default function Topbar() {
  const dispatch = useDispatch()
  const handleLogout = () => {
    logout(dispatch)
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">lamaadmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <ExitToApp onClick={handleLogout} />
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
