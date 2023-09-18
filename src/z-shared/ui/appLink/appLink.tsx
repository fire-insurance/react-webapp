import s from './appLink.module.scss';
import { WithClassName } from '@/z-shared/types/withClassname';
import clsx from 'clsx';
import { Link, LinkProps } from 'react-router-dom';
import { AppRoutes, routePath } from '@/z-shared/config/routeConfig';

interface AppLinkProps extends WithClassName, Omit<LinkProps, 'to'> {
    to: AppRoutes;
}

export const AppLink = ({ className, to, children, ...rest }: AppLinkProps) => (
    <Link
        className={clsx(s['link'], className)}
        to={routePath[to]}
        {...rest}
    >
        {children}
    </Link>
);
