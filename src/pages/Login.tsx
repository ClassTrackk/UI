import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { loginUser } from '../store/authThunks';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/ui/header';

const isDevOrTest = import.meta.env.MODE !== 'production';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isDevOrTest) {
      const autoLogin = async () => {
        try {
          await dispatch(loginUser({ email: 'test-user', password: 'test' })).unwrap();
          navigate('/');
        } catch (err) {
          console.error('Auto-login fallito:', err);
        }
      };
      autoLogin();
    }
  }, [dispatch, navigate]);

  const handleLogin = async () => {
    if (email.trim() && password.trim()) {
      try {
        await dispatch(loginUser({ email, password })).unwrap();
        navigate('/');
      } catch (err) {
        alert(`Login fallito: ${err || 'Errore sconosciuto'}`);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col p-6 max-w-sm mx-auto bg-blue-900 text-white rounded-md outline-none">
        <div className="flex-grow flex flex-col justify-center">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border border-gray-300 p-2 w-full mb-4 text-black rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full mb-4 text-black rounded"
          />
          <button
            onClick={handleLogin}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;