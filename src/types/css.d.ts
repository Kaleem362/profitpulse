// Type declarations for non-module CSS files
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

