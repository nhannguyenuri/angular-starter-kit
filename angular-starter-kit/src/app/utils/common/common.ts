export const isScrollAtBottom = (event: Event, scrollThreshold = 0) => {
  const element = event.target as HTMLElement;
  const deviceRatio = Math.ceil(window.devicePixelRatio ?? 1);
  // const atBottom = element.scrollHeight - Math.ceil(element.scrollTop) <= element.clientHeight + this.scrollThreshold;
  const atBottom = element.clientHeight + Math.ceil(element.scrollTop) + scrollThreshold >= element.scrollHeight - deviceRatio;

  return atBottom;
};
