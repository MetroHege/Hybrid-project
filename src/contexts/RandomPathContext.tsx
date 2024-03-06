import {useState, useEffect, createContext, useContext} from 'react';

// Create a context for the random path
const RandomPathContext = createContext<string | null>(null);

// Provider component that provides the random path to its children
export const RandomPathProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [randomPath, setRandomPath] = useState(generateRandomString(100));

  useEffect(() => {
    const interval = setInterval(
      () => {
        setRandomPath(generateRandomString(100));
      },
      5 * 60 * 1000,
    ); // 5 minutes

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <RandomPathContext.Provider value={randomPath}>
      {children}
    </RandomPathContext.Provider>
  );
};

// Hook to use the random path context
export const useRandomPath = () => {
  const context = useContext(RandomPathContext);
  if (context === null) {
    throw new Error('useRandomPath must be used within a RandomPathProvider');
  }
  return context;
};

// Function to generate a random string of a specific length
function generateRandomString(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export default RandomPathContext;
