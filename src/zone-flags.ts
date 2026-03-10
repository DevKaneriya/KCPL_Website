/**
 * src/zone-flags.ts
 * Prevents Angular's Zone.js from magically forcing some events to be passive.
 * This is required for scrolling libraries like Lenis that call execute preventDefault()
 * inside wheel and touch event listeners.
 * 
 * Also unpatches these events entirely so Zone.js doesn't cause performance issues
 * or intercept them.
 */
(window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'wheel', 'touchstart', 'touchmove', 'touchend', 'touchcancel'];
