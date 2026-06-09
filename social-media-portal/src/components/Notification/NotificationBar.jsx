import ProfileDropdown from "../../Profile/ProfileDropdown";
import SearchBox from "../Search/SearchBox";
import "./NotificationBar.css";

function NotificationBar() {
  return (
    <div className="notification-bar">

      <div className="notification-inner">

        <div className="notification-left">
        
        </div>

        <div className="notification-left h2">
 <SearchBox/>
          <button className="nav-icon">
            🏠
          </button>

          <button className="nav-icon">
            🔔
          </button>

          <button className="nav-icon">
            💬
          </button>

          <div className="profile-btn">
           <ProfileDropdown/>
          </div>

        </div>

      </div>

    </div>
  );
}

export default NotificationBar;