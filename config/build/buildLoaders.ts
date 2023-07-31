import { RuleSetRule } from 'webpack';

export const buildLoaders = (): RuleSetRule[] => {
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ],
    };

    return [ typescriptLoader, cssLoader ];
};
