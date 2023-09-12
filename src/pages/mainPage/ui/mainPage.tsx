import { useTranslation } from 'react-i18next';
import s from './mainPage.module.scss';
import { Input } from '@/z-shared/ui/input';
import Fire from '@/z-shared/assets/icons/fire.svg';
import Info from '@/z-shared/assets/icons/info.svg';
import { Button } from '@/z-shared/ui/button';
import { useEffect, useState } from 'react';

const MainPage = () => {
    const { t } = useTranslation('mainPage');

    const [ help, setHelp ] = useState<string>('');
    const [ err, setErr ] = useState<string>('');

    useEffect(() => {
        setTimeout(() => {
            setHelp('This is a helper');
        }, 1000);

        setTimeout(() => {
            setErr('This is a big fucking error! You are doing something very goddamn wrong');
        }, 2000);

        setTimeout(() => {
            setErr('');
            setHelp('');
        }, 5000);
    }, []);

    return (
        <form className={s['container']}>
            {t('page')}
            <Input
                background={'secondary'}
                placeholder={'place'}
                autoComplete={'email'}
                name={'email'}
                type={'email'}
                helperText={help}
                errorText={err}
            />
            <Input
                background={'secondary'}
                icon={Fire}
                label={'test'}
                placeholder={'place'}

            />
            <Input
                background={'secondary'}
                icon={Fire}
                label={'gedrte'}
                button={{ icon: Info }}
            />
            <Button
                type={'submit'}
                text={'sumbit'}
            />
        </form>
    );
};

export default MainPage;
