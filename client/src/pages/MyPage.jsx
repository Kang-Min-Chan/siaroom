import { getUser } from '../utils/auth';

function MyPage() {
  const user = getUser();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>MY PAGE</h1>
        <p style={styles.text}>이름: {user?.name || '-'}</p>
        <p style={styles.text}>이메일: {user?.email || '-'}</p>
        <p style={styles.text}>전화번호: {user?.phone || '-'}</p>
        <p style={styles.text}>주소: {user?.address || '-'}</p>
        <p style={styles.text}>상세주소: {user?.detail_address || '-'}</p>
        <p style={styles.text}>우편번호: {user?.postcode || '-'}</p>
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
    maxWidth: '500px',
    background: '#fff',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  },
  title: {
    margin: '0 0 20px',
    fontSize: '32px',
    textAlign: 'center',
    fontFamily: '"Times New Roman", Georgia, serif',
  },
  text: {
    fontSize: '16px',
    color: '#222',
    marginBottom: '12px',
  },
};

export default MyPage;