import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    address: '',
    detail_address: '',
    postcode: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!form.name || !form.email || !form.password || !form.passwordConfirm) {
      setMessage('이름, 이메일, 비밀번호, 비밀번호 확인은 필수입니다.');
      return;
    }

    if (form.password !== form.passwordConfirm) {
      setMessage('비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
          address: form.address,
          detail_address: form.detail_address,
          postcode: form.postcode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || '회원가입에 실패했습니다.');
        return;
      }

      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setMessage('서버 연결 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>SIGN UP</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            value={form.passwordConfirm}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="phone"
            placeholder="전화번호"
            value={form.phone}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="address"
            placeholder="주소"
            value={form.address}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="detail_address"
            placeholder="상세주소"
            value={form.detail_address}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="postcode"
            placeholder="우편번호"
            value={form.postcode}
            onChange={handleChange}
            style={styles.input}
          />

          {message && <p style={styles.message}>{message}</p>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <p style={styles.bottomText}>
          이미 계정이 있으신가요?{' '}
          <Link to="/login" style={styles.link}>
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f7f7f7',
    padding: '40px 20px',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    background: '#fff',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  },
  title: {
    margin: '0 0 24px',
    fontSize: '32px',
    textAlign: 'center',
    fontFamily: '"Times New Roman", Georgia, serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  input: {
    height: '50px',
    padding: '0 14px',
    borderRadius: '12px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none',
  },
  button: {
    height: '50px',
    border: 'none',
    borderRadius: '12px',
    background: '#111',
    color: '#fff',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  message: {
    margin: 0,
    color: '#d00',
    fontSize: '14px',
  },
  bottomText: {
    marginTop: '18px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#555',
  },
  link: {
    color: '#111',
    textDecoration: 'none',
    fontWeight: 600,
  },
};

export default SignupPage;