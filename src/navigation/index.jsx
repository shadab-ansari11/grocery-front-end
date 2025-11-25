import { useEffect, useState, Suspense } from 'react';
import Profile from '../pages/profile/Profile';
import { Route, Routes, Navigate } from 'react-router-dom';
import useUserInfo from '../hooks/useUserInfo';
import * as AuthLoadable from './ScreenContainer/AuthLoad';
import * as ShopLoadable from './ScreenContainer/ShopLoad';
import LandingPage from '../components/LandingPage';
import Header from '../components/Header';
import Loader from '../components/Loader';
import AppRoutes from './appRoutes';

function Application() {
  const { isLoggedIn } = useUserInfo();
  const [spinnerLoad, setSpinnerLoad] = useState(true);
console.log("isLoggedIn", isLoggedIn)
  useEffect(() => {
    const timer = setTimeout(() => setSpinnerLoad(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const routes = isLoggedIn ? (
    <>
      <Route path={AppRoutes.HOME} element={<ShopLoadable.Home />} />
      <Route path={AppRoutes.PRODUCTS} element={<ShopLoadable.ProductList />} />
      <Route path={AppRoutes.PRODUCT_DETAIL} element={<ShopLoadable.ProductDetail />} />
      <Route path={AppRoutes.CART} element={<ShopLoadable.Cart />} />
      <Route path={AppRoutes.CHECKOUT} element={<ShopLoadable.Checkout />} />
      <Route path={AppRoutes.ORDERS} element={<ShopLoadable.Orders />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to={AppRoutes.HOME} replace />} />
    </>
  ) : (
    <>
      <Route path={AppRoutes.HOME} element={<LandingPage />} />
      <Route path={AppRoutes.LOGIN} element={<AuthLoadable.Login />} />
      <Route path={AppRoutes.REGISTER} element={<AuthLoadable.Register />} />
      <Route path="*" element={<Navigate to={AppRoutes.HOME} replace />} />
    </>
  );

  return (
    <>
      {isLoggedIn && <Header />}
      <Suspense fallback={spinnerLoad ? <Loader /> : null}>
        <Routes>{routes}</Routes>
      </Suspense>
    </>
  );
}

export default Application;
