import { useTranslation } from 'react-i18next';
import s from './pageError.module.scss';
import { Button } from '@/z-shared/ui/button';

interface PageErrorProps {
}

export const PageError = ({}: PageErrorProps) => {
    const { t } = useTranslation();

    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <div className={s['container']}>
            <div className={s['content']}>
                <h3>
                    {t('unexpectedError')}
                </h3>
                <Button
                    text={t('refreshPage')}
                    onClick={reloadPage}
                />
            </div>
        </div>
    );
};
