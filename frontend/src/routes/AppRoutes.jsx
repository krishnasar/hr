/*

// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import CountriesPage from '../features/countries/CountriesPage';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '1rem', color: 'red' }}>
          <h2>Something went wrong in routing.</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrap <Routes> with the error boundary
const AppRoutes = () => (
  <ErrorBoundary>
    <Routes>
      <Route path="/" element={<CountriesPage />} />
    </Routes>
  </ErrorBoundary>
);

export default AppRoutes;
*/


/*


//--------------------------------------------------------------------------------------
// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import CountriesPage from '../features/countries/CountriesPage';
import DepartmentsPage from '../features/departments/DepartmentsPage';
import EmployeesPage from '../features/employees/EmployeesPage';
import JobsPage from '../features/jobs/JobsPage';
import LocationsPage from '../features/locations/LocationsPage';

// Layout Components
const Header = () => (
  <header style={{ padding: '1rem', background: '#333', color: '#fff' }}>
    <h1>HR Management System</h1>
  </header>
);

const Footer = () => (
  <footer style={{ padding: '1rem', background: '#eee', textAlign: 'center' }}>
    <p>© 2025 HRMS Inc.</p>
  </footer>
);

const Navigation = () => (
  <nav style={{ width: '200px', background: '#f4f4f4', padding: '1rem' }}>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <li><Link to="/countries">Countries</Link></li>
      <li><Link to="/departments">Departments</Link></li>
      <li><Link to="/employees">Employees</Link></li>
      <li><Link to="/jobs">Jobs</Link></li>
      <li><Link to="/locations">Locations</Link></li>
    </ul>
  </nav>
);

// Main Layout with Nav + Content
const MainLayout = () => (
  <div>
    <Header />
    <div style={{ display: 'flex', minHeight: '80vh' }}>
      <Navigation />
      <main style={{ flexGrow: 1, padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
    <Footer />
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '1rem', color: 'red' }}>
          <h2>Something went wrong in routing.</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Routes with Layout and Pages
const AppRoutes = () => (
  <ErrorBoundary>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<CountriesPage />} />
        <Route path="countries" element={<CountriesPage />} />
        <Route path="departments" element={<DepartmentsPage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="locations" element={<LocationsPage />} />
      </Route>
    </Routes>
  </ErrorBoundary>
);

export default AppRoutes;

-----------------------------------------------------------------------------
*/

// src/routes/AppRoutes.jsx
import React, { Suspense } from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import CountriesPage from '../features/countries/CountriesPage';


// Lazy load future pages
const DepartmentsPage = React.lazy(() => import('../features/departments/DepartmentsPage').catch(() => ({ default: ComingSoon })));
const EmployeesPage = React.lazy(() => import('../features/employees/EmployeesPage.jsx').catch(() => ({ default: ComingSoon })));
const JobsPage = React.lazy(() => import('../features/jobs/JobsPage').catch(() => ({ default: ComingSoon })));
const LocationsPage = React.lazy(() => import('../features/locations/LocationsPage').catch(() => ({ default: ComingSoon })));

// Placeholder component for pages not ready
const ComingSoon = () => (
  <div style={{ padding: '1rem', color: '#888' }}>
    <h2>Coming Soon</h2>
    <p>This page will be made available later.</p>
  </div>
);

// Layout Components
const Header = () => (
  <header style={{ padding: '1rem', background: '#333', color: '#fff' }}>
    <h1>HR Management System</h1>
  </header>
);

const Footer = () => (
  <footer style={{ padding: '1rem', background: '#eee', textAlign: 'center' }}>
    <p>© 2025 HRMS Inc.</p>
  </footer>
);

const Navigation = () => (
  <nav style={{ width: '200px', background: '#f4f4f4', padding: '1rem' }}>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <li><Link to="/countries">Countries</Link></li>
      <li><Link to="/departments">Departments</Link></li>
      <li><Link to="/employees">Employees</Link></li>
      <li><Link to="/jobs">Jobs</Link></li>
      <li><Link to="/locations">Locations</Link></li>
    </ul>
  </nav>
);

const MainLayout = () => (
  <div>
    <Header />
    <div style={{ display: 'flex', minHeight: '80vh' }}>
      <Navigation />
      <main style={{ flexGrow: 1, padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
    <Footer />
  </div>
);

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '1rem', color: 'red' }}>
          <h2>Something went wrong in routing.</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main App Routes
const AppRoutes = () => (
  <ErrorBoundary>
    <Suspense fallback={<div style={{ padding: '1rem' }}>Loading...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<CountriesPage />} />
          <Route path="countries" element={<CountriesPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="locations" element={<LocationsPage />} />
        </Route>
      </Routes>
    </Suspense>
  </ErrorBoundary>
);

export default AppRoutes;
