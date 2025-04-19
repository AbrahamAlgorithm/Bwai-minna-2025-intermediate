import { useRef, useEffect } from 'react';

const useIntersectionObserver = (callback, options = {}) => {
  const refs = {
    home: useRef(null),
    about: useRef(null),
    features: useRef(null),
    contact: useRef(null)
  };

  useEffect(() => {
    const observers = [];
    const observerOptions = {
      threshold: 0.3,
      ...options
    };

    Object.entries(refs).forEach(([key, ref]) => {
      if (ref.current) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              callback(key);
            }
          });
        }, observerOptions);

        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [callback, options]);

  return refs;
};

export default useIntersectionObserver;