import { ProgressPlugin, WebpackPluginInstance } from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export const buildPlugins = (): WebpackPluginInstance[] => [
    new HTMLWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new ProgressPlugin(),
];
