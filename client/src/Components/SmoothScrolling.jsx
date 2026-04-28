import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { ReactLenis } from "@studio-freight/react-lenis";

/**
 * SmoothScrolling
 * Wraps application content to enable smooth, physics-based scrolling.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to render inside the smooth scroll container.
 * @param {Object} [props.options] - Optional Lenis configuration overrides.
 * @returns {React.ReactNode}
 */
function SmoothScrolling({ children, options }) {
  // Default Lenis options
  const defaultOptions = useMemo(() => ({
    lerp: 0.1,           // interpolation factor
    duration: 1.5,       // easing duration
    smooth: true,        // enable smooth scrolling
    smoothTouch: false,  // disable on-touch smoothing
    ...options           // allow overrides via props
  }), [options]);

  return (
    <ReactLenis root options={defaultOptions}>
      {children}
    </ReactLenis>
  );
}

SmoothScrolling.propTypes = {
  children: PropTypes.node.isRequired,
  options: PropTypes.shape({
    lerp: PropTypes.number,
    duration: PropTypes.number,
    smooth: PropTypes.bool,
    smoothTouch: PropTypes.bool
  })
};

 

export default SmoothScrolling;
