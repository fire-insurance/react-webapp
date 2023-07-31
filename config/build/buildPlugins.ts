import { ProgressPlugin, WebpackPluginInstance } from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import { BuildPaths } from './types/config';

export const buildPlugins = (paths: BuildPaths): WebpackPluginInstance[] => [
    new HTMLWebpackPlugin({ template: paths.html }),
    new ProgressPlugin(),
    new MiniCSSExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
    }),
];
