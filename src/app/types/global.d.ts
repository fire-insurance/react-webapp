declare module '*.scss' {
    interface ClassNames {
        [className: string]: string;
    }

    const classNames: ClassNames;
    export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';

declare const __IS_DEV__: boolean;
