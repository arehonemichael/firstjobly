// components/GtagPageView.jsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function GtagPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.gtag || typeof window.gtag !== 'function') return;

    try {
      window.gtag('event', 'page_view', {
        page_path: pathname,
      });
    } catch (e) {
      // avoid breaking the app if analytics errors occur
      // eslint-disable-next-line no-console
      console.error('gtag page_view error', e);
    }
  }, [pathname]);

  return null;
}
