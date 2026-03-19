import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Layout({ children, hideFooter = false }) {
  return (
    <div style={styles.wrapper}>
      <Header />
      <main style={styles.main}>{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#fff',
    color: '#111',
  },
  main: {
    width: '100%',
  },
};