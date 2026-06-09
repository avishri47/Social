import Layout from "./components/Layout/Layout";
import Feed from "./components/Feed/Feed";
import Header from "./components/Header/Header";

function App() {
  return (
    
    <Layout>
         <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Feed />
     
    </Layout>
  );
}

export default App;