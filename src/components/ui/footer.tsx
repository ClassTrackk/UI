
import { useState } from 'react';
import { InfoCard } from './infoCard';

const infoMap: Record<string, React.ReactNode> = {
  Credit: (
    <>
      <p><strong>Powered by</strong></p>
      <br />
      <p>Alessandro Madaschi</p>
      <p>Michele Boninelli</p>
      <p>Nikolaj Aprea</p>
    </>
  ),
  'Privacy Policy': 'Rispettiamo la tua privacy. I tuoi dati non saranno condivisi.',
  Licensing: 'Open source sotto licenza MIT.',
};

export const Footer = () => {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  return (
    <>
      <footer className="flex justify-center items-center bottom-0 content-center bg-green-100 rounded-lg shadow-sm  dark:bg-gray-800 z-10">
        <div className=" mx-auto max-w-screen-xl p-4 md:flex md:items-center ">
          <span className="text-sm text-green-600 sm:text-center dark:text-green-600 mr-10">
            © 2025 <a href="https://github.com/ClassTrackk" className="hover:underline">Github™</a>
          </span>
          <ul className="flex items-center mt-3 text-sm font-medium text-green-600 dark:text-green-600 sm:mt-0">
            {Object.keys(infoMap).map((label) => (
              <li key={label}>
                <button
                  onClick={() => setSelectedLabel(label)}
                  className="hover:underline me-4 md:me-6 focus:outline-none"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </footer>

      {selectedLabel && (
        <InfoCard
          content={infoMap[selectedLabel]}
          onClose={() => setSelectedLabel(null)}
        />
      )}
    </>
  );
};
