import AnimatedImage from '../AnimatedImage';
export const FullScreenLoader = ({ message = "Caricamento..." }) => (
  <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-50">
    <div className="mb-8">
          <AnimatedImage 
            src="/public/n3.png"
            alt="Logo animato"
            size = 'lg'
            animation="glow"
            speed="slow"
            className="mx-auto absolute top-65 left-230 z-12"
          />
    </div>
    <p className="text-gray-600 text-lg mt-4">{message}</p>
  </div>
);