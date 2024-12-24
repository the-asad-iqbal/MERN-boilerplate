import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { router } from '@/routes';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <AuthProvider>
      <div className="font-poppins">
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;
