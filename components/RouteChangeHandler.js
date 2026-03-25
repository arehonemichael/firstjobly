'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteChangeHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Wait until the Advergic script is fully loaded
    const callAdRefresh = () => {
      if (
        typeof window !== 'undefined' &&
        typeof av !== 'undefined' &&
        av?.google?.go_rAU
      ) {
        try {
          av.google.go_rAU();
        } catch (err) {
          console.warn('Advergic go_rAU failed:', err);
        }
      }
    };

    // Small delay to ensure the script has initialized
    const timeoutId = setTimeout(callAdRefresh, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}