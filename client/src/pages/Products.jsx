import { useEffect, useState } from 'react';
import { getProducts } from '../api/productApi';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProducts();
        setProducts(result.data || []);
      } catch (error) {
        console.error('상품 목록 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section style={styles.wrapper}>
      <div style={styles.top}>
        <h1 style={styles.title}>전체상품</h1>
        <p style={styles.count}>총 {products.length}개 상품</p>
      </div>

      {loading ? (
        <p>상품을 불러오는 중입니다...</p>
      ) : (
        <div style={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

const styles = {
  wrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '120px 20px 80px',
  },
  top: {
    marginBottom: '28px',
  },
  title: {
    margin: 0,
    fontSize: '32px',
    color: '#111',
  },
  count: {
    margin: '10px 0 0',
    color: '#666',
    fontSize: '14px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '28px 20px',
  },
};