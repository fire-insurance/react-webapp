import { ProgressPlugin, WebpackPluginInstance } from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import { BuildPaths } from './types/config';

export const buildPlugins = (paths: BuildPaths): WebpackPluginInstance[] => [
    new HTMLWebpackPlugin({ template: paths.html }),
    new ProgressPlugin(),
];
