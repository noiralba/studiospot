import { Outlet } from "react-router";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <Navigation />

      <main>
        <h1>Studio Spot</h1>
        <Outlet />
      </main>
    </>
  );
}

export default App;
