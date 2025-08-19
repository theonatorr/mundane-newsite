import React, { useState } from 'react';

const JobsModal = ({ onClose }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger fade-in animation on mount
  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      department: "Applications",
      location: "Palo Alto, CA",
      type: "Full-time",
      description: "You'll build high-performance systems for real-time data streaming—spanning video pipelines, transport protocols, and network optimization. As an early SWE at mundane, you'll also work across the stack: from core infrastructure to deployment tools, owning projects end-to-end and shaping how our robots learn and scale."
    },
    {
      id: 2,
      title: "Controls Engineer",
      department: "Applications", 
      location: "Palo Alto, CA",
      type: "Full-time",
      description: "You'll design and deploy the low-latency, high-fidelity control systems that link human operators to humanoid robots. From intent estimation to torque control and haptics, you'll make teleoperation seamless, safe, and intuitive. This is a hands-on role — tuning parameters, integrating sensors, and solving problems that only appear in the real world."
    },
    {
      id: 3,
      title: "Machine Learning Engineer",
      department: "Co-op Applications",
      location: "Palo Alto, CA", 
      type: "Co-op",
      description: "You'll develop, train, and deploy robot learning models using real-world data from our fleet. This is a hands-on role — collecting and labeling demonstrations, testing models on hardware, and iterating until they work in messy, unpredictable environments. You'll work closely with controls, hardware, and perception teams to bring ML pipelines into live deployment."
    },
    {
      id: 4,
      title: "Mechatronics Engineer",
      department: "Co-op Applications",
      location: "Palo Alto, CA",
      type: "Co-op", 
      description: "As a Mechatronics Co-op Engineer, you'll work at the intersection of electrical, mechanical, and software systems to bring our humanoid systems to life in the real world. You will focus on integrating sensors, actuators, and embedded systems into production-ready robotic platforms, solving complex problems from to system-level debugging. Your work will directly impact the performance, safety, and reliability of robots deployed in active customer environments. You'll collaborate closely with our hardware, controls, and ML teams to design, prototype, and iterate on both individual subsystems and complete robotic assemblies. This role is highly hands-on and ideal for an engineering student with real-world robotics experience who thrives in a startup environment."
    },
    {
      id: 5,
      title: "Perception Engineer",
      department: "Computer Vision & Sensing",
      location: "Palo Alto, CA",
      type: "Full-time",
      description: "You'll design and deploy perception systems that let our robots see and understand the world. From real-time object detection to multi-sensor fusion, you'll tackle vision challenges in dynamic, cluttered environments. As an early engineer at mundane, you'll shape the core of our perception stack—balancing cutting-edge research with reliable, field-ready systems."
    },
    {
      id: 6,
      title: "Robotics Engineer",
      department: "Motion Planning & Control",
      location: "Palo Alto, CA",
      type: "Full-time",
      description: "You'll develop the planning and control algorithms that make our robots move with precision and intent. Your work will span trajectory optimization, reactive control, and dexterous manipulation, all under real-world constraints. At mundane, you'll take ideas from whiteboard to deployment, ensuring our robots can operate safely and smoothly in the wild."
    },
    {
      id: 7,
      title: "Embedded Systems Engineer",
      department: "Real-Time Robotics",
      location: "Palo Alto, CA",
      type: "Full-time",
      description: "You'll build the embedded systems that serve as the nervous system of our robots. From low-level drivers to real-time communication protocols, you'll ensure our platforms remain responsive, reliable, and efficient under load. At mundane, you'll own firmware end-to-end—bringing together hardware, software, and integration to keep our robots mission-ready."
    },
    {
      id: 8,
      title: "Simulation Engineer",
      department: "Physics & Reinforcement Learning",
      location: "Palo Alto, CA",
      type: "Full-time",
      description: "You'll create simulation environments that accelerate how our robots learn and adapt. From physics-based modeling to reinforcement learning pipelines, you'll design the tools that let us test, train, and validate at scale before hitting the real world. As part of mundane, you'll bridge the gap between sim and reality, making every experiment count."
    },
    {
      id: 9,
      title: "Human–Robot Interaction Engineer",
      department: "Interfaces & UX",
      location: "Palo Alto, CA",
      type: "Full-time",
      description: "You'll design the interfaces and experiences that define how people command, teach, and collaborate with robots. From intuitive teleoperation to novel feedback and visualization systems, you'll shape the touchpoints that make robots usable and trusted. At mundane, you'll own the end-user experience—ensuring humans and robots work seamlessly side by side."
    },
    {
      id: 10,
      title: "Systems Integration Engineer",
      department: "Robotics Platforms",
      location: "Palo Alto, CA",
      type: "Full-time",
      description: "You'll integrate perception, control, and hardware into cohesive robotic platforms. That means debugging complex system interactions, testing at scale, and making sure every subsystem plays nicely together. At mundane, you'll be the glue across disciplines, ensuring our robots make the leap from prototype to reliable deployment in the field."
    }
  ];

  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  const handleApply = (job = selectedJob) => {
    const jobToApply = job || selectedJob;
    if (jobToApply) {
      // Use specific forms for certain jobs, general form for others
      let applyUrl = 'https://airtable.com';
      
      if (jobToApply.id === 1) { // Software Engineer
        applyUrl = 'https://airtable.com/appJtaRURYFPJILxd/pagufE698acYXrH0f/form';
      } else if (jobToApply.id === 2) { // Controls Engineer
        applyUrl = 'https://airtable.com/appJtaRURYFPJILxd/pag7sY3iibHHVyczd/form';
      } else if (jobToApply.id === 3) { // Machine Learning Engineer
        applyUrl = 'https://airtable.com/appJtaRURYFPJILxd/pagFF9UMpRc9TMV4P/form';
      } else if (jobToApply.id === 4) { // Mechatronics Engineer Co-op
        applyUrl = 'https://airtable.com/appJtaRURYFPJILxd/pagGZVBysm5UAjBii/form';
      } else { // Perception Engineer onwards (IDs 5-10) - use blank application
        applyUrl = 'https://airtable.com/appJtaRURYFPJILxd/pagB3AhwXoOxDsDX9/form';
      }
      
      window.open(applyUrl, '_blank');
    }
  };

  // Mobile layout - vertically scrolling tiles
  if (window.innerWidth < 768) {
    return (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'white',
          zIndex: 1000,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{ 
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          padding: '20px',
          zIndex: 10,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <h1 style={{ 
              fontSize: '1.8rem', 
              color: '#1a1a1a', 
              margin: 0,
              fontWeight: '700'
            }}>
              join us
            </h1>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ×
            </button>
          </div>
          <p style={{ 
            fontSize: '0.9rem', 
            color: '#666',
            margin: '12px 0 0 0',
            lineHeight: '1.4'
          }}>
            can't find a good match? - <a 
              href="https://airtable.com/appJtaRURYFPJILxd/pagB3AhwXoOxDsDX9/form" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: '#0066cc',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              apply to our blank application here
            </a>
          </p>
        </div>

        {/* Jobs Grid */}
        <div style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          touchAction: 'manipulation',
        }}>
          {jobs.map((job) => (
            <div
              key={job.id}
              style={{
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.1)',
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                zIndex: 1,
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
              }}
              onClick={() => handleApply(job)}
            >
              <h3 style={{ 
                fontSize: '1.2rem', 
                color: '#1a1a1a', 
                marginBottom: '12px',
                fontWeight: '600',
                lineHeight: '1.3'
              }}>
                {job.title}
              </h3>
              <div style={{ 
                display: 'flex', 
                gap: '8px', 
                marginBottom: '12px',
                flexWrap: 'wrap'
              }}>
                <span style={{
                  background: '#e8f4fd',
                  color: '#2c5aa0',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontWeight: '500'
                }}>
                  {job.department}
                </span>
                <span style={{
                  background: '#f0f8e8',
                  color: '#5a7c3a',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontWeight: '500'
                }}>
                  {job.type}
                </span>
              </div>
              <p style={{ 
                fontSize: '0.8rem', 
                color: '#666',
                marginBottom: '16px',
                lineHeight: '1.4'
              }}>
                {job.location}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <p style={{ 
                  fontSize: '0.85rem', 
                  color: '#444',
                  margin: 0,
                  lineHeight: '1.5',
                  flex: 1,
                }}>
                  {job.description.substring(0, 120)}...
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApply(job);
                  }}
                  style={{
                    background: '#1a1a1a',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginLeft: '12px',
                    whiteSpace: 'nowrap',
                    zIndex: 1,
                    position: 'relative',
                  }}
                >
                  More Info
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop layout - keep existing modal
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      <div
        style={{
          width: '90vw',
          maxWidth: '1200px',
          maxHeight: '85vh',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '28px',
            cursor: 'pointer',
            color: '#666',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 40px 20px 40px',
          borderBottom: '1px solid rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ 
            fontSize: '3rem', 
            color: '#1a1a1a', 
            marginBottom: '16px',
            fontWeight: '700'
          }}>
            join us
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#666',
            margin: 0,
            lineHeight: '1.5'
          }}>
            can't find a good match? - <a 
              href="https://airtable.com/appJtaRURYFPJILxd/pagB3AhwXoOxDsDX9/form" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: '#0066cc',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              apply to our blank application here
            </a>
          </p>
        </div>

        {/* Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          height: 'calc(85vh - 200px)',
          width: '100%',
          overflow: 'visible',
        }}>
          {/* Job List */}
          <div style={{
            width: '50%',
            borderRight: '1px solid rgba(0,0,0,0.1)',
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '20px',
            height: '100%',
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px',
            }}>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => handleJobSelect(job)}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: selectedJob?.id === job.id ? '2px solid #1a1a1a' : '1px solid rgba(0,0,0,0.1)',
                    background: selectedJob?.id === job.id ? 'rgba(26,26,26,0.05)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'none',
                  }}
                >
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    color: '#1a1a1a', 
                    marginBottom: '8px',
                    fontWeight: '600',
                    lineHeight: '1.4'
                  }}>
                    {job.title}
                  </h3>
                  <div style={{ 
                    display: 'flex', 
                    gap: '8px', 
                    marginBottom: '8px',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      background: '#e8f4fd',
                      color: '#2c5aa0',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: '500'
                    }}>
                      {job.department}
                    </span>
                    <span style={{
                      background: '#f0f8e8',
                      color: '#5a7c3a',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: '500'
                    }}>
                      {job.type}
                    </span>
                  </div>
                  <p style={{ 
                    fontSize: '0.8rem', 
                    color: '#666',
                    margin: 0
                  }}>
                    {job.location}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Job Details */}
          <div style={{
            width: '50%',
            padding: '20px',
            overflowY: 'auto',
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
                         {selectedJob ? (
               <div style={{
                 display: 'flex',
                 flexDirection: 'column',
                 alignItems: 'flex-start',
                 textAlign: 'left',
                 width: 'auto',
                 maxWidth: 'none',
                 padding: '0',
               }}>
                 <h2 style={{ 
                   fontSize: '1.8rem', 
                   color: '#1a1a1a', 
                   marginBottom: '16px',
                   fontWeight: '600',
                   lineHeight: '1.4'
                 }}>
                   {selectedJob.title}
                 </h2>
                 <div style={{ 
                   display: 'flex', 
                   gap: '12px', 
                   marginBottom: '20px',
                   flexWrap: 'wrap',
                   justifyContent: 'flex-start'
                 }}>
                   <span style={{
                     background: '#e8f4fd',
                     color: '#2c5aa0',
                     padding: '6px 12px',
                     borderRadius: '6px',
                     fontSize: '0.8rem',
                     fontWeight: '500'
                   }}>
                     {selectedJob.department}
                   </span>
                   <span style={{
                     background: '#f0f8e8',
                     color: '#5a7c3a',
                     padding: '6px 12px',
                     borderRadius: '6px',
                     fontSize: '0.8rem',
                     fontWeight: '500'
                   }}>
                     {selectedJob.location}
                   </span>
                   <span style={{
                     background: '#fdf2e8',
                     color: '#a05a2c',
                     padding: '6px 12px',
                     borderRadius: '6px',
                     fontSize: '0.8rem',
                     fontWeight: '500'
                   }}>
                     {selectedJob.type}
                   </span>
                 </div>
                 
                                   {/* Apply button moved above job description on mobile */}
                  <button
                    onClick={handleApply}
                    style={{
                      background: '#1a1a1a',
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'none',
                      marginBottom: '24px',
                      width: 'auto',
                    }}
                  >
                    Apply for this position
                  </button>
                 
                                   <div style={{
                      background: 'rgba(0,0,0,0.02)',
                      padding: '20px',
                      borderRadius: '8px',
                      width: '100%',
                      textAlign: 'left',
                    }}>
                      <h3 style={{ 
                        fontSize: '1.1rem', 
                        color: '#1a1a1a', 
                        marginBottom: '12px',
                        fontWeight: '600'
                      }}>
                        Job Description
                      </h3>
                      <p style={{ 
                        fontSize: '0.9rem', 
                        color: '#444',
                        lineHeight: '1.6',
                        margin: 0
                      }}>
                        {selectedJob.description}
                      </p>
                    </div>
               </div>
                          ) : (
               <div style={{
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 height: '100%',
                 color: '#666',
                 fontSize: '1.1rem',
                 textAlign: 'center',
                 width: 'auto',
                 maxWidth: 'none',
               }}>
                 Select a position to view details
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsModal;
