import s from './loader.module.scss';
import { HTMLAttributes } from 'react';
import clsx from 'clsx';

export const Loader = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
    <div
        className={clsx(s['loader'], className)}
        {...rest}
    >
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
    </div>
);
