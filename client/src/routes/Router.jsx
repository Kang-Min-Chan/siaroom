import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import Layout from '../layouts/Layout';

function PlaceholderPage({ title }) {
  return (
    <Layout>
      <section style={styles.placeholder}>
        <p style={styles.kicker}>SIAROOM</p>
        <h1 style={styles.title}>{title}</h1>
        <p style={styles.desc}>이 페이지는 다음 단계에서 구현할 예정입니다.</p>
      </section>
    </Layout>
  );
}

function HomePage() {
  return (
    <Layout hideFooter>
      <Home />
    </Layout>
  );
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Layout><Products /></Layout>} />
        <Route path="/products/:id" element={<Layout><ProductDetail /></Layout>} />
        <Route path="/best" element={<PlaceholderPage title="BEST" />} />
        <Route path="/new" element={<PlaceholderPage title="NEW" />} />
        <Route path="/bottom" element={<PlaceholderPage title="BOTTOM" />} />
        <Route path="/top" element={<PlaceholderPage title="TOP" />} />
        <Route path="/outer" element={<PlaceholderPage title="OUTER" />} />
        <Route path="/knit" element={<PlaceholderPage title="KNIT" />} />
        <Route path="/shirt" element={<PlaceholderPage title="SHIRT" />} />
        <Route path="/ops-sk" element={<PlaceholderPage title="OPS / SK" />} />
        <Route path="/acc" element={<PlaceholderPage title="ACC" />} />
        <Route path="/sale" element={<PlaceholderPage title="SALE" />} />
        <Route path="/community" element={<PlaceholderPage title="COMMUNITY" />} />
        <Route path="/mypage" element={<PlaceholderPage title="MY PAGE" />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  placeholder: {
    minHeight: '100vh',
    padding: '160px 24px 80px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  kicker: {
    margin: 0,
    fontSize: '13px',
    letterSpacing: '2px',
    color: '#999',
  },
  title: {
    margin: '14px 0 0',
    fontSize: '58px',
    color: '#111',
    fontFamily: '"Times New Roman", Georgia, serif',
  },
  desc: {
    margin: '16px 0 0',
    fontSize: '16px',
    color: '#666',
  },
};