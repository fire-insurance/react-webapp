import { DefinePlugin, ProgressPlugin, WebpackPluginInstance } from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export const buildPlugins = ({ paths, isDevelopment }: BuildOptions): WebpackPluginInstance[] => [
    new HTMLWebpackPlugin({ template: paths.html }),
    new ProgressPlugin(),
    new MiniCSSExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new DefinePlugin({
        __IS_DEV__: JSON.stringify(isDevelopment),
    }),
    new ReactRefreshPlugin(),
];
