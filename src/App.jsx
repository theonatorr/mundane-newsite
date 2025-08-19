import { useEffect, useState } from 'react';
import './App.css';
import JobsModal from './JobsModal';

function App() {
  const [showContent, setShowContent] = useState(false);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  const [cellSize, setCellSize] = useState(20);
  const [gapSize, setGapSize] = useState(10);
  const [logoSize, setLogoSize] = useState(300);
  const [tagWidth, setTagWidth] = useState(500);
  const [borderSize, setBorderSize] = useState(5);
  const [blogVisible, setBlogVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showJobsModal, setShowJobsModal] = useState(false);
  const [clickInitiated, setClickInitiated] = useState(false);


  // Remove the immediate content show - let it be click-triggered

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Building Robots for the Real World",
      date: "August 17, 2024",
      excerpt: "Why we focus on mundane tasks and real-world deployment over flashy lab demos. The challenges of building robots that actually work in messy, unpredictable environments.",
      content: "When we started mundane, we made a conscious decision to focus on the boring stuff. While other robotics companies chase after viral moments with dancing robots or acrobatic feats, we're building systems that can reliably fold laundry, clean kitchens, and handle the repetitive tasks that fill our daily lives. It's not glamorous, but it's what the world actually needs. The real challenge isn't making a robot that can do a backflip—it's making one that can consistently load a dishwasher without breaking your favorite mug. We've learned that reliability beats spectacle every time, and that the most impressive robots are the ones you forget are even there."
    },
    {
      id: 2,
      title: "The Cracked People Principle",
      date: "August 15, 2024",
      excerpt: "Why we seek out 'cracked' people—those who think differently, break rules, and see solutions where others see problems.",
      content: "We're always looking for 'cracked' people. What do we mean by that? We're talking about engineers who see a problem and immediately start thinking about how to solve it, even if it means breaking conventional wisdom. People who look at a robot arm and think 'what if we made it do the opposite of what it's designed for?' People who can't help but optimize everything they touch, even when it drives their coworkers crazy. These are the people who build the future. They're the ones who will figure out how to make robots that can handle the infinite variability of the real world. If you're reading this and thinking 'that sounds like me,' we want to hear from you. Apply here and let's build something amazing together."
    },
    {
      id: 3,
      title: "Scaling Fast, Staying Focused",
      date: "August 12, 2024",
      excerpt: "How we're growing our team while maintaining our focus on mundane tasks and real-world impact.",
      content: "Growth is exciting, but it's also dangerous. We're scaling quickly because the world needs what we're building, but we're being very careful about how we grow. Every new hire needs to understand our mission: real robots for real problems. We're not building toys or demos. We're building systems that will actually make people's lives better. That means every decision we make—from hiring to product development to office snacks—needs to serve that goal. We're looking for people who can handle the chaos of a fast-growing startup while never losing sight of why we're here. It's not easy, but it's worth it."
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      if (w < 480) {
        setCellSize(16); // Larger dots on mobile
        setGapSize(8); // Larger gaps
        setLogoSize(Math.min(150, h * 0.2)); // Responsive logo size based on screen height
        setTagWidth(w - 80);
        setBorderSize(40);
      } else if (w < 768) {
        setCellSize(24);
        setGapSize(12);
        setLogoSize(Math.min(200, h * 0.25)); // Responsive logo size based on screen height
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

      // Mobile: enhanced animation with tap interactions over 7.5s total
      if (window.innerWidth < 768) {
        const circleNodes = Array.from(document.querySelectorAll('.circle'));
        const totalAnimTime = 3000; // 3 seconds total
        const startDelay = 100;         // shorter initial pause
        const wavePhaseTime = 1000;     // 1s for the outline sweep (faster)
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

        // Auto-reveal content right after wave animation completes
        setTimeout(() => {
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
        }, startDelay + wavePhaseTime + 500); // 500ms buffer after wave completes
      } else {
        // Desktop: keep the dots visible until user clicks
        // No auto-reveal
      }
    };
    computeGrid();
    window.addEventListener('resize', computeGrid);
    return () => window.removeEventListener('resize', computeGrid);
  }, [gapSize, cellSize]);
  const circles = Array.from({ length: cols * rows });

  useEffect(() => {
    if (showContent || clickInitiated) return; // Do not run hover effects when content is visible or click has been initiated
    const maxDistance = 220;
    let circleNodes = [];
    let circlePositions = [];
    let animationFrameId;
    let isMouseMoving = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

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
      // Throttle mouse events
      if (!isMouseMoving) {
        isMouseMoving = true;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        
        animationFrameId = requestAnimationFrame(() => {
          circlePositions.forEach(({ element, centerX, centerY }) => {
            const dx = lastMouseX - centerX;
            const dy = lastMouseY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const borderOpacity = Math.max(0, 1 - distance / maxDistance);

            if (borderOpacity > 0) {
              element.style.backgroundColor = 'transparent';
              element.style.border = `4px solid rgba(0,0,0,${borderOpacity})`;
            } else {
              element.style.border = '0 solid black';
              element.style.backgroundColor = 'rgb(0, 0, 0)';
            }
          });
          isMouseMoving = false;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updatePositions);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [cols, rows, showContent]);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = Math.min(scrollY / documentHeight, 1);
      
      setScrollProgress(progress);
      setBlogVisible(scrollY > windowHeight * 0.3);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

// Inline styles

/* Jobs page hover overrides -- comment out hover-specific CSS properties */
/*
#jobs-root *:hover {
  background-color: inherit !important;
  color: inherit !important;
}
#jobs-root .hoverable:hover,
#jobs-root .job-card:hover,
#jobs-root button:hover,
#jobs-root a:hover {
  filter: none !important;
  opacity: inherit !important;
}
#jobs-root .job-card:hover {
  background-color: #f7f7f7 !important;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06) !important;
}
#jobs-root a:hover {
  background-color: transparent !important;
  color: inherit;
}
*/
  const wrapperStyle = {
    width: '100vw',
    minHeight: '100vh',
    backgroundColor: 'white',
    position: 'relative',
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

  // Calculate responsive positioning based on screen height
  const screenHeight = window.innerHeight;
  const isMobile = window.innerWidth < 768;
  
  // For mobile, use viewport height-based positioning
  const mobileImageTop = isMobile ? Math.min(25, screenHeight * 0.25) : 40; // 25% from top on mobile, max 25vh
  const mobileTextTop = isMobile ? Math.min(65, screenHeight * 0.65) : 40; // 65% from top on mobile, max 65vh
  
  const fixedBgStyle = {
    position: 'fixed',
    top: isMobile ? `${mobileImageTop}%` : '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `${Math.min(900, logoSize * 1.5)}px`,
    height: 'auto',
    zIndex: 0,
    pointerEvents: 'none',
    opacity: showContent ? 1 : 0,
    transition: 'opacity 1s ease'
  };

  // Calculate text position based on image size and screen height
  const imageHeight = Math.min(900, logoSize * 1.5) * 0.6; // Approximate image height (aspect ratio)
  const textOffset = isMobile ? Math.min(80, screenHeight * 0.15) : imageHeight * 0.7; // Responsive spacing on mobile

  const cornerOffset = Math.max(borderSize + gapSize * 2, 16);

  const scrollContainerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 20px',
  };

  const blogPostStyle = {
    padding: '32px',
    marginBottom: '40px',
  };

  const blogTitleStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '8px',
    lineHeight: '1.2',
  };

  const blogDateStyle = {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '20px',
    fontStyle: 'italic',
  };

  const blogExcerptStyle = {
    fontSize: '1.1rem',
    color: '#333',
    lineHeight: '1.6',
    marginBottom: '20px',
    fontWeight: '500',
  };

  const blogContentStyle = {
    fontSize: '1rem',
    color: '#444',
    lineHeight: '1.7',
    textAlign: 'justify',
  };

  const handleClick = (e) => {
    if (showContent) return; // Already shown
    
    // Set click initiated to prevent mouse movement effects from interfering
    setClickInitiated(true);
    
    const circleNodes = Array.from(document.querySelectorAll('.circle'));
    const clickX = e.clientX;
    const clickY = e.clientY;
    
    // Calculate distance from click point to each dot and sort by distance
    const dotsWithDistance = circleNodes.map((el, idx) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(centerX - clickX, 2) + Math.pow(centerY - clickY, 2)
      );
      return { element: el, distance, index: idx };
    });
    
    // Sort by distance (closest first)
    dotsWithDistance.sort((a, b) => a.distance - b.distance);
    
    // Find the maximum distance for timing calculation
    const maxDistance = Math.max(...dotsWithDistance.map(d => d.distance));
    
    // Fade dots based on distance from click point
    dotsWithDistance.forEach(({ element, distance }, idx) => {
      // Calculate delay based on distance (closer dots fade first)
      const delay = (distance / maxDistance) * 800; // 800ms total animation time
      
      setTimeout(() => {
        element.style.transition = 'background-color 0.1s ease';
        element.style.backgroundColor = 'white';
        element.style.border = '0';
      }, delay);
    });
    
    // Reveal logo and text after animation completes
    setTimeout(() => setShowContent(true), 800);
  };

  return (
    <div style={wrapperStyle} onClick={handleClick}>
      {!showContent && (
        <div
          style={{
            ...gridStyle,
            opacity: 1,
            transition: 'opacity 0.5s ease',
            pointerEvents: 'auto',
          }}
        >
          {circles.map((_, index) => (
            <div key={index} className="circle" style={circleStyle} />
          ))}
        </div>
      )}
      {showContent && (
        <>
          {/* Fixed background image that stays behind during scroll */}
          <img
            src="/ghibli-mundane-2.png"
            alt="mundane background"
            style={fixedBgStyle}
          />

          {/* Fixed background logo that stays behind during scroll */}


          {/* Plain text version below the image */}
          <section
            style={{
              position: 'fixed',
              top: isMobile ? `${mobileTextTop}%` : `calc(40% + ${imageHeight/2}px + ${textOffset}px)`,
              left: '50%',
              transform: 'translate(-50%, -50%)', // Center both horizontally and vertically
              zIndex: 1,
              textAlign: 'left',
              pointerEvents: 'none',
              width: isMobile ? '90vw' : '80vw',
              maxWidth: isMobile ? 'none' : '600px',
              // filter: blogVisible ? 'blur(3px)' : 'blur(0px)',
              // transition: 'filter 0.3s ease',
            }}
          >
            <div
              style={{
                fontSize: isMobile ? (screenHeight < 600 ? '1rem' : '1.1rem') : window.innerWidth < 1024 ? '1.3rem' : '1.5rem',
                color: '#494947',
                maxWidth: '100%',
                opacity: showContent ? 1 : 0,
                transition: 'opacity 1.5s ease',
                lineHeight: '1.6',
                padding: isMobile ? '0 15px' : '0 20px',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                hyphens: 'auto',
                pointerEvents: 'auto', // Enable clicking and text selection
              }}
            >
              mundane is a new type of robot company. focusing on mundane tasks, we prioritize real world deployment over meaningless lab demos.<br /><br />
              we're scaling quickly and always looking for new cracked people to join the team - <button onClick={() => setShowJobsModal(true)} style={{background: 'none', border: 'none', color: '#0066cc', textDecoration: 'underline', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit', display: 'inline', padding: '0', margin: '0', lineHeight: 'inherit'}}>see open positions</button>
            </div>
          </section>


        </>
      )}
      
        
        {/* Jobs Modal */}
        {showJobsModal && (
          <JobsModal onClose={() => setShowJobsModal(false)} />
        )}
        
        <a  
        href="https://x.com/mundanebot" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: isMobile ? Math.max(10, screenHeight * 0.05) : `${cornerOffset}px`,
          right: isMobile ? '10px' : `${cornerOffset}px`,
          opacity: showContent ? 1 : 0,
          transition: 'opacity 1.5s ease',
          textDecoration: 'none',
          zIndex: 10,
        }}
      >
        <img
          id="corner-logo"
          src="/logo.png"
          alt="Logo"
          style={{
            width: isMobile ? (screenHeight < 600 ? '50px' : '60px') : '100px',
            height: 'auto',
            transition: 'none',
          }}

        />
      </a>
    </div>
  );
}

export default App;
