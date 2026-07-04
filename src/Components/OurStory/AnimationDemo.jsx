import React, { useRef, useEffect } from "react";
import { AnimationObserver, AnimationConfigs } from "../../utils/animationObserver";

const AnimationDemo = () => {
    const blurRef = useRef(null);
    const slideRef = useRef(null);
    const zoomRef = useRef(null);
    const flipRef = useRef(null);

    useEffect(() => {
        const observer = new AnimationObserver({
            threshold: 0.1,
            rootMargin: '-20px 0px 0px 0px',
            animationDelay: 200
        });

        // Observe different headings with different animations
        if (blurRef.current) {
            observer.observe(blurRef.current, AnimationConfigs.BLUR_3D);
        }
        if (slideRef.current) {
            observer.observe(slideRef.current, AnimationConfigs.SLIDE_3D);
        }
        if (zoomRef.current) {
            observer.observe(zoomRef.current, AnimationConfigs.ZOOM_3D);
        }
        if (flipRef.current) {
            observer.observe(flipRef.current, AnimationConfigs.FLIP_3D);
        }

        return () => {
            observer.destroy();
        };
    }, []);

    return (
        <div style={{ padding: '50px 20px', background: '#f8f9fa' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 ref={blurRef} style={{ marginBottom: '100px' }}>
                    Blur 3D Animation
                </h2>
                
                <h2 ref={slideRef} style={{ marginBottom: '100px' }}>
                    Slide 3D Animation
                </h2>
                
                <h2 ref={zoomRef} style={{ marginBottom: '100px' }}>
                    Zoom 3D Animation
                </h2>
                
                <h2 ref={flipRef} style={{ marginBottom: '100px' }}>
                    Flip 3D Animation
                </h2>
            </div>
        </div>
    );
};

export default AnimationDemo; 