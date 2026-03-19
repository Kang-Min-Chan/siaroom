import { useEffect, useState } from 'react';

export default function Home() {
  const heroSets = [
    {
      left: '/images/hero/hero1.jpg',
      center: '/images/hero/hero2.jpg',
      right: '/images/hero/hero3.jpg',
      season: '2026 SPRING COLLECTION',
      title: 'SIAROOM',
      subtitle: 'modern feminine archive',
      index: '01',
    },
    {
      left: '/images/hero/hero2.jpg',
      center: '/images/hero/hero3.jpg',
      right: '/images/hero/hero1.jpg',
      season: 'NEW SEASON DROP',
      title: 'SIAROOM',
      subtitle: 'cozy mood daily wear',
      index: '02',
    },
    {
      left: '/images/hero/hero3.jpg',
      center: '/images/hero/hero1.jpg',
      right: '/images/hero/hero2.jpg',
      season: 'SIGNATURE LOOKBOOK',
      title: 'SIAROOM',
      subtitle: 'structured casual edit',
      index: '03',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSets.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSets.length]);

  const currentSet = heroSets[currentIndex];

  return (
    <section style={styles.hero}>
      <div style={styles.columns}>
        <div style={{ ...styles.column, ...styles.leftColumn }}>
          <div
            style={{
              ...styles.imagePanel,
              backgroundImage: `url(${currentSet.left})`,
            }}
          />
          <div style={styles.sideShade} />
        </div>

        <div style={{ ...styles.column, ...styles.centerColumn }}>
          <div
            style={{
              ...styles.imagePanel,
              backgroundImage: `url(${currentSet.center})`,
            }}
          />
          <div style={styles.centerShade} />
        </div>

        <div style={{ ...styles.column, ...styles.rightColumn }}>
          <div
            style={{
              ...styles.imagePanel,
              backgroundImage: `url(${currentSet.right})`,
            }}
          />
          <div style={styles.sideShade} />
        </div>
      </div>

      <div style={styles.globalOverlay} />

      <div style={styles.leftMeta}>
        <span style={styles.metaLine} />
        <p style={styles.metaText}>{currentSet.season}</p>
      </div>

      <div style={styles.rightMeta}>
        <p style={styles.indexText}>{currentSet.index}</p>
      </div>

      <div style={styles.centerTextWrap}>
        <p style={styles.kicker}>WOMEN'S DAILY LOOKBOOK</p>
        <h1 style={styles.title}>{currentSet.title}</h1>
        <p style={styles.subtitle}>{currentSet.subtitle}</p>
      </div>

      <div style={styles.bottomBar}>
        <div style={styles.progressWrap}>
          {heroSets.map((_, idx) => (
            <span
              key={idx}
              style={{
                ...styles.progressDot,
                opacity: currentIndex === idx ? 1 : 0.35,
                transform: currentIndex === idx ? 'scaleX(1.25)' : 'scaleX(1)',
              }}
            />
          ))}
        </div>

        <div style={styles.bottomCaption}>
          <span style={styles.captionLine} />
          <p style={styles.captionText}>CURATED EDIT FOR MODERN WOMEN</p>
        </div>
      </div>
    </section>
  );
}

const styles = {
  hero: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#111',
  },
  columns: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.15fr 0.95fr',
    width: '100%',
    height: '100%',
  },
  column: {
    position: 'relative',
    height: '100%',
    overflow: 'hidden',
  },
  leftColumn: {
    borderRight: '1px solid rgba(255,255,255,0.08)',
  },
  centerColumn: {
    borderRight: '1px solid rgba(255,255,255,0.08)',
  },
  rightColumn: {},
  imagePanel: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    transform: 'scale(1.02)',
    transition: 'background-image 0.8s ease-in-out, transform 1.2s ease',
  },
  sideShade: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0,0,0,0.18)',
  },
  centerShade: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0,0,0,0.08)',
  },
  globalOverlay: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.10) 22%, rgba(0,0,0,0.04) 45%, rgba(0,0,0,0.22) 100%)',
    zIndex: 2,
    pointerEvents: 'none',
  },
  leftMeta: {
    position: 'absolute',
    left: '38px',
    top: '120px',
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  metaLine: {
    width: '40px',
    height: '1px',
    background: 'rgba(255,255,255,0.65)',
  },
  metaText: {
    margin: 0,
    color: 'rgba(255,255,255,0.9)',
    fontSize: '12px',
    letterSpacing: '2px',
  },
  rightMeta: {
    position: 'absolute',
    right: '38px',
    top: '120px',
    zIndex: 3,
  },
  indexText: {
    margin: 0,
    color: 'rgba(255,255,255,0.72)',
    fontSize: '52px',
    fontWeight: 300,
    lineHeight: 1,
    fontFamily: '"Times New Roman", Georgia, serif',
  },
  centerTextWrap: {
  position: 'absolute',
  left: '50%',
  top: '58%',
  transform: 'translate(-50%, -50%)',
  zIndex: 4,
  width: 'min(760px, calc(100% - 60px))',
  textAlign: 'center',
},

kicker: {
  margin: 0,
  fontSize: '11px',
  letterSpacing: '2.8px',
  color: 'rgba(255,255,255,0.88)',
  textShadow: '0 2px 12px rgba(0,0,0,0.28)',
},

title: {
  margin: '18px 0 0',
  color: '#fff',
  fontSize: '96px',
  fontWeight: 700,
  letterSpacing: '-1px',
  lineHeight: 0.95,
  fontFamily: '"Times New Roman", Georgia, serif',
  textShadow: '0 8px 30px rgba(0,0,0,0.28)',
},

subtitle: {
  margin: '18px 0 0',
  color: 'rgba(255,255,255,0.94)',
  fontSize: '18px',
  letterSpacing: '0.8px',
  textShadow: '0 2px 12px rgba(0,0,0,0.28)',
},
  bottomBar: {
    position: 'absolute',
    left: '38px',
    right: '38px',
    bottom: '34px',
    zIndex: 4,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  progressWrap: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  progressDot: {
    width: '34px',
    height: '2px',
    background: '#fff',
    transition: 'all 0.25s ease',
    transformOrigin: 'left center',
  },
  bottomCaption: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  captionLine: {
    width: '34px',
    height: '1px',
    background: 'rgba(255,255,255,0.6)',
  },
  captionText: {
    margin: 0,
    color: 'rgba(255,255,255,0.86)',
    fontSize: '11px',
    letterSpacing: '2px',
  },
};