import { useTranslation } from 'react-i18next';
import s from './mainPage.module.scss';
import { Input } from '@/z-shared/ui/input';
import Fire from '@/z-shared/assets/icons/fire.svg';
import Info from '@/z-shared/assets/icons/info.svg';

const MainPage = () => {
    const { t } = useTranslation('mainPage');

    return (
        <div className={s['container']}>
            {t('page')}
            <Input background={'secondary'}/>
            <Input
                background={'secondary'}
                icon={Fire}
            />
            <Input
                background={'secondary'}
                icon={Fire}
                button={{ icon: Info }}
            />
        </div>
    );
};

export default MainPage;
