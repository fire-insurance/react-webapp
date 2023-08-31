declare type SVGComponent = React.FC<React.SVGAttributes<SVGElement>>;

declare module '*.svg' {
    const SVG: SVGComponent;
    export default SVG;
}
