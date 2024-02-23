export const hasParentClass = (event: any, className: string) => {
  return event.target.closest(`.${className}`);
};
