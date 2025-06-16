import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { loginUser } from '../store/authThunks';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/ui/header';
import AnimatedImage from '../components/ui/AnimatedImage';

import TypewriterText from '../components/ui/typewriterText';
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
    
      <div className="">
       <img 
          src="/wallpaperbaseDM2.png" 
          alt="Wallpaper DM" 
          className="hidden absolute top-0 right-0 object-cover bg-auto bg-center max-h-screen dark:block" 
        />
        <img 
          src="/wallpaperbaseWM2.png" 
          alt="Wallpaper WM" 
          className="block absolute top-0 right-0 object-cover bg-auto bg-center max-h-screen  dark:hidden" 
        />
      <Header />
      <div className="mb-8">
          <AnimatedImage 
            src="/public/n6.png"
            alt="Logo animato"
            size="lg"
            animation="float"
            speed="slow"
            className="mx-auto absolute top-65 left-230 z-12"
          />
        </div>
      <div className="relative z-10 flex flex-col p-6 max-w-sm bg-green-100 bg-opacity-90 rounded-md border-3 border-green-600 mx-auto text-white outline-none dark:bg-white">
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
       <div className="absolute top-140 left-50 transform -translate-x-1/2 z-20">
        <h1 className="text-sm md:text-2xl font-bold text-green-600 dark: text-center">
          <TypewriterText 
            text="Accedi a ClassTrack"
            typingSpeed={100}
            deletingSpeed={70}
            pauseAfterTyping={3000}
            pauseAfterDeleting={1500}
          />
        </h1>
      </div>
    </div>
  );
};

export default Login;