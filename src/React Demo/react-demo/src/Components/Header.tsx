import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <h1>🏦 MyBank</h1>
      <p>Banking Dashboard</p>
      <nav className="main-nav">
        <Link to="/">Dashboard</Link>
        <Link to="/account">Account</Link>
      </nav>
    </header>
  );
}