/**
 * @param {HTMLElement} container
 * @param {HTMLElement} element
 * @param {Number} padding=0
 */
export default (container, element, padding = 0) => {
  const { top: containerTop, height: containerHeight } = container.getBoundingClientRect();
  const containerBottom = containerTop + containerHeight;

  const { top: elementTop, height: elementHeight } = element.getBoundingClientRect();
  const elementBottom = elementTop + elementHeight;

  // Check if in view
  const isTotalView =
    elementTop + padding >= containerTop && elementBottom - padding <= containerBottom;
  const isPartialView =
    (elementTop + padding < containerTop && elementBottom - padding > containerTop) ||
    (elementBottom - padding > containerBottom && elementTop - padding < containerBottom);

  return isTotalView || isPartialView;
};
