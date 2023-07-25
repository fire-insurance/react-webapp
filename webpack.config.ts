import path from 'path';
import { Configuration } from 'webpack';
import { buildPlugins } from './config/build/buildPlugins';
import { buildLoaders } from './config/build/buildLoaders';

const config: Configuration = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
    module: {
        rules: buildLoaders(),
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    plugins: buildPlugins(),
};

export default config;
