import { useEffect, useState } from 'react';
import { fetchCart, updateCart, deleteCart } from '../services/cartService';

function CartPage() {
  const [items, setItems] = useState([]);

  const loadCart = async () => {
    try {
      const data = await fetchCart();
      setItems(data.items || []);
    } catch (error) {
      console.error(error);
      alert('장바구니 불러오기 실패');
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleIncrease = async (id, quantity) => {
    await updateCart(id, quantity + 1);
    loadCart();
  };

  const handleDelete = async (id) => {
    await deleteCart(id);
    loadCart();
  };

  return (
    <div style={{ padding: '120px 40px' }}>
      <h1>장바구니</h1>

      {items.length === 0 ? (
        <p>장바구니에 상품이 없습니다.</p>
      ) : (
        items.map((item) => (
          <div
            key={item.cart_item_id}
            style={{
              border: '1px solid #ddd',
              padding: '16px',
              marginBottom: '12px',
            }}
          >
            <p>상품명: {item.product_name}</p>
            <p>가격: {item.price}원</p>
            <p>옵션: {item.color} / {item.size}</p>
            <p>수량: {item.quantity}</p>

            <button onClick={() => handleIncrease(item.cart_item_id, item.quantity)}>
              +1
            </button>

            <button onClick={() => handleDelete(item.cart_item_id)}>
              삭제
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default CartPage;