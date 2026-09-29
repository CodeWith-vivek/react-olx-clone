import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/index.css'
import App from '@/app/App.jsx'
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { ItemsContextProvider } from "@/features/items/context/ItemsContext";
import { BrowserRouter } from 'react-router-dom'
import { WishlistProvider } from "@/features/wishlist/context/WishlistContext";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ItemsContextProvider>
      <AuthProvider>
        <WishlistProvider>
        <StrictMode>
          <App />

        </StrictMode>
        </WishlistProvider>
      </AuthProvider>
    </ItemsContextProvider>
  </BrowserRouter>
);
