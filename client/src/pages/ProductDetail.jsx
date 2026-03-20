import { useEffect, useState } from 'react';
<<<<<<< HEAD
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../api/productApi';

export default function ProductDetail() {
  const { id } = useParams();
=======
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetail } from '../api/productApi';
import { addCart } from '../services/cartService';
import { isLoggedIn } from '../utils/auth';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
>>>>>>> 4124635 (3월20일 1차)
  const [data, setData] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const result = await getProductDetail(id);
<<<<<<< HEAD
=======
        console.log('상품상세 응답:', result);
>>>>>>> 4124635 (3월20일 1차)
        setData(result.data);
      } catch (error) {
        console.error('상품 상세 조회 실패:', error);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (!data) {
<<<<<<< HEAD
    return <div style={{ padding: '140px 20px' }}>상품 정보를 불러오는 중입니다...</div>;
  }

  const { product, images, options, reviews, inquiries } = data;
  const displayPrice = product.sale_price || product.price;
=======
  return <div style={{ padding: '140px 20px' }}>상품 정보를 불러오는 중입니다...</div>;
  }

  if (!data.product) {
    return <div style={{ padding: '140px 20px' }}>상품 데이터 구조를 확인해주세요.</div>;
  }
    const product = data.product;
    const images = data.images || data.product?.images || [];
    const options = data.options || data.product?.options || [];
    const reviews = data.reviews || [];
    const inquiries = data.inquiries || [];
  
  const displayPrice = product.sale_price || product.price;
  const handleAddCart = async () => {
    if (!isLoggedIn()) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    if (!selectedOption) {
      alert('옵션을 선택해주세요.');
      return;
    }

    try {
      await addCart({
        product_option_id: Number(selectedOption),
        quantity: 1,
      });

      window.dispatchEvent(new Event('cartUpdated'));
      alert('장바구니에 추가되었습니다.');
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
      alert(error?.response?.data?.message || '장바구니 추가에 실패했습니다.');
    }
  };
>>>>>>> 4124635 (3월20일 1차)

  return (
    <div style={styles.page}>
      <section style={styles.wrapper}>
        <div style={styles.left}>
          <img
            src={product.thumbnail_url}
            alt={product.name}
            style={styles.mainImage}
          />

          <div style={styles.detailImages}>
            {images?.map((image) => (
              <img
                key={image.id}
                src={image.image_url}
                alt={product.name}
                style={styles.subImage}
              />
            ))}
          </div>
        </div>

        <div style={styles.right}>
          <p style={styles.category}>{product.category_name}</p>
          <h1 style={styles.name}>{product.name}</h1>
          <p style={styles.shortDesc}>{product.short_description}</p>

          {product.sale_price ? (
            <p style={styles.originalPrice}>{product.price.toLocaleString()}원</p>
          ) : null}

          <p style={styles.price}>{displayPrice.toLocaleString()}원</p>

          <div style={styles.infoBox}>
            <p><strong>소재</strong> {product.fabric || '-'}</p>
            <p><strong>모델정보</strong> {product.model_info || '-'}</p>
            <p><strong>사이즈정보</strong> {product.size_info || '-'}</p>
            <p><strong>세탁정보</strong> {product.washing_info || '-'}</p>
          </div>

          <div style={styles.optionBox}>
            <label style={styles.label}>옵션 선택</label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              style={styles.select}
            >
              <option value="">옵션을 선택하세요</option>
              {options?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.color} / {option.size} / 재고 {option.stock}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.buttonRow}>
<<<<<<< HEAD
            <button style={styles.cartButton}>장바구니</button>
=======
            <button style={styles.cartButton} onClick={handleAddCart}>
              장바구니
            </button>
>>>>>>> 4124635 (3월20일 1차)
            <button style={styles.buyButton}>바로구매</button>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>상품 설명</h2>
        <p style={styles.description}>{product.description}</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>리뷰</h2>
        {reviews?.length ? (
          reviews.map((review) => (
            <div key={review.id} style={styles.reviewItem}>
              <p style={styles.reviewTop}>
                {review.user_name} / 평점 {review.rating}
              </p>
              <p style={styles.reviewText}>{review.content}</p>
              <p style={styles.reviewMeta}>
                {review.selected_color || '-'} / {review.selected_size || '-'}
              </p>
            </div>
          ))
        ) : (
          <p>등록된 리뷰가 없습니다.</p>
        )}
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>문의</h2>
        {inquiries?.length ? (
          inquiries.map((inquiry) => (
            <div key={inquiry.id} style={styles.reviewItem}>
              <p style={styles.reviewTop}>{inquiry.user_name}</p>
              <p style={styles.reviewText}>{inquiry.title}</p>
              <p style={styles.reviewMeta}>{inquiry.content}</p>
              {inquiry.answer ? (
                <p style={styles.answer}>답변: {inquiry.answer}</p>
              ) : null}
            </div>
          ))
        ) : (
          <p>등록된 문의가 없습니다.</p>
        )}
      </section>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '120px 20px 80px',
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '48px',
    alignItems: 'start',
  },
  left: {},
  right: {
    position: 'sticky',
    top: '100px',
  },
  mainImage: {
    width: '100%',
    borderRadius: '12px',
    display: 'block',
    backgroundColor: '#f5f5f5',
  },
  detailImages: {
    display: 'grid',
    gap: '16px',
    marginTop: '20px',
  },
  subImage: {
    width: '100%',
    borderRadius: '12px',
    display: 'block',
    backgroundColor: '#f5f5f5',
  },
  category: {
    margin: 0,
    color: '#777',
    fontSize: '14px',
  },
  name: {
    margin: '10px 0 0',
    fontSize: '34px',
    color: '#111',
  },
  shortDesc: {
    margin: '14px 0 0',
    fontSize: '15px',
    color: '#666',
    lineHeight: 1.6,
  },
  originalPrice: {
    margin: '24px 0 0',
    fontSize: '16px',
    color: '#999',
    textDecoration: 'line-through',
  },
  price: {
    margin: '8px 0 0',
    fontSize: '30px',
    fontWeight: '700',
    color: '#111',
  },
  infoBox: {
    marginTop: '24px',
    padding: '20px',
    backgroundColor: '#fafafa',
    borderRadius: '12px',
    lineHeight: 1.8,
    color: '#444',
    fontSize: '14px',
  },
  optionBox: {
    marginTop: '24px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
  },
  select: {
    width: '100%',
    height: '48px',
    padding: '0 14px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  buttonRow: {
    display: 'flex',
    gap: '12px',
    marginTop: '20px',
  },
  cartButton: {
    flex: 1,
    height: '52px',
    borderRadius: '10px',
    border: '1px solid #111',
    backgroundColor: '#fff',
    color: '#111',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  buyButton: {
    flex: 1,
    height: '52px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#111',
    color: '#fff',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  section: {
    marginTop: '64px',
  },
  sectionTitle: {
    margin: '0 0 20px',
    fontSize: '26px',
    color: '#111',
  },
  description: {
    color: '#555',
    lineHeight: 1.8,
  },
  reviewItem: {
    padding: '18px 0',
    borderBottom: '1px solid #eee',
  },
  reviewTop: {
    margin: 0,
    fontWeight: '600',
    color: '#111',
  },
  reviewText: {
    margin: '8px 0 0',
    color: '#444',
  },
  reviewMeta: {
    margin: '8px 0 0',
    color: '#888',
    fontSize: '14px',
  },
  answer: {
    margin: '10px 0 0',
    color: '#222',
    backgroundColor: '#fafafa',
    padding: '12px',
    borderRadius: '10px',
  },
};