import { useTranslation } from 'react-i18next';
import s from './mainPage.module.scss';

const MainPage = () => {
    const { t } = useTranslation('mainPage');

    return (
        <div className={s['container']}>
            {t('page')}
        </div>
    );
};

export default MainPage;
