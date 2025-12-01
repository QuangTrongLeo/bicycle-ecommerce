import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publishRoutes } from './router';

import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <div
                className="app-wrapper"
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <Navigation />

                <div style={{ flex: 1 }}>
                    <Routes>
                        {publishRoutes.map((route, idx) => {
                            const Page = route.page;
                            const Layout = route.layout !== undefined ? route.layout || Fragment : Fragment;

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
                </div>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
