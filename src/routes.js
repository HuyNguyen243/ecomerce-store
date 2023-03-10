import React from 'react';
import Login from './Login';
import Shop from './modules/shops/Shop';
import Notfound from './404';
import Cart from './modules/shops/cart/Cart';
import UserAddress from './modules/shops/userInformation/userAddress';
import Newaddress from './modules/shops/userInformation/Newaddress';
import OrderConfirm from './modules/shops/order/OrderConfirm';
import Detail from './modules/shops/product/Detail';
import OrderForm from './modules/shops/order/OrderForm';
// import List from './modules/shops/List';
import OrderProduct from './modules/shops/order/OrderProduct';
import InfoProductShipping from './modules/shops/order/InfoProductShipping';
import ListCategory from './modules/shops/category/List';
import ProductMostview from './modules/shops/product/ProductMostview';
import Preferential from './modules/shops/Preferential';

export const routes = [
    {
        path: "/login",
        exact: true,
        isAuth: false,
        main: () => <Login/>
    },
    {
        path: "/",
        exact: true,
        isAuth: true,
        main: () => <Shop/>
    },
    {
        path: "/not-found",
        exact: true,
        isAuth: true,
        main: () => <Notfound/>
    },
    {
        path: "/cart",
        exact: true,
        isAuth: true,
        main: () => <Cart/>
    },
    {
        path: "/user-address",
        exact: true,
        isAuth: true,
        main: () => <UserAddress/>
    },
    {
        path: "/news-address",
        exact: true,
        isAuth: true,
        main: () => <Newaddress/>
    },
    {
        path: "/order-confirmation",
        exact: true,
        isAuth: true,
        main: () => <OrderConfirm/>
    },
    {
        path: "/order-infomation",
        exact: true,
        isAuth: true,
        main: () => <OrderForm/>
    },
    // {
    //     path: "/products",
    //     exact: true,
    //     isAuth: true,
    //     main: () => <List/>
    // },
    {
        path: "/product/:id",
        exact: true,
        isAuth: true,
        main: () => <Detail/>
    },
    {
        path: "/orders",
        exact: true,
        isAuth: true,
        main: () => <OrderProduct/>
    },
    {
        path: "/orders/:id",
        exact: true,
        isAuth: true,
        main: () => <InfoProductShipping/>
    },
    {
        path: "/categories/:id",
        exact: true,
        isAuth: true,
        main: () => <ListCategory/>
    },
    {
        path: "/products",
        exact: true,
        isAuth: true,
        main: () => <ProductMostview />
    },
    {
        path: "/preferential",
        exact: true,
        isAuth: true,
        main: () => <Preferential />
    },
    
]