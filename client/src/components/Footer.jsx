export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <h3 style={styles.logo}>SIAROOM</h3>
        <p style={styles.text}>여성의류 쇼핑몰</p>
        <p style={styles.text}>© 2026 SIAROOM. All rights reserved.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: '80px',
    borderTop: '1px solid #e5e5e5',
    backgroundColor: '#fafafa',
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  logo: {
    margin: 0,
    fontSize: '20px',
    color: '#111',
  },
  text: {
    margin: '8px 0 0',
    color: '#666',
    fontSize: '14px',
  },
};