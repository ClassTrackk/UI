import { Link, useLocation  } from 'react-router-dom';
import { DarkThemeToggle } from "flowbite-react";
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Group, Button} from '@mantine/core';
import AnimatedImage from './AnimatedImage';
export const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const handleLogout = () => dispatch(logout());

    return (
    <header className="absolute top-0 left-0 right-0 z-50 bg grid grid-cols-[1fr_auto_1fr] items-center p-4">
        <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-green-600">ClassTrack</h1>
        </div>
                <AnimatedImage 
                    src="/n4.png"
                    alt="Logo animato"
                    size="sm"
                    animation="scale"
                    speed="normal"
                    className="mx-auto absolute top-0 right-315 z-12"
                    />      
        {location.pathname !== '/login' && (
            <div>
                
                <Group
                gap="md"
                p="md"
                style={{
                    border: '1px solid',
                    borderColor: '#16a34a',
                    backgroundColor: 'transparent',
                    color: 'white',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                }}
                className="hover:shadow-[0_0_14px_2px_rgba(22,163,74,0.5)]"
                >
                {location.pathname === '/' ? (
                    <Link to="/Account" className="text-gray-500 hover:text-green-600 font-medium transition">
                    Account
                    </Link>
                ) : (
                    <Link to="/" className="text-gray-500 hover:text-green-600 font-medium transition">
                    Dashboard
                    </Link>
                )}
                </Group>
            </div>
            )}

        {location.pathname === '/login' && <div></div>}
        <Group gap="xs" justify="flex-end">
            {location.pathname !== '/login' && (
                <Button color="red" variant="outline" onClick={() => handleLogout()}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </Button>
            )}
            <DarkThemeToggle className='bg-white dark:bg-gray-900'/>
        </Group>
    </header>
    );
};

//   <header style={{ 
        //     display: 'grid', 
        //     gridTemplateColumns: '3fr auto 5fr', 
        //     alignItems: 'center',
        //     padding: '1rem'
        // }}>
        //     <h1 className="text-2xl font-bold text-green-600">ClassTrack</h1>
     
        //     <Group gap="md" 
        //            p="md" 
        //            style={{
        //                border: '1px solid white',
        //                backgroundColor: 'transparent',
        //                color: 'white',
        //                borderRadius: '8px',
        //                transition: 'all 0.3s ease'
        //            }}
        //            className="hover:shadow-[0_0_8px_2px_rgba(255,255,255,0.5)]">
        //         {location.pathname === '/Account' ? (
        //             <Link to="/" className="text-gray-700 hover:text-green-600 font-medium transition">
        //                 Dashboard
        //             </Link>
        //             ) : (
        //             <Link to="/Account" className="text-gray-700 hover:text-green-600 font-medium transition">
        //                 Account
        //             </Link>
        //         )}
        //     </Group>
            
        
        //     <Group gap="xs" justify="flex-end">
        //         <Button color="red" variant="outline" onClick={() => handleLogout()}>
        //             <FontAwesomeIcon icon={faRightFromBracket} />
        //         </Button>
        //         <DarkThemeToggle />
        //     </Group>
        // </header>







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
        