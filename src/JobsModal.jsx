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
      description: "You’ll build high-performance systems for real-time data streaming—spanning video pipelines, transport protocols, and network optimization. As an early SWE at mundane, you’ll also work across the stack: from core infrastructure to deployment tools, owning projects end-to-end and shaping how our robots learn and scale."
    },
    {
      id: 2,
      title: "Controls Engineer",
      department: "Applications", 
      location: "Palo Alto, CA",
      type: "Full-time",
      description: "You’ll design and deploy the low-latency, high-fidelity control systems that link human operators to humanoid robots. From intent estimation to torque control and haptics, you’ll make teleoperation seamless, safe, and intuitive. This is a hands-on role — tuning parameters, integrating sensors, and solving problems that only appear in the real world."
    },
    {
      id: 3,
      title: "Machine Learning Engineer",
      department: "Co-op Applications",
      location: "Palo Alto, CA", 
      type: "Co-op",
      description: "You’ll develop, train, and deploy robot learning models using real-world data from our fleet. This is a hands-on role — collecting and labeling demonstrations, testing models on hardware, and iterating until they work in messy, unpredictable environments. You’ll work closely with controls, hardware, and perception teams to bring ML pipelines into live deployment."
    },
    {
      id: 4,
      title: "Mechatronics Engineer",
      department: "Co-op Applications",
      location: "Palo Alto, CA",
      type: "Co-op", 
      description: "As a Mechatronics Co-op Engineer, you’ll work at the intersection of electrical, mechanical, and software systems to bring our humanoid systems to life in the real world. You will focus on integrating sensors, actuators, and embedded systems into production-ready robotic platforms, solving complex problems from to system-level debugging. Your work will directly impact the performance, safety, and reliability of robots deployed in active customer environments. You’ll collaborate closely with our hardware, controls, and ML teams to design, prototype, and iterate on both individual subsystems and complete robotic assemblies. This role is highly hands-on and ideal for an engineering student with real-world robotics experience who thrives in a startup environment."
    },
    {
      id: 5,
      title: "Perception Engineer",
      department: "Computer Vision & Sensing",
      location: "Palo Alto, CA",
      type: "Full-time",
      description: "You’ll design and deploy perception systems that let our robots see and understand the world. From real-time object detection to multi-sensor fusion, you’ll tackle vision challenges in dynamic, cluttered environments. As an early engineer at mundane, you’ll shape the core of our perception stack—balancing cutting-edge research with reliable, field-ready systems."
    },
    {
      id: 6,
      title: "Robotics Engineer",
      department: "Motion Planning & Control",
      location: "Palo Alto, CA",
      type: "Full-time",
      description: "You’ll develop the planning and control algorithms that make our robots move with precision and intent. Your work will span trajectory optimization, reactive control, and dexterous manipulation, all under real-world constraints. At mundane, you’ll take ideas from whiteboard to deployment, ensuring our robots can operate safely and smoothly in the wild."
    },
    {
      id: 7,
      title: "Embedded Systems Engineer",
      department: "Real-Time Robotics",
      location: "Palo Alto, CA",
      type: "Full-time",
      description: "You’ll build the embedded systems that serve as the nervous system of our robots. From low-level drivers to real-time communication protocols, you’ll ensure our platforms remain responsive, reliable, and efficient under load. At mundane, you’ll own firmware end-to-end—bringing together hardware, software, and integration to keep our robots mission-ready."
    },
    {
      id: 8,
      title: "Simulation Engineer",
      department: "Physics & Reinforcement Learning",
      location: "Palo Alto, CA",
      type: "Full-time",
      description: "You’ll create simulation environments that accelerate how our robots learn and adapt. From physics-based modeling to reinforcement learning pipelines, you’ll design the tools that let us test, train, and validate at scale before hitting the real world. As part of mundane, you’ll bridge the gap between sim and reality, making every experiment count."
    },
    {
      id: 9,
      title: "Human–Robot Interaction Engineer",
      department: "Interfaces & UX",
      location: "Palo Alto, CA",
      type: "Full-time",
      description: "You’ll design the interfaces and experiences that define how people command, teach, and collaborate with robots. From intuitive teleoperation to novel feedback and visualization systems, you’ll shape the touchpoints that make robots usable and trusted. At mundane, you’ll own the end-user experience—ensuring humans and robots work seamlessly side by side."
    },
    {
      id: 10,
      title: "Systems Integration Engineer",
      department: "Robotics Platforms",
      location: "Palo Alto, CA",
      type: "Full-time",
      description: "You’ll integrate perception, control, and hardware into cohesive robotic platforms. That means debugging complex system interactions, testing at scale, and making sure every subsystem plays nicely together. At mundane, you’ll be the glue across disciplines, ensuring our robots make the leap from prototype to reliable deployment in the field."
    }
  ];

  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  const handleApply = () => {
    if (selectedJob) {
      // Use specific forms for certain jobs, general form for others
      let applyUrl = 'https://airtable.com';
      
      if (selectedJob.id === 1) { // Software Engineer
        applyUrl = 'https://airtable.com/appJtaRURYFPJILxd/pagufE698acYXrH0f/form';
      } else if (selectedJob.id === 2) { // Controls Engineer
        applyUrl = 'https://airtable.com/appJtaRURYFPJILxd/pag7sY3iibHHVyczd/form';
      } else if (selectedJob.id === 3) { // Machine Learning Engineer
        applyUrl = 'https://airtable.com/appJtaRURYFPJILxd/pagFF9UMpRc9TMV4P/form';
      } else if (selectedJob.id === 4) { // Mechatronics Engineer Co-op
        applyUrl = 'https://airtable.com/appJtaRURYFPJILxd/pagGZVBysm5UAjBii/form';
      } else { // Perception Engineer onwards (IDs 5-10) - use blank application
        applyUrl = 'https://airtable.com/appJtaRURYFPJILxd/pagB3AhwXoOxDsDX9/form';
      }
      
      window.open(applyUrl, '_blank');
    }
  };

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
          width: window.innerWidth < 768 ? '95vw' : '90vw',
          maxWidth: '1200px',
          maxHeight: window.innerWidth < 768 ? '90vh' : '85vh',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: window.innerWidth < 768 ? '12px' : '16px',
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
          padding: window.innerWidth < 768 ? '20px 20px 15px 20px' : '40px 40px 20px 40px',
          borderBottom: '1px solid rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ 
            fontSize: window.innerWidth < 768 ? '2rem' : '3rem', 
            color: '#1a1a1a', 
            marginBottom: window.innerWidth < 768 ? '12px' : '16px',
            fontWeight: '700'
          }}>
            join us
          </h1>
          <p style={{ 
            fontSize: window.innerWidth < 768 ? '1rem' : '1.2rem', 
            color: '#666',
            margin: 0,
            lineHeight: window.innerWidth < 768 ? '1.4' : '1.5'
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
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          height: window.innerWidth < 768 ? 'calc(90vh - 140px)' : 'calc(85vh - 200px)',
          width: '100%',
          overflow: window.innerWidth < 768 ? 'hidden' : 'visible',
        }}>
          {/* Job List */}
          <div style={{
            width: window.innerWidth < 768 ? '100%' : '50%',
            borderRight: window.innerWidth < 768 ? 'none' : '1px solid rgba(0,0,0,0.1)',
            borderBottom: window.innerWidth < 768 ? '1px solid rgba(0,0,0,0.1)' : 'none',
            overflowY: window.innerWidth < 768 ? 'hidden' : 'auto',
            overflowX: window.innerWidth < 768 ? 'auto' : 'hidden',
            padding: window.innerWidth < 768 ? '12px' : '20px',
            height: window.innerWidth < 768 ? 'auto' : '100%',
            minHeight: window.innerWidth < 768 ? '160px' : 'auto',
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: window.innerWidth < 768 ? 'row' : 'column', 
              gap: window.innerWidth < 768 ? '10px' : '12px',
              minWidth: window.innerWidth < 768 ? 'max-content' : 'auto',
              justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start',
              alignItems: window.innerWidth < 768 ? 'flex-start' : 'stretch',
              width: window.innerWidth < 768 ? '100%' : 'auto',
            }}>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => handleJobSelect(job)}
                  style={{
                    padding: window.innerWidth < 768 ? '12px' : '16px',
                    borderRadius: '8px',
                    border: selectedJob?.id === job.id ? '2px solid #1a1a1a' : '1px solid rgba(0,0,0,0.1)',
                    background: selectedJob?.id === job.id ? 'rgba(26,26,26,0.05)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'none',
                    minWidth: window.innerWidth < 768 ? '240px' : 'auto',
                    maxWidth: window.innerWidth < 768 ? '280px' : 'auto',
                    flexShrink: window.innerWidth < 768 ? 0 : 1,
                  }}
                >
                  <h3 style={{ 
                    fontSize: window.innerWidth < 768 ? '1rem' : '1.1rem', 
                    color: '#1a1a1a', 
                    marginBottom: window.innerWidth < 768 ? '6px' : '8px',
                    fontWeight: '600',
                    lineHeight: window.innerWidth < 768 ? '1.3' : '1.4'
                  }}>
                    {job.title}
                  </h3>
                  <div style={{ 
                    display: 'flex', 
                    gap: window.innerWidth < 768 ? '6px' : '8px', 
                    marginBottom: window.innerWidth < 768 ? '6px' : '8px',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      background: '#e8f4fd',
                      color: '#2c5aa0',
                      padding: window.innerWidth < 768 ? '3px 6px' : '4px 8px',
                      borderRadius: '4px',
                      fontSize: window.innerWidth < 768 ? '0.65rem' : '0.7rem',
                      fontWeight: '500'
                    }}>
                      {job.department}
                    </span>
                    <span style={{
                      background: '#f0f8e8',
                      color: '#5a7c3a',
                      padding: window.innerWidth < 768 ? '3px 6px' : '4px 8px',
                      borderRadius: '4px',
                      fontSize: window.innerWidth < 768 ? '0.65rem' : '0.7rem',
                      fontWeight: '500'
                    }}>
                      {job.type}
                    </span>
                  </div>
                  <p style={{ 
                    fontSize: window.innerWidth < 768 ? '0.75rem' : '0.8rem', 
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
            width: window.innerWidth < 768 ? '100%' : '50%',
            padding: window.innerWidth < 768 ? '12px' : '20px',
            overflowY: window.innerWidth < 768 ? 'auto' : 'auto',
            height: window.innerWidth < 768 ? 'calc(90vh - 320px)' : '100%',
            display: 'flex',
            justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start',
            alignItems: window.innerWidth < 768 ? 'flex-start' : 'flex-start',
          }}>
                         {selectedJob ? (
               <div style={{
                 display: 'flex',
                 flexDirection: 'column',
                 alignItems: window.innerWidth < 768 ? 'center' : 'flex-start',
                 textAlign: window.innerWidth < 768 ? 'center' : 'left',
                 width: window.innerWidth < 768 ? '100%' : 'auto',
                 maxWidth: window.innerWidth < 768 ? 'none' : 'none',
                 padding: window.innerWidth < 768 ? '0' : '0',
               }}>
                 <h2 style={{ 
                   fontSize: window.innerWidth < 768 ? '1.4rem' : '1.8rem', 
                   color: '#1a1a1a', 
                   marginBottom: window.innerWidth < 768 ? '12px' : '16px',
                   fontWeight: '600',
                   lineHeight: window.innerWidth < 768 ? '1.3' : '1.4'
                 }}>
                   {selectedJob.title}
                 </h2>
                 <div style={{ 
                   display: 'flex', 
                   gap: window.innerWidth < 768 ? '8px' : '12px', 
                   marginBottom: window.innerWidth < 768 ? '16px' : '20px',
                   flexWrap: 'wrap',
                   justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start'
                 }}>
                   <span style={{
                     background: '#e8f4fd',
                     color: '#2c5aa0',
                     padding: window.innerWidth < 768 ? '4px 8px' : '6px 12px',
                     borderRadius: '6px',
                     fontSize: window.innerWidth < 768 ? '0.7rem' : '0.8rem',
                     fontWeight: '500'
                   }}>
                     {selectedJob.department}
                   </span>
                   <span style={{
                     background: '#f0f8e8',
                     color: '#5a7c3a',
                     padding: window.innerWidth < 768 ? '4px 8px' : '6px 12px',
                     borderRadius: '6px',
                     fontSize: window.innerWidth < 768 ? '0.7rem' : '0.8rem',
                     fontWeight: '500'
                   }}>
                     {selectedJob.location}
                   </span>
                   <span style={{
                     background: '#fdf2e8',
                     color: '#a05a2c',
                     padding: window.innerWidth < 768 ? '4px 8px' : '6px 12px',
                     borderRadius: '6px',
                     fontSize: window.innerWidth < 768 ? '0.7rem' : '0.8rem',
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
                      padding: window.innerWidth < 768 ? '10px 20px' : '12px 24px',
                      borderRadius: '8px',
                      fontSize: window.innerWidth < 768 ? '0.9rem' : '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'none',
                      marginBottom: window.innerWidth < 768 ? '16px' : '24px',
                      width: window.innerWidth < 768 ? 'auto' : 'auto',
                    }}
                  >
                    {window.innerWidth < 768 ? 'More Info' : 'Apply for this position'}
                  </button>
                 
                                   {window.innerWidth >= 768 && (
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
                  )}
               </div>
                          ) : (
               <div style={{
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 height: '100%',
                 color: '#666',
                 fontSize: window.innerWidth < 768 ? '1rem' : '1.1rem',
                 textAlign: 'center',
                 width: window.innerWidth < 768 ? '90%' : 'auto',
                 maxWidth: window.innerWidth < 768 ? '400px' : 'none',
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
