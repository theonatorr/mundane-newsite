import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [hideGrid, setHideGrid] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const circleCount = 900; // Adjust as needed
  const circles = Array.from({ length: circleCount });
  // 21 dotColors for a 7×3 matrix:
  const dotColors = [
    { fill: '#FFFF00', outline: '#FFFF00' },
    { fill: '#000000', outline: '#000000' },
    { fill: '#FFFF00', outline: '#FFFF00' },
    { fill: '#000000', outline: '#FFFF00' },
    { fill: '#000000', outline: '#FFFF00' },
    { fill: '#FFFF00', outline: '#FFFF00' },
    { fill: '#000000', outline: '#FFFF00' },
    { fill: '#FFFF00', outline: '#FFFF00' },
    { fill: '#000000', outline: '#FFFF00' },
    { fill: '#FFFF00', outline: '#FFFF00' },
    { fill: '#FFFF00', outline: '#FFFF00' },
    { fill: '#000000', outline: '#FFFF00' },
    { fill: '#FFFF00', outline: '#FFFF00' },
    { fill: '#FFFF00', outline: '#FFFF00' },
    { fill: '#000000', outline: '#FFFF00' },
    { fill: '#000000', outline: '#000000' },
    { fill: '#FFFF00', outline: '#FFFF00' },
    { fill: '#000000', outline: '#FFFF00' },
    { fill: '#000000', outline: '#FFFF00' },
    { fill: '#FFFF00', outline: '#FFFF00' },
    { fill: '#FFFF00', outline: '#FFFF00' },
  ];

  useEffect(() => {
    if (hideGrid) return;

    const fadeTimers = new WeakMap();
    const maxDistance = 220;

    // Cache the circle elements
    const circleNodes = Array.from(document.querySelectorAll('.circle'));

    // Precompute positions for each circle
    let circlePositions = circleNodes.map(circle => {
      const rect = circle.getBoundingClientRect();
      return {
        element: circle,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
      };
    });

    const updatePositions = () => {
      circlePositions = circleNodes.map(circle => {
        const rect = circle.getBoundingClientRect();
        return {
          element: circle,
          centerX: rect.left + rect.width / 2,
          centerY: rect.top + rect.height / 2,
        };
      });
    };
    window.addEventListener('resize', updatePositions);

    let animationFrameId = null;
    const handleMouseMove = (e) => {
      if (animationFrameId) return;
      animationFrameId = requestAnimationFrame(() => {
        circlePositions.forEach(({ element, centerX, centerY }) => {
          const dx = e.clientX - centerX;
          const dy = e.clientY - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const opacity = Math.max(0, 1 - distance / maxDistance);

          if (opacity > 0.05) {
            if (fadeTimers.has(element)) {
              clearTimeout(fadeTimers.get(element));
              fadeTimers.delete(element);
            }
            element.classList.remove('fade');
            element.style.transition = 'none';
            element.style.backgroundColor = `rgba(251,255,0,${opacity})`;
          } else {
            if (!fadeTimers.has(element)) {
              fadeTimers.set(
                element,
                setTimeout(() => {
                  element.style.transition = '';
                  element.style.backgroundColor = 'rgba(251,255,0,1)';
                  element.classList.add('fade');
                  fadeTimers.delete(element);
                }, 300)
              );
            }
          }
        });
        animationFrameId = null;
      });
    };

    const handleClick = (e) => {
      circlePositions.forEach(({ element, centerX, centerY }) => {
        const dx = centerX - e.clientX;
        const dy = centerY - e.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const delay = distance * 0.5;

        setTimeout(() => {
          element.classList.add('wave');
          setTimeout(() => {
            element.classList.remove('wave');
          }, 800);
        }, delay);
      });

      // After the wave effect, fade background to white and show the overlay
      setTimeout(() => {
        document.body.style.backgroundColor = 'white';
        setShowOverlay(true);
      }, 800);

      // Remove the grid of circles after the animations finish (keeping the overlay visible)
      setTimeout(() => {
        setHideGrid(true);
      }, 1800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', updatePositions);
    };
  }, [hideGrid]);

  return (
    <div className="wrapper">
      {/* Render the background grid of small circles if not hidden */}
      {!hideGrid && (
        <div className="grid">
          {circles.map((_, index) => (
            <div key={index} className="circle" />
          ))}
        </div>
      )}

      {/* Render the black circle overlay with the 7×3 dot matrix and the quote if overlay is shown */}
      {showOverlay && (
        <>
          <div id="transition-overlay">
            <div className="yellow-grid">
              {dotColors.map(({ fill, outline }, index) => (
                <div
                  key={index}
                  className="yellow-spot"
                  style={{
                    backgroundColor: fill,
                    borderColor: outline,
                    '--dot-index': index,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="quote">mundane is a new type of robot company. focussing on mundane tasks, we prioritize real world deployment over meaningless lab demos.
            join us today</div>
        </>
      )}
    </div>
  );
}

export default App;