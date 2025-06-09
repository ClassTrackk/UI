import { Link } from 'react-router-dom';
import { DarkThemeToggle } from "flowbite-react";
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Group, Button} from '@mantine/core';

export const Header = () => {
    const dispatch = useDispatch()
    const handleLogout = () => dispatch(logout());

    return (
        <header style={{ 
            display: 'grid', 
            gridTemplateColumns: '3fr auto 5fr', 
            alignItems: 'center',
            padding: '1rem'
        }}>
            <h1 className="text-2xl font-bold text-green-600">ClassTrack</h1>
     
            <Group gap="md" 
                   p="md" 
                   style={{
                       border: '1px solid white',
                       backgroundColor: 'transparent',
                       color: 'white',
                       borderRadius: '8px',
                       transition: 'all 0.3s ease'
                   }}
                   className="hover:shadow-[0_0_8px_2px_rgba(255,255,255,0.5)]">
                <Link to="/" className="text-gray-700 hover:text-green-600 font-medium transition">
                    Dashboard
                </Link>
                <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium transition">
                    Login
                </Link>
                <Link to="/register" className="text-gray-700 hover:text-green-600 font-medium transition">
                    Register
                </Link>
            </Group>
            
        
            <Group gap="xs" justify="flex-end">
                <Button color="red" variant="outline" onClick={() => handleLogout()}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </Button>
                <DarkThemeToggle />
            </Group>
        </header>
    );
};





// export const Header = () => {
//     const dispatch = useDispatch()
//     const handleLogout = () => dispatch(logout());

//   return (
//     <header className= "">
//       <h1 className="absolute top-4 left-4 text-2xl font-bold text-green-600">ClassTrack</h1>
//       <nav className="space-x-4 absolute top-4  border border-white bg-transparent text-white rounded outline-none transition duration-300 hover:border-white hover:shadow-[0_0_8px_2px_rgba(255,255,255,0.5)] px-6 py-4 ">
//         <Link to="/" className="text-gray-700 hover:text-green-600 font-medium transition">
//           Dashboard
//         </Link>
//         <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium transition">
//           Login
//         </Link>
//         <Link to="/register" className="text-gray-700 hover:text-green-600 font-medium transition">
//           Register
//         </Link>
//       </nav>
//       <div className='absolute top-4 right-8 flex items-center gap-2'>
//           <Button color="red" outline onClick={() => handleLogout}>
//           <FontAwesomeIcon icon={faRightFromBracket} />
//         </Button>
//         <DarkThemeToggle />
//       </div>
//     </header>
//   );
// };


      {/* <div className="absolute inset-0 size-full">  className="w-full p-2 mb-4 border border-white bg-transparent text-white rounded outline-none transition duration-300 hover:border-white hover:shadow-[0_0_8px_2px_rgba(255,255,255,0.5)]"
p-2 mb-4 border border-white bg-transparent text-white rounded outline-none transition duration-300 hover:border-white hover:shadow-[0_0_8px_2px_rgba(255,255,255,0.5)] px-6 py-4 flex items-top justify-between"
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