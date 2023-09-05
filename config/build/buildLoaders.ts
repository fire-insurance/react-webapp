import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { RuleSetRule } from 'webpack';
import { BuildOptions } from './types/config';

export const buildLoaders = ({ isDevelopment }: BuildOptions): RuleSetRule[] => {

    const svgLoader: RuleSetRule = {
        test: /\.svg$/,
        use: [ { loader: '@svgr/webpack', options: { icon: true } } ],
    };

    const babelLoader: RuleSetRule = {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [ '@babel/preset-env' ],
            },
        },
    };

    const imageLoader: RuleSetRule = {
        test: /\.(png|jpe?g|gif)$/,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    const typescriptLoader: RuleSetRule = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const cssLoader: RuleSetRule = {
        test: /\.s[ac]ss$/i,
        use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (path: string) => path.includes('.module.'),
                        localIdentName: isDevelopment
                            ? '__[local]--[hash:base64:8]'
                            : '[hash:base64:8]',
                    },
                },
            },
            'sass-loader',
        ],
    };

    return [ babelLoader, typescriptLoader, cssLoader, svgLoader, imageLoader ];
};
