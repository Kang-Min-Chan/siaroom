import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const displayPrice = product.sale_price || product.price;

  return (
    <Link to={`/products/${product.id}`} style={styles.link}>
      <div style={styles.card}>
        <div style={styles.imageWrap}>
          <img
            src={product.thumbnail_url}
            alt={product.name}
            style={styles.image}
          />
        </div>

        <div style={styles.content}>
          <h3 style={styles.name}>{product.name}</h3>

          {product.short_description ? (
            <p style={styles.desc}>{product.short_description}</p>
          ) : null}

          <div style={styles.priceBox}>
            {product.sale_price ? (
              <p style={styles.originalPrice}>{product.price.toLocaleString()}원</p>
            ) : null}
            <p style={styles.salePrice}>{displayPrice.toLocaleString()}원</p>
          </div>

          {product.is_sale ? <span style={styles.badge}>SALE</span> : null}
        </div>
      </div>
    </Link>
  );
}

const styles = {
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  card: {
    display: 'block',
  },
  imageWrap: {
    width: '100%',
    aspectRatio: '3 / 4',
    overflow: 'hidden',
    backgroundColor: '#f3f3f3',
    borderRadius: '8px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  content: {
    paddingTop: '14px',
  },
  name: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '600',
    color: '#111',
  },
  desc: {
    margin: '8px 0 0',
    fontSize: '14px',
    color: '#777',
    lineHeight: 1.5,
  },
  priceBox: {
    marginTop: '12px',
  },
  originalPrice: {
    margin: 0,
    fontSize: '14px',
    color: '#999',
    textDecoration: 'line-through',
  },
  salePrice: {
    margin: '4px 0 0',
    fontSize: '17px',
    fontWeight: '700',
    color: '#111',
  },
  badge: {
    display: 'inline-block',
    marginTop: '10px',
    fontSize: '12px',
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#111',
    padding: '4px 8px',
    borderRadius: '999px',
  },
};