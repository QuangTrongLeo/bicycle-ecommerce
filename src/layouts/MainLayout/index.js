import { Header, MainFooter, SecondFooter } from '../../components';
function MainLayout({ children }) {
  return (
    <div className="wrapper">
      <Header />

      <div className="content">{children}</div>

      <MainFooter />
      <SecondFooter />
    </div>
  );
}

export default MainLayout;
