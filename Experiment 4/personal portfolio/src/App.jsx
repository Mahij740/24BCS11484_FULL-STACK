import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Outlet,
  useNavigate
} from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div className="page">
      <div className="hero">
        <div className="hero-content">
          <span className="badge">✨ Welcome</span>
          <h1>Build. Create. <span>Inspire.</span></h1>
          <p>
            Welcome to my modern React application. Explore different pages,
            discover new ideas, and enjoy a clean user experience.
          </p>

          <div className="hero-buttons">
            <NavLink to="/about" className="primary-btn">
              Explore More →
            </NavLink>
            <NavLink to="/contact" className="secondary-btn">
              Contact Me
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <div className="content-card">
        <span className="badge">💡 About</span>
        <h1>About This Project</h1>
        <p>
          This project demonstrates navigation and nested routing using
          React Router. Each page has its own purpose while maintaining
          a consistent and attractive design.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <span>⚡</span>
            <h3>Fast</h3>
            <p>Built with modern React and Vite.</p>
          </div>

          <div className="feature-card">
            <span>🎨</span>
            <h3>Creative</h3>
            <p>A vibrant and modern user interface.</p>
          </div>

          <div className="feature-card">
            <span>🧭</span>
            <h3>Simple</h3>
            <p>Easy navigation using React Router.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="page">
      <div className="contact-card">
        <div className="contact-info">
          <span className="badge">📩 Get in Touch</span>
          <h1>Let's Talk!</h1>
          <p>
            Have an idea, question, or message? Send it my way.
            I'd love to hear from you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <label>Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            required
          />

          <label>Your Message</label>
          <textarea
            placeholder="Write your message..."
            required
          />

          <button type="submit" className="primary-btn">
            Send Message 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="dashboard-card">
      <span className="badge">👤 Profile</span>
      <h1>Your Profile</h1>
      <p>
        Welcome to your profile page. Here you can view and manage
        your personal information.
      </p>
    </div>
  );
}

function Settings() {
  return (
    <div className="dashboard-card">
      <span className="badge">⚙️ Settings</span>
      <h1>Settings</h1>
      <p>
        Customize your application preferences and manage your settings.
      </p>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">My<span>App</span></div>

      <ul className="nav-links">
        <li>
          <NavLink to="/" end>Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      </ul>
    </nav>
  );
}

function DashboardLayout() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>🚀 Dashboard</h2>

        <NavLink to="/dashboard/profile">
          👤 Profile
        </NavLink>

        <NavLink to="/dashboard/settings">
          ⚙️ Settings
        </NavLink>
      </aside>

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}