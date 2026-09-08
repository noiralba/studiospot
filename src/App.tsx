import { Outlet } from "react-router";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <main>
      <Navigation />

      <main>
        <Outlet />
      </main>
      <Footer />
    </main>
  );
}

export default App;
