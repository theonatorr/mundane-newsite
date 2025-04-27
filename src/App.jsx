import { useEffect, useState } from 'react';

function App() {
  const [showContent, setShowContent] = useState(false);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);

  // Compute visible grid dimensions so only full circles show
  useEffect(() => {
    const computeGrid = () => {
      const border = 20;      // wrapper border
      const inset = 20;       // grid inset from border
      const gap = 10;
      const cell = 20;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const areaWidth = w - 2 * border - 2 * inset;
      const areaHeight = h - 2 * border - 2 * inset;
      const countCols = Math.floor((areaWidth + gap) / (cell + gap));
      const countRows = Math.floor((areaHeight + gap) / (cell + gap));
      setCols(countCols);
      setRows(countRows);
    };
    computeGrid();
    window.addEventListener('resize', computeGrid);
    return () => window.removeEventListener('resize', computeGrid);
  }, []);
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
    border: '20px solid white',
  };
  const logoStyle = {
    maxWidth: '500px',
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
    maxWidth: '900px',
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
    gridTemplateColumns: `repeat(${cols}, 20px)`,
    gridAutoRows: '20px',
    gap: '10px',
    justifyContent: 'center',
    alignContent: 'center',
  };
  const circleStyle = {
    width: '20px',
    height: '20px',
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