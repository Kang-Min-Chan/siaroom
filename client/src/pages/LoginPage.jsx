import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
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

    try {
      setLoading(true);

      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || '로그인에 실패했습니다.');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.dispatchEvent(new Event('cartUpdated'));
      alert('로그인되었습니다.');
      navigate('/best');
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
        <h1 style={styles.title}>LOGIN</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
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

          {message && <p style={styles.message}>{message}</p>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <p style={styles.bottomText}>
          아직 회원이 아니신가요?{' '}
          <Link to="/signup" style={styles.link}>
            회원가입
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

export default LoginPage;