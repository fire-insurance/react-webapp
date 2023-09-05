import s from './header.module.scss';
import { AppRoutes } from '@/z-shared/config/routeConfig';
import { WithClassName } from '@/z-shared/types/withClassname';
import clsx from 'clsx';
import { AppLink } from '@/z-shared/ui/appLink';
import { useTranslation } from 'react-i18next';

interface HeaderProps extends WithClassName {}

export const Header = ({ className }: HeaderProps) => {
    const { t } = useTranslation();

    return (
        <header className={clsx(s['container'], className)}>
            <div>Приложение</div>
            <nav className={s['nav']}>
                <AppLink to={AppRoutes.MAIN}>
                    {t('mainPage')}
                </AppLink>
                <AppLink to={AppRoutes.ABOUT}>
                    {t('aboutPage')}
                </AppLink>
            </nav>
        </header>
    );
};
