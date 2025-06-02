import { useEffect, useState } from 'react';

function App() {
  const [showContent, setShowContent] = useState(false);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  const [cellSize, setCellSize] = useState(20);
  const [gapSize, setGapSize] = useState(10);
  const [logoSize, setLogoSize] = useState(300);
  const [tagWidth, setTagWidth] = useState(500);
  const [borderSize, setBorderSize] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setCellSize(8);
        setGapSize(4);
        setLogoSize(150);
        setTagWidth(w - 80);
        setBorderSize(40);
      } else if (w < 768) {
        setCellSize(24);
        setGapSize(12);
        setLogoSize(200);
        setTagWidth(400);
        setBorderSize(30);
      } else {
        setCellSize(20);
        setGapSize(10);
        setLogoSize(300);
        setTagWidth(500);
        setBorderSize(5);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute visible grid dimensions so only full circles show
  useEffect(() => {
    const computeGrid = () => {
      let countCols, countRows;
      if (window.innerWidth < 768) {
        // Fixed 10×20 grid on mobile
        countCols = 10;
        countRows = 20;
      } else {
        const border = 20;
        const inset = 20;
        const gap = gapSize;
        const cell = cellSize;
        const w = window.innerWidth;
        const h = window.innerHeight;
        const areaWidth = w - 2 * border - 2 * inset;
        const areaHeight = h - 2 * border - 2 * inset;
        countCols = Math.floor((areaWidth + gap) / (cell + gap));
        countRows = Math.floor((areaHeight + gap) / (cell + gap));
      }
      setCols(countCols);
      setRows(countRows);

      // Mobile: fast outline wave then random shimmer over 10s total
      if (window.innerWidth < 768) {
        const circleNodes = Array.from(document.querySelectorAll('.circle'));
        const totalAnimTime = 10000;
        const startDelay = 200;         // initial pause
        const wavePhaseTime = 2000;     // 2s for the outline sweep
        const waveDelay = Math.max(10, Math.floor(wavePhaseTime / countCols));

        // Fast outline wave left-to-right
        for (let col = 0; col < countCols; col++) {
          setTimeout(() => {
            for (let row = 0; row < countRows; row++) {
              const idx = row * countCols + col;
              const el = circleNodes[idx];
              if (!el) continue;
              el.style.transition = 'border-color 0.2s ease';
              el.style.backgroundColor = 'transparent';
              el.style.border = '4px solid rgba(0,0,0,1)';
            }
          }, startDelay + col * waveDelay);
        }

        // Random shimmer flicker
        let shimmerInterval;
        setTimeout(() => {
          shimmerInterval = setInterval(() => {
            circleNodes.forEach(el => {
              const randColor = '#' +
                Math.floor(Math.random() * 16777215)
                  .toString(16)
                  .padStart(6, '0');
              el.style.transition = 'none';
              el.style.backgroundColor = randColor;
              el.style.border = '0';
            });
          }, 10);
        }, startDelay + wavePhaseTime);

        // Stop shimmer and reveal content after total animation time, with randomized fade-out and simultaneous content fade-in
        setTimeout(() => {
          clearInterval(shimmerInterval);
          // Sequentially fade all dots to white, one by one at 20ms intervals
          circleNodes.forEach((el, idx) => {
            setTimeout(() => {
              el.style.transition = 'background-color 0.3s ease';
              el.style.backgroundColor = 'white';
              el.style.border = '0';
            }, idx * 20);
          });
          // Reveal logo and text after last dot fades
          setTimeout(() => setShowContent(true), circleNodes.length * 20);
        }, totalAnimTime);
      }
    };
    computeGrid();
    window.addEventListener('resize', computeGrid);
    return () => window.removeEventListener('resize', computeGrid);
  }, [gapSize, cellSize]);
  const circles = Array.from({ length: cols * rows });

  useEffect(() => {
    const maxDistance = 220;

    let circleNodes = [];
    let circlePositions = [];

    const updatePositions = () => {
      circleNodes = Array.from(document.querySelectorAll('.circle'));
      circlePositions = circleNodes.map(circle => {
        const rect = circle.getBoundingClientRect();
        return {
          element: circle,
          centerX: rect.left + rect.width / 2,
          centerY: rect.top + rect.height / 2,
        };
      });
    };

    // Initialize positions for first render
    updatePositions();

    window.addEventListener('resize', updatePositions);

    const handleMouseMove = (e) => {
      circlePositions.forEach(({ element, centerX, centerY }) => {
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const borderOpacity = Math.max(0, 1 - distance / maxDistance);

        element.style.transition = 'border-color 0.5s ease';
        if (borderOpacity > 0) {
          element.style.backgroundColor = 'transparent';
          element.style.border = `4px solid rgba(0,0,0,${borderOpacity})`;
        } else {
          element.style.border = '0 solid black';
          element.style.backgroundColor = 'rgb(0, 0, 0)';
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updatePositions);
    };
  }, [cols, rows]);

  // Inline styles
  const wrapperStyle = {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box',
    border: `${borderSize}px solid white`,
  };
  const logoStyle = {
    maxWidth: `${logoSize}px`,
    height: 'auto',
    marginBottom: '40px',
    zIndex: 1,
    objectFit: 'contain'
  };
  const taglineStyle = {
    fontSize: '1.5rem',
    color: '#494947',
    textAlign: 'left',
    alignSelf: 'center',
    maxWidth: `${tagWidth}px`,
    zIndex: 1,
    marginTop: '20px'
  };
  const gridStyle = {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridAutoRows: `${cellSize}px`,
    gap: `${gapSize}px`,
    justifyContent: 'center',
    alignContent: 'center',
  };
  const circleStyle = {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    backgroundColor: 'rgb(0, 0, 0)',
    borderRadius: '50%',
    transition: 'background-color 0.5s ease, border-color 0.5s ease',
    boxSizing: 'border-box',
    border: '0 solid black',
  };

  return (
    <div style={wrapperStyle} onClick={() => setShowContent(true)}>
      <div
        style={{
          ...gridStyle,
          opacity: showContent ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      >
        {circles.map((_, index) => (
          <div key={index} className="circle" style={circleStyle} />
        ))}
      </div>
      {showContent && (
        <>
          <img
            src="/logo.png"
            alt="mundane logo"
            style={{
              ...logoStyle,
              opacity: showContent ? 1 : 0,
              transition: 'opacity 1s ease',
            }}
          />
          <div
            style={{
              ...taglineStyle,
              opacity: showContent ? 1 : 0,
              transition: 'opacity 1.5s ease',
            }}
          >
            mundane is a new type of robot company. focusing on mundane tasks, we prioritize real world deployment over meaningless lab demos. <a href="mailto:info@mundane.bot">join us today</a>
          </div>
        </>
      )}
    </div>
  );
}

export default App;