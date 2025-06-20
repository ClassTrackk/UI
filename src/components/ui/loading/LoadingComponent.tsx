import AnimatedImage from '../AnimatedImage';
export const LoadingComponent = () => {

  return (
    <div className="flex justify-center items-center p-4">
       <div className="mb-8">
          <AnimatedImage 
            src="/n3.png"
            alt="Logo animato"
            size = 'lg'
            animation="glow"
            speed="slow"
            className="mx-auto absolute top-65 left-230 z-12"
          />
        </div>
    </div>
  );
};