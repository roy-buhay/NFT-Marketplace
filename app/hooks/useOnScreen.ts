import React from "react";

export function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = React.useState<boolean>(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
   };
  }, []);
  return isIntersecting;
}
