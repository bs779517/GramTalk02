"use client";

import React, { useEffect, useRef } from 'react';

const AdComponent: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adRef.current && adRef.current.children.length === 0) {
      const scriptWithOptions = document.createElement('script');
      scriptWithOptions.type = 'text/javascript';
      scriptWithOptions.innerHTML = `
        atOptions = {
          'key' : '0b4e1b965099d81ed22df22cdda339db',
          'format' : 'iframe',
          'height' : 50,
          'width' : 320,
          'params' : {}
        };
      `;
      
      const scriptInvoke = document.createElement('script');
      scriptInvoke.type = 'text/javascript';
      scriptInvoke.src = '//www.highperformanceformat.com/0b4e1b965099d81ed22df22cdda339db/invoke.js';

      adRef.current.appendChild(scriptWithOptions);
      adRef.current.appendChild(scriptInvoke);
    }
  }, []);

  return <div ref={adRef} className="flex justify-center my-2"></div>;
};

export default AdComponent;
