import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Config } from '../config';

interface AdminDataItem {
  id: string;
  name: string;
  email: string;
  text: string;
  sentiment?: string;
  createdAt: string;
}

function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminData, setAdminData] = useState<AdminDataItem[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Config.backendUrl}/admin/auth/login`, {
        email,
        password,
      });
      setToken(response.data.token);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Login failed. Check credentials.');
    }
  };

  const fetchAdminData = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await axios.get(`${Config.backendUrl}/admin/feedbacks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Safely extract the 'data' array from response
      if (response.data && Array.isArray(response.data.data)) {
        setAdminData(response.data.data);
      } else {
        setAdminData([]);
        setError('Invalid data format from server.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [token]);

  if (!token) {
    return (
      <div className="container mt-5">
        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="emailid" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="emailid"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordid" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordid"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Welcome, Admin!</h2>
      {loading ? (
        <p>Loading admin data...</p>
      ) : adminData.length > 0 ? (
        <div className="table-responsive">
          <button className="btn btn-primary my-3" onClick={fetchAdminData}>Refresh</button>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Text</th>
                <th>Sentiment</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {adminData.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.text}</td>
                  <td>{item.sentiment || 'N/A'}</td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No feedback data available.</p>
      )}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default AdminPage;
