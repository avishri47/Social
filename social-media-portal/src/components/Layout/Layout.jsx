import NotificationBar from "../Notification/NotificationBar";
import SearchBox from "../Search/SearchBox";
import Sidebar from "../Sidebar/Sidebar";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />

      <div className="right-section">
        <div className="topbar">
          <SearchBox />
          <NotificationBar />
        </div>

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;