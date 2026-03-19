import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Search, X } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [hoverMenu, setHoverMenu] = useState(null);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    setIsSearchOpen(false);
    setHoverMenu(null);
  }, [location.pathname]);

  const menuItems = [
    { label: 'BEST', path: '/best' },
    { label: 'NEW', path: '/new' },
    { label: 'BOTTOM', path: '/bottom' },
    { label: 'TOP', path: '/top' },
    { label: 'OUTER', path: '/outer' },
    { label: 'KNIT', path: '/knit' },
    { label: 'SHIRT', path: '/shirt' },
    { label: 'OPS/SK', path: '/ops-sk' },
    { label: 'ACC', path: '/acc' },
    { label: 'SALE', path: '/sale' },
    { label: 'COMMUNITY', path: '/community' },
  ];

  const dropdownContent = {
    BEST: {
      title: 'BEST',
      items: ['베스트 팬츠', '베스트 니트', '베스트 셔츠', '베스트 원피스'],
      image: '/images/hero/hero1.jpg',
    },
    NEW: {
      title: 'NEW',
      items: ['신상품 전체', '이번주 업데이트', '트렌드 룩', '신상 모음'],
      image: '/images/hero/hero2.jpg',
    },
    BOTTOM: {
      title: 'BOTTOM',
      items: ['데님', '슬랙스', '코튼팬츠', '숏팬츠'],
      image: '/images/hero/hero3.jpg',
    },
    TOP: {
      title: 'TOP',
      items: ['티셔츠', '슬리브리스', '맨투맨', '블라우스'],
      image: '/images/hero/hero1.jpg',
    },
    OUTER: {
      title: 'OUTER',
      items: ['자켓', '가디건', '코트', '점퍼'],
      image: '/images/hero/hero2.jpg',
    },
    KNIT: {
      title: 'KNIT',
      items: ['반팔니트', '긴팔니트', '카라니트', '가디건'],
      image: '/images/hero/hero3.jpg',
    },
    SHIRT: {
      title: 'SHIRT',
      items: ['베이직 셔츠', '스트라이프', '오버핏', '크롭셔츠'],
      image: '/images/hero/hero1.jpg',
    },
    'OPS/SK': {
      title: 'OPS / SK',
      items: ['원피스', '롱원피스', '미니스커트', '롱스커트'],
      image: '/images/hero/hero2.jpg',
    },
    ACC: {
      title: 'ACC',
      items: ['가방', '신발', '목걸이', '벨트'],
      image: '/images/hero/hero3.jpg',
    },
    SALE: {
      title: 'SALE',
      items: ['할인상품', '시즌오프', '한정특가', '재고정리'],
      image: '/images/hero/hero1.jpg',
    },
    COMMUNITY: {
      title: 'COMMUNITY',
      items: ['공지사항', '리뷰', 'Q&A', '이벤트'],
      image: '/images/hero/hero2.jpg',
    },
  };

  const useLightTheme = isHome && !isScrolled && !isSearchOpen;
  const textColor = useLightTheme ? '#ffffff' : '#111111';
  const subTextColor = useLightTheme
    ? 'rgba(255,255,255,0.92)'
    : 'rgba(17,17,17,0.8)';
  const dividerColor = useLightTheme
    ? 'rgba(255,255,255,0.4)'
    : 'rgba(17,17,17,0.18)';
  const activeColor = useLightTheme ? '#ffffff' : '#111111';

  const headerBackground =
    isScrolled || !isHome || isSearchOpen || hoverMenu
      ? 'rgba(255,255,255,0.82)'
      : 'transparent';

  const headerBorder =
    isScrolled || !isHome || isSearchOpen || hoverMenu
      ? '1px solid rgba(17,17,17,0.06)'
      : '1px solid transparent';

  const backdropFilter =
    isScrolled || !isHome || isSearchOpen || hoverMenu ? 'blur(14px)' : 'none';

  const shadow =
    isScrolled || !isHome || isSearchOpen || hoverMenu
      ? '0 10px 30px rgba(0,0,0,0.06)'
      : 'none';

  const effectiveTextColor = hoverMenu ? '#111111' : textColor;
  const effectiveSubTextColor = hoverMenu
    ? 'rgba(17,17,17,0.8)'
    : subTextColor;
  const effectiveDividerColor = hoverMenu
    ? 'rgba(17,17,17,0.18)'
    : dividerColor;
  const effectiveActiveColor = hoverMenu ? '#111111' : activeColor;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('검색어:', searchKeyword);
  };

  const currentDropdown = hoverMenu ? dropdownContent[hoverMenu] : null;

  return (
    <>
      <header
        style={{
          ...styles.header,
          background: headerBackground,
          borderBottom: headerBorder,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          boxShadow: shadow,
        }}
      >
        <div style={styles.inner}>
          <div style={styles.left}>
            <Link
              to="/"
              style={{
                ...styles.logo,
                color: effectiveTextColor,
                textShadow:
                  useLightTheme && !hoverMenu
                    ? '0 2px 18px rgba(0,0,0,0.18)'
                    : 'none',
              }}
            >
              SIAROOM
            </Link>

            <span
              style={{
                ...styles.divider,
                color: effectiveDividerColor,
              }}
            >
              |
            </span>

            <nav style={styles.nav}>
              {menuItems.map((item) => (
                <div
                  key={item.path}
                  style={styles.menuItemWrap}
                  onMouseEnter={() => setHoverMenu(item.label)}
                >
                  <NavLink
                    to={item.path}
                    style={({ isActive }) => ({
                      ...styles.navLink,
                      color: isActive
                        ? effectiveActiveColor
                        : effectiveSubTextColor,
                      borderBottom: isActive
                        ? `1px solid ${effectiveActiveColor}`
                        : '1px solid transparent',
                      textShadow:
                        useLightTheme && !hoverMenu
                          ? '0 2px 12px rgba(0,0,0,0.16)'
                          : 'none',
                    })}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.72';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    {item.label}
                  </NavLink>
                </div>
              ))}
            </nav>
          </div>

          <div style={styles.center} />

          <div style={styles.right}>
            <button
              type="button"
              aria-label="장바구니"
              style={{
                ...styles.iconButton,
                color: effectiveTextColor,
                textShadow:
                  useLightTheme && !hoverMenu
                    ? '0 2px 12px rgba(0,0,0,0.18)'
                    : 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.opacity = '0.72';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.opacity = '1';
              }}
            >
              <ShoppingBag size={18} strokeWidth={1.7} />
            </button>

            <button
              type="button"
              aria-label="마이페이지"
              style={{
                ...styles.iconButton,
                color: effectiveTextColor,
                textShadow:
                  useLightTheme && !hoverMenu
                    ? '0 2px 12px rgba(0,0,0,0.18)'
                    : 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.opacity = '0.72';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.opacity = '1';
              }}
            >
              <User size={18} strokeWidth={1.7} />
            </button>

            <button
              type="button"
              aria-label="검색"
              style={{
                ...styles.iconButton,
                color: effectiveTextColor,
                textShadow:
                  useLightTheme && !hoverMenu
                    ? '0 2px 12px rgba(0,0,0,0.18)'
                    : 'none',
              }}
              onClick={() => setIsSearchOpen(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.opacity = '0.72';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.opacity = '1';
              }}
            >
              <Search size={18} strokeWidth={1.7} />
            </button>
          </div>
        </div>

        <div
          style={{
            ...styles.dropdown,
            opacity: hoverMenu ? 1 : 0,
            pointerEvents: hoverMenu ? 'auto' : 'none',
            transform: hoverMenu ? 'translateY(0)' : 'translateY(-8px)',
          }}
          onMouseEnter={() => {
            if (hoverMenu) setHoverMenu(hoverMenu);
          }}
          onMouseLeave={() => setHoverMenu(null)}
        >
          {currentDropdown && (
            <div style={styles.dropdownInner}>
              <div style={styles.dropdownTextArea}>
                <p style={styles.dropdownKicker}>{currentDropdown.title}</p>
                <h3 style={styles.dropdownTitle}>Curated Selection</h3>
                <div style={styles.dropdownList}>
                  {currentDropdown.items.map((item) => (
                    <Link
                      key={item}
                      to="#"
                      style={styles.dropdownItem}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>

              <div style={styles.dropdownImageWrap}>
                <div
                  style={{
                    ...styles.dropdownImage,
                    backgroundImage: `url(${currentDropdown.image})`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      <div
        style={{
          ...styles.searchOverlay,
          opacity: isSearchOpen ? 1 : 0,
          pointerEvents: isSearchOpen ? 'auto' : 'none',
        }}
        onClick={() => setIsSearchOpen(false)}
      >
        <div
          style={{
            ...styles.searchPanel,
            transform: isSearchOpen ? 'translateY(0)' : 'translateY(-20px)',
            opacity: isSearchOpen ? 1 : 0,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={styles.searchHeader}>
            <h2 style={styles.searchTitle}>Search</h2>
            <button
              type="button"
              style={styles.closeButton}
              onClick={() => setIsSearchOpen(false)}
            >
              <X size={22} strokeWidth={1.8} />
            </button>
          </div>

          <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
            <Search size={18} strokeWidth={1.7} color="#666" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="상품명 또는 카테고리를 검색해보세요"
              style={styles.searchInput}
              autoFocus
            />
            <button type="submit" style={styles.searchSubmit}>
              검색
            </button>
          </form>

          <div style={styles.keywordBox}>
            <p style={styles.keywordTitle}>추천 검색어</p>
            <div style={styles.keywordList}>
              {['데님', '블라우스', '가디건', '스커트', '베스트상품'].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    style={styles.keywordChip}
                    onClick={() => setSearchKeyword(item)}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    transition:
      'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s ease',
  },
  inner: {
    width: '100%',
    padding: '18px 34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    minWidth: 0,
    flex: 1,
  },
  logo: {
    textDecoration: 'none',
    fontSize: '34px',
    fontWeight: 700,
    letterSpacing: '-0.5px',
    whiteSpace: 'nowrap',
    transition: 'color 0.3s ease',
    fontFamily:
      '"Times New Roman", "Cormorant Garamond", Georgia, serif',
  },
  divider: {
    fontSize: '15px',
    transition: 'color 0.3s ease',
    marginTop: '-1px',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  menuItemWrap: {
    position: 'relative',
  },
  navLink: {
    textDecoration: 'none',
    fontSize: '13px',
    letterSpacing: '0.2px',
    paddingBottom: '3px',
    transition:
      'color 0.25s ease, border-color 0.25s ease, opacity 0.25s ease',
    whiteSpace: 'nowrap',
  },
  center: {
    flex: 1,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    whiteSpace: 'nowrap',
  },
  iconButton: {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    padding: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.22s ease, opacity 0.22s ease, color 0.22s ease',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderTop: '1px solid rgba(17,17,17,0.05)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
    transition: 'opacity 0.25s ease, transform 0.25s ease',
  },
  dropdownInner: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '36px 34px 42px',
    display: 'grid',
    gridTemplateColumns: '1.1fr 360px',
    gap: '40px',
    alignItems: 'center',
  },
  dropdownTextArea: {
    display: 'flex',
    flexDirection: 'column',
  },
  dropdownKicker: {
    margin: 0,
    fontSize: '12px',
    letterSpacing: '2px',
    color: '#999',
  },
  dropdownTitle: {
    margin: '10px 0 0',
    fontSize: '34px',
    color: '#111',
    fontFamily: '"Times New Roman", Georgia, serif',
  },
  dropdownList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 180px))',
    gap: '14px 28px',
    marginTop: '24px',
  },
  dropdownItem: {
    fontSize: '15px',
    color: '#333',
    textDecoration: 'none',
    transition: 'opacity 0.2s ease',
  },
  dropdownImageWrap: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  dropdownImage: {
    width: '320px',
    height: '220px',
    borderRadius: '18px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    boxShadow: '0 16px 36px rgba(0,0,0,0.12)',
  },
  searchOverlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 1200,
    background: 'rgba(0,0,0,0.28)',
    transition: 'opacity 0.3s ease',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '90px',
  },
  searchPanel: {
    width: 'min(760px, calc(100% - 32px))',
    background: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.5)',
    borderRadius: '24px',
    boxShadow: '0 30px 60px rgba(0,0,0,0.18)',
    padding: '24px',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
  },
  searchHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '18px',
  },
  searchTitle: {
    margin: 0,
    fontSize: '26px',
    fontWeight: 700,
    color: '#111',
    fontFamily:
      '"Times New Roman", "Cormorant Garamond", Georgia, serif',
  },
  closeButton: {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    color: '#111',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchForm: {
    height: '58px',
    borderRadius: '16px',
    border: '1px solid rgba(17,17,17,0.1)',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '0 16px',
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '15px',
    color: '#111',
  },
  searchSubmit: {
    height: '38px',
    padding: '0 18px',
    borderRadius: '999px',
    border: 'none',
    background: '#111',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  keywordBox: {
    marginTop: '20px',
  },
  keywordTitle: {
    margin: 0,
    fontSize: '13px',
    color: '#777',
  },
  keywordList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '12px',
  },
  keywordChip: {
    height: '34px',
    padding: '0 14px',
    borderRadius: '999px',
    border: '1px solid rgba(17,17,17,0.08)',
    background: '#fff',
    color: '#111',
    fontSize: '13px',
    cursor: 'pointer',
  },
};