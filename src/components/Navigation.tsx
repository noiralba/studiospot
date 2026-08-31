import { Link } from "react-router";

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/studios">Studios</Link>
      <Link to="/bookings">Bookings</Link>
    </nav>
  );
}

export default Navigation;
