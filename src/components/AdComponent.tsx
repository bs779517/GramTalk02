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
          'key' : '50d2008a3c80f369abc7314e4077a50c',
          'format' : 'iframe',
          'height' : 50,
          'width' : 320,
          'params' : {}
        };
      `;
      
      const scriptInvoke = document.createElement('script');
      scriptInvoke.type = 'text/javascript';
      scriptInvoke.src = '//www.highperformanceformat.com/50d2008a3c80f369abc7314e4077a50c/invoke.js';

      adRef.current.appendChild(scriptWithOptions);
      adRef.current.appendChild(scriptInvoke);
    }
  }, []);

  return <div ref={adRef} className="flex justify-center my-2"></div>;
};

export default AdComponent;
