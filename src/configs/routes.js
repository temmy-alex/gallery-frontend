import { lazy } from "react";

// Layout
const BlankLayout = lazy(() => import('../components/layout/BlankLayout'));
const HeaderLayout = lazy(() => import('../components/layout/HeaderLayout'));

// Pages
const HomePage = lazy(() => import('../pages/home.js'));
const AccountProfilePage = lazy(() => import('../pages/Account.js'));
const SignInPage = lazy(() => import('../pages/SignIn.js'));
const SignUpPage = lazy(() => import('../pages/SignUp.js'));

const appRoutes = [
    {
        path: '',
        element: <HeaderLayout />,
        children: [
            {path: '', element: <HomePage />}
        ],
    },
    {
        path: 'accounts',
        element: <HeaderLayout />,
        children: [
            {path: '', element: <AccountProfilePage />}
        ],
    },
    {
        path: 'auths',
        element: <BlankLayout />,
        children: [
            { path: 'sign-in', element: <SignInPage /> },
            { path: 'sign-up', element: <SignUpPage /> },
        ],
    }
];

export default appRoutes;