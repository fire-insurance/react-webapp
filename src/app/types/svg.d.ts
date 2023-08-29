declare type SVGComponent = React.VFC<React.SVGAttributes<SVGElement>>;

declare module '*.svg' {
    const SVG: SVGComponent;
    export default SVG;
}
