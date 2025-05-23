import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./Context/Auth.jsx";
import { ItemsContextProvider } from "./Context/item.jsx";
import { BrowserRouter } from 'react-router-dom'
import { WishlistProvider } from "./Context/Wishlist.jsx";


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
