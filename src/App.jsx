import { useEffect, useState } from 'react';

function App() {
  const [showContent, setShowContent] = useState(false);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  const [cellSize, setCellSize] = useState(20);
  const [gapSize, setGapSize] = useState(10);
  const [logoSize, setLogoSize] = useState(300);
  const [tagWidth, setTagWidth] = useState(500);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setCellSize(8);
        setGapSize(4);
        setLogoSize(150);
        setTagWidth(w - 80);
      } else if (w < 768) {
        setCellSize(12);
        setGapSize(6);
        setLogoSize(200);
        setTagWidth(400);
      } else {
        setCellSize(20);
        setGapSize(10);
        setLogoSize(300);
        setTagWidth(500);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute visible grid dimensions so only full circles show
  useEffect(() => {
    const computeGrid = () => {
      const border = 20;
      const inset = 20;
      const gap = gapSize;
      const cell = cellSize;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const areaWidth = w - 2 * border - 2 * inset;
      const areaHeight = h - 2 * border - 2 * inset;
      let countCols = Math.floor((areaWidth + gap) / (cell + gap));
      let countRows = Math.floor((areaHeight + gap) / (cell + gap));
      // Reduce dot density on mobile for faster wave
      if (window.innerWidth < 768) {
        countCols = Math.max(1, Math.floor(countCols / 2));
        countRows = Math.max(1, Math.floor(countRows / 2));
      }
      setCols(countCols);
      setRows(countRows);
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

  useEffect(() => {
    // Only on mobile widths
    if (window.innerWidth >= 768) return;
    const circleNodes = Array.from(document.querySelectorAll('.circle'));
    // Calculate delay so wave runs ~10 seconds total
    const totalWaveDuration = 10000; // milliseconds
    const waveDelay = Math.max(50, Math.floor(totalWaveDuration / cols));
    // Iterate columns left-to-right
    for (let col = 0; col < cols; col++) {
      setTimeout(() => {
        for (let row = 0; row < rows; row++) {
          const idx = row * cols + col;
          const el = circleNodes[idx];
          if (!el) continue;
          el.style.transition = 'none';
          el.style.backgroundColor = 'transparent';
          el.style.border = '4px solid black';
        }
      }, col * waveDelay);
    }
    // After finishing wave, reveal content
    const totalTime = cols * waveDelay + 500;
    const timer = setTimeout(() => setShowContent(true), totalTime);
    return () => clearTimeout(timer);
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
    border: '20px solid white',
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
    top: '20px',
    bottom: '20px',
    left: '20px',
    right: '20px',
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
            mundane is a new type of robot company. focussing on mundane tasks, we prioritize real world deployment over meaningless lab demos. <a href="mailto:theo@mundanesystems.com">join us today</a>
          </div>
        </>
      )}
    </div>
  );
}

export default App;