import { useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await api.post('/auth/signup', { email, password }); alert('Success!'); navigate('/login'); }
    catch (err) { alert('Registration failed'); }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-2 border rounded" onChange={e => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" className="w-full p-2 border rounded" onChange={e => setPassword(e.target.value)}/>
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Sign Up</button>
        </form>
        <p className="mt-4 text-center text-sm">Have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
      </div>
    </div>
  );
};
export default Register;