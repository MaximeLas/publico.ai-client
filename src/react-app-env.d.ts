/// <reference types="react-scripts" />

// Needed for .mp4 imports - https://github.com/facebook/create-react-app/issues/6822#issuecomment-483079845
declare module '*.mp4' {
  const src: string;
  export default src;
}
