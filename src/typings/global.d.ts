declare module '*.png' {
  const content: any;
  export default content;
}
declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.css' {
  const content: {[className: string]: string};
  export default content;
}

declare module '*.scss' {
  const content: {[className: string]: string};
  export default content;
}

declare var ACCESS_TOKEN: string;
declare var __webpack_public_path__: string;

declare module 'worker-loader!*' {
  export default class WebpackWorker extends Worker {}
}
