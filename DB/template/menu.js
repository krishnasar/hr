import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// User Forms
import AuthTokenForm from './components/user/forms/AuthTokenForm';
import MfaTokensForm from './components/user/forms/MfaTokensForm';
import PasswordResetForm from './components/user/forms/PasswordResetForm';
import SecretsForm from './components/user/forms/SecretsForm';
import TokenAuditLogForm from './components/user/forms/TokenAuditLogForm';
import UserLoginHistoryForm from './components/user/forms/UserLoginHistoryForm';
import UserProfileForm from './components/user/forms/UserProfileForm';
import UsersForm from './components/user/forms/UsersForm';

// User Reports
import MfaTokensReport from './components/user/reports/MfaTokensReport';
import PasswordResetsReport from './components/user/reports/PasswordResetsReport';
import SecretsReport from './components/user/reports/SecretsReport';
import TokenAuditLogReport from './components/user/reports/TokenAuditLogReport';
import UserLoginHistoryReport from './components/user/reports/UserLoginHistoryReport';
import UserProfilesReport from './components/user/reports/UserProfilesReport';
import UsersReport from './components/user/reports/UsersReport';

// Employees Forms
import CountriesForm from './components/employees/forms/CountriesForm';
import LocationsForm from './components/employees/forms/LocationsForm';
import DepartmentsForm from './components/employees/forms/DepartmentsForm';
import EmployeesForm from './components/employees/forms/EmployeesForm';
import JobHistoryForm from './components/employees/forms/JobHistoryForm';

// Employees Reports
import CountryReport from './components/employees/reports/CountryReport';
import LocationReport from './components/employees/reports/LocationReport';
import DepartmentReport from './components/employees/reports/DepartmentReport';
import EmployeeReport from './components/employees/reports/EmployeeReport';
import JobHistoryReport from './components/employees/reports/JobHistoryReport';

function App() {
  // Expand/collapse state for modules and submenus
  const [expandUser, setExpandUser] = useState(true);
  const [expandUserForms, setExpandUserForms] = useState(true);
  const [expandUserReports, setExpandUserReports] = useState(true);

  const [expandEmployees, setExpandEmployees] = useState(true);
  const [expandEmpForms, setExpandEmpForms] = useState(true);
  const [expandEmpReports, setExpandEmpReports] = useState(true);

  const styles = {
    appContainer: {
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
      height: '100vh',
    },
    layoutWrapper: {
      display: 'flex',
      flex: 1,
    },
    sidebar: {
      width: '300px',
      backgroundColor: '#f4f4f4',
      padding: '20px',
      borderRight: '1px solid #ccc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      overflowY: 'auto',
    },
    contentArea: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
    },
    sectionTitle: {
      fontWeight: 'bold',
      cursor: 'pointer',
      marginBottom: '10px',
      color: '#333',
      fontSize: '16px',
      borderBottom: '1px solid #aaa',
      paddingBottom: '4px',
      width: '100%',
      userSelect: 'none',
    },
    linkList: {
      listStyleType: 'none',
      paddingLeft: '20px',
      marginBottom: '20px',
      width: '100%',
    },
    linkItem: {
      padding: '6px 0',
    },
    link: {
      textDecoration: 'none',
      color: '#007bff',
      fontWeight: 'bold',
    },
    header: {
      textAlign: 'center',
      padding: '20px',
      borderBottom: '1px solid #ccc',
      backgroundColor: '#fafafa',
    }
  };

  return (
    <Router>
      <div style={styles.appContainer}>
        <div style={styles.header}>
          <h1>HR Management Portal</h1>
        </div>

        <div style={styles.layoutWrapper}>
          {/* Sidebar Menu */}
          <div style={styles.sidebar}>

            {/* User Module */}
            <div style={styles.sectionTitle} onClick={() => setExpandUser(prev => !prev)}>
              {expandUser ? '▼' : '▶'} User Module
            </div>
            {expandUser && (
              <>
                <div style={{ ...styles.sectionTitle, paddingLeft: '15px', fontSize: '14px' }} onClick={() => setExpandUserForms(prev => !prev)}>
                  {expandUserForms ? '▼' : '▶'} Forms
                </div>
                {expandUserForms && (
                  <ul style={styles.linkList}>
                    <li style={styles.linkItem}><Link to="/user/forms/auth-token" style={styles.link}>Auth Token</Link></li>
                    <li style={styles.linkItem}><Link to="/user/forms/mfa-tokens" style={styles.link}>MFA Tokens</Link></li>
                    <li style={styles.linkItem}><Link to="/user/forms/password-reset" style={styles.link}>Password Reset</Link></li>
                    <li style={styles.linkItem}><Link to="/user/forms/secrets" style={styles.link}>Secrets</Link></li>
                    <li style={styles.linkItem}><Link to="/user/forms/token-audit-log" style={styles.link}>Token Audit Log</Link></li>
                    <li style={styles.linkItem}><Link to="/user/forms/user-login-history" style={styles.link}>User Login History</Link></li>
                    <li style={styles.linkItem}><Link to="/user/forms/user-profile" style={styles.link}>User Profile</Link></li>
                    <li style={styles.linkItem}><Link to="/user/forms/users" style={styles.link}>Users</Link></li>
                  </ul>
                )}

                <div style={{ ...styles.sectionTitle, paddingLeft: '15px', fontSize: '14px' }} onClick={() => setExpandUserReports(prev => !prev)}>
                  {expandUserReports ? '▼' : '▶'} Reports
                </div>
                {expandUserReports && (
                  <ul style={styles.linkList}>
                    <li style={styles.linkItem}><Link to="/user/reports/mfa-tokens" style={styles.link}>MFA Tokens Report</Link></li>
                    <li style={styles.linkItem}><Link to="/user/reports/password-resets" style={styles.link}>Password Resets Report</Link></li>
                    <li style={styles.linkItem}><Link to="/user/reports/secrets" style={styles.link}>Secrets Report</Link></li>
                    <li style={styles.linkItem}><Link to="/user/reports/token-audit-log" style={styles.link}>Token Audit Log Report</Link></li>
                    <li style={styles.linkItem}><Link to="/user/reports/user-login-history" style={styles.link}>User Login History Report</Link></li>
                    <li style={styles.linkItem}><Link to="/user/reports/user-profiles" style={styles.link}>User Profiles Report</Link></li>
                    <li style={styles.linkItem}><Link to="/user/reports/users" style={styles.link}>Users Report</Link></li>
                  </ul>
                )}
              </>
            )}

            {/* Employees Module */}
            <div style={styles.sectionTitle} onClick={() => setExpandEmployees(prev => !prev)}>
              {expandEmployees ? '▼' : '▶'} Employees Module
            </div>
            {expandEmployees && (
              <>
                <div style={{ ...styles.sectionTitle, paddingLeft: '15px', fontSize: '14px' }} onClick={() => setExpandEmpForms(prev => !prev)}>
                  {expandEmpForms ? '▼' : '▶'} Forms
                </div>
                {expandEmpForms && (
                  <ul style={styles.linkList}>
                    <li style={styles.linkItem}><Link to="/employees/forms/countries" style={styles.link}>Countries</Link></li>
                    <li style={styles.linkItem}><Link to="/employees/forms/locations" style={styles.link}>Locations</Link></li>
                    <li style={styles.linkItem}><Link to="/employees/forms/departments" style={styles.link}>Departments</Link></li>
                    <li style={styles.linkItem}><Link to="/employees/forms/employees" style={styles.link}>Employees</Link></li>
                    <li style={styles.linkItem}><Link to="/employees/forms/job-history" style={styles.link}>Job History</Link></li>
                  </ul>
                )}

                <div style={{ ...styles.sectionTitle, paddingLeft: '15px', fontSize: '14px' }} onClick={() => setExpandEmpReports(prev => !prev)}>
                  {expandEmpReports ? '▼' : '▶'} Reports
                </div>
                {expandEmpReports && (
                  <ul style={styles.linkList}>
                    <li style={styles.linkItem}><Link to="/employees/reports/countries" style={styles.link}>Countries Report</Link></li>
                    <li style={styles.linkItem}><Link to="/employees/reports/locations" style={styles.link}>Locations Report</Link></li>
                    <li style={styles.linkItem}><Link to="/employees/reports/departments" style={styles.link}>Departments Report</Link></li>
                    <li style={styles.linkItem}><Link to="/employees/reports/employees" style={styles.link}>Employees Report</Link></li>
                    <li style={styles.linkItem}><Link to="/employees/reports/job-history" style={styles.link}>Job History Report</Link></li>
                  </ul>
                )}
              </>
            )}
          </div>

          {/* Content Area */}
          <div style={styles.contentArea}>
            <Routes>
              {/* User Forms */}
              <Route path="/user/forms/auth-token" element={<AuthTokenForm />} />
              <Route path="/user/forms/mfa-tokens" element={<MfaTokensForm />} />
              <Route path="/user/forms/password-reset" element={<PasswordResetForm />} />
              <Route path="/user/forms/secrets" element={<SecretsForm />} />
              <Route path="/user/forms/token-audit-log" element={<TokenAuditLogForm />} />
              <Route path="/user/forms/user-login-history" element={<UserLoginHistoryForm />} />
              <Route path="/user/forms/user-profile" element={<UserProfileForm />} />
              <Route path="/user/forms/users" element={<UsersForm />} />

              {/* User Reports */}
              <Route path="/user/reports/mfa-tokens" element={<MfaTokensReport />} />
              <Route path="/user/reports/password-resets" element={<PasswordResetsReport />} />
              <Route path="/user/reports/secrets" element={<SecretsReport />} />
              <Route path="/user/reports/token-audit-log" element={<TokenAuditLogReport />} />
              <Route path="/user/reports/user-login-history" element={<UserLoginHistoryReport />} />
              <Route path="/user/reports/user-profiles" element={<UserProfilesReport />} />
              <Route path="/user/reports/users" element={<UsersReport />} />

              {/* Employees Forms */}
              <Route path="/employees/forms/countries" element={<CountriesForm />} />
              <Route path="/employees/forms/locations" element={<LocationsForm />} />
              <Route path="/employees/forms/departments" element={<DepartmentsForm />} />
              <Route path="/employees/forms/employees" element={<EmployeesForm />} />
              <Route path="/employees/forms/job-history" element={<JobHistoryForm />} />

              {/* Employees Reports */}
              <Route path="/employees/reports/countries" element={<CountryReport />} />
              <Route path="/employees/reports/locations" element={<LocationReport />} />
              <Route path="/employees/reports/departments" element={<DepartmentReport />} />
              <Route path="/employees/reports/employees" element={<EmployeeReport />} />
              <Route path="/employees/reports/job-history" element={<JobHistoryReport />} />

              {/* Default fallback */}
              <Route path="*" element={<h3>Please select a module and then a form or report from the menu.</h3>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
