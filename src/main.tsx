import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store/store.ts';
import App from './App.tsx'
import './index.css'
import { loadWishlist } from './store/slices/wishlistSlice';

const preloadedWishlist = store.getState().wishlist.items;
if (preloadedWishlist) {
    store.dispatch(loadWishlist());
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
)