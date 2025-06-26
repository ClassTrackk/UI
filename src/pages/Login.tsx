import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { loginUser } from '../store/authThunks';
import { setUser } from '../store/authSlice'; 
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
  const [userId, setUserId] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showQuickLogin, setShowQuickLogin] = useState(false);

  useEffect(() => {
    if (isDevOrTest) {
      const autoLogin = async () => {
        try {
          await dispatch(loginUser({ email: 'test-user', password: 'test' })).unwrap();
          navigate('/');
        } catch (err) {
          console.log('Auto-login fallito:');
        }
      };
      autoLogin();
    }
  }, [dispatch, navigate]);

  const handleLogin = async () => {
    if (email.trim() && password.trim()) {
      try {
        await dispatch(loginUser({ email, password })).unwrap();
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/');
      } catch (err) {
        setLoginError('Login fallito: credenziali non valide o errore di rete. ');
      }
    }
  };

  const handleQuickLogin = async () => {
    if (userId.trim()) {
      try {
        const quickUser = { 
          id: parseInt(userId), 
          nome: `QuickUser`,
          cognome: `${userId}`,
          email: `quick-user-${userId}@example.com`, 
          ruolo: 'student',
          quickLogin: true 
        };
        dispatch(setUser(quickUser));
        
        await new Promise(resolve => setTimeout(resolve, 500));
        localStorage.setItem('quickLogin', 'true');
        localStorage.setItem('userId', userId);
        navigate('/');
      } catch (err) {
        setLoginError('Quick login fallito: ID non valido.');
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
      </div>
      <div className="mb-8">
        <AnimatedImage 
          src="/n6.png"
          alt="Logo animato"
          size="lg"
          animation="float"
          speed="slow"
          className="mx-auto absolute top-60 left-230 z-12"
        />
      </div>

      <div className="relative z-10 flex flex-col p-6 max-w-sm w-full mx-auto bg-green-100 bg-opacity-90 rounded-md border-3 border-green-600 outline-none dark:bg-white">
        <div className="flex-grow flex flex-col justify-center">
          {!showQuickLogin ? (
            <>
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
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mb-2"
              >
                Login
              </button>
              <button
                onClick={() => setShowQuickLogin(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm font-medium"
              >
                Quick Login (Solo ID)
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Inserisci ID utente"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                className="border border-gray-300 p-2 w-full mb-4 text-black rounded"
              />
              <button
                onClick={handleQuickLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-2 font-medium"
              >
                Accedi con ID
              </button>
              <button
                onClick={() => setShowQuickLogin(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition text-sm font-medium"
              >
                Torna al Login Normale
              </button>
            </>
          )}
        </div>
      </div>

      {loginError && (
        <div className="absolute bg-red-100 top-[140px] border-red-600 border-3 rounded-xl py-5 left-1/2 -translate-x-1/2 text-red-600 mt-2 text-center px-4 break-words dark:bg-white">
          {loginError}
        </div>
      )}

      <div className="absolute top-140 left-50 transform -translate-x-1/2 z-20">
        <h1 className="text-sm md:text-2xl font-bold text-green-600 dark:text-center">
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