import { Outlet } from "react-router";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navigation />

      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
