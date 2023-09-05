import s from './404.module.scss';
import { WithClassName } from '@/z-shared/types/withClassname';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface NotFound404Props extends WithClassName {}

export const NotFound404 = ({ className }: NotFound404Props) => {
    const { t } = useTranslation();

    return (
        <div className={clsx(s['container'], className)}>
            <h2>
                {t('404')}
            </h2>
        </div>
    );
};
