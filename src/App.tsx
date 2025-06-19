import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { LoadingProvider } from './context/LoadingContext';

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-24 dark:bg-gray-900">       
    <LoadingProvider>    
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </LoadingProvider>
    </main>
  );
}