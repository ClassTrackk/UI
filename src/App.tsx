import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppRoutes from './routes';


export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-24 dark:bg-gray-900">   
         <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </main>
  );
}
      {/* <div className="absolute inset-0 size-full">
        <div className="relative h-full w-full select-none">
          <img
            className="absolute right-0 min-w-dvh dark:hidden"
            alt="Pattern Light"
            src="/pattern-light.svg"
          />
          <img
            className="absolute right-0 hidden min-w-dvh dark:block"
            alt="Pattern Dark"
            src="/pattern-dark.svg"
          />
        </div>
      </div> */}