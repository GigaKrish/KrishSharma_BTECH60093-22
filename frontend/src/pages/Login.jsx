import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await login(email, password); navigate('/'); }
    catch (err) { alert('Login failed'); }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-2 border rounded" onChange={e => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" className="w-full p-2 border rounded" onChange={e => setPassword(e.target.value)}/>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
        </form>
        <p className="mt-4 text-center text-sm">No account? <Link to="/register" className="text-blue-600">Sign up</Link></p>
      </div>
    </div>
  );
};
export default Login;