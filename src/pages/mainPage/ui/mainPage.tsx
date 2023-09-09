import { useTranslation } from 'react-i18next';
import s from './mainPage.module.scss';
import { Input } from '@/z-shared/ui/input';

const MainPage = () => {
    const { t } = useTranslation('mainPage');

    return (
        <div className={s['container']}>
            {t('page')}
            <Input value={'2'}/>
        </div>
    );
};

export default MainPage;
