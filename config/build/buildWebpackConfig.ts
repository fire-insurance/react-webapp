import { Configuration } from 'webpack';
import { BuildOptions } from './types/config';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';

export const buildWebpackConfig = ({ mode, paths }: BuildOptions): Configuration => ({
    mode,
    entry: paths.entry,
    output: {
        filename: '[name].[contenthash].js',
        path: paths.build,
        clean: true,
    },
    module: {
        rules: buildLoaders(),
    },
    resolve: buildResolvers(),
    plugins: buildPlugins(paths),
});
