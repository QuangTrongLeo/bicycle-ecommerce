import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publishRoutes } from './router';
import { MainLayout } from './layouts';

function App() {
    return (
        <Router>
            <Routes>
                {publishRoutes.map((route, idx) => {
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
