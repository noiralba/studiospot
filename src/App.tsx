import { Outlet } from "react-router";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Navigation />

      <main>
        <h1>Studio Spot</h1>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
