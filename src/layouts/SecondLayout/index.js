import { Header, SecondFooter } from '../../components';
function SecondLayout({ children }) {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">{children}</div>
      <SecondFooter />
    </div>
  );
}

export default SecondLayout;
