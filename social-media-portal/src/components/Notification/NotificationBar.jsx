import ProfileDropdown from "../../Profile/ProfileDropdown";
import "./NotificationBar.css";

function NotificationBar() {
  return (
    <div className="notification-bar">

      <div className="notification-inner">

        <div className="notification-left">
         
        </div>

        <div className="notification-right">

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