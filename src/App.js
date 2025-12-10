import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publishRoutes, userRoutes, adminRoutes } from './router';
import { MainLayout } from './layouts';
import { useSelector } from 'react-redux';
import { CartNotification } from '~/components';
import Toast from '~/components/Toast/Toast';

function App() {
    const { currentUser, isAuthenticated } = useSelector((state) => state.user);

    let routes = [...publishRoutes];
    if (isAuthenticated && currentUser) {
        routes = [...userRoutes];

        if (currentUser.role === 'admin') {
            routes = [...adminRoutes];
        }
    }

    return (
        <Router>
            <CartNotification />
            <Toast />
            <Routes>
                {routes.map((route, idx) => {
                    const Page = route.page;
                    const Layout = route.layout !== undefined ? route.layout || Fragment : MainLayout;

                    return (
                        <Route
                            key={idx}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
