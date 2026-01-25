// components/AdvergicLoader.tsx
'use client';

import { useEffect } from 'react';

export default function AdvergicLoader() {
  useEffect(() => {
    // Prevent duplicate loading
    if (document.getElementById('advergic-script')) return;

    const script = document.createElement('script');
    script.id = 'advergic-script';
    script.src = 'https://avads.live/s/av-firstjobly.js';
    script.async = true;
    document.head.appendChild(script);

    // Optional: cleanup on unmount
    return () => {
      const existing = document.getElementById('advergic-script');
      if (existing) document.head.removeChild(existing);
    };
  }, []);

  return null;
}