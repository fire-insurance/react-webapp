import { RuleSetRule } from 'webpack';

export const buildLoaders = (): RuleSetRule[] => [
    {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    },
];
