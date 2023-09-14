import { useTranslation } from 'react-i18next';
import s from './mainPage.module.scss';
import { Input, InputSkeleton } from '@/z-shared/ui/input';
import Fire from '@/z-shared/assets/icons/fire.svg';
import Info from '@/z-shared/assets/icons/info.svg';
import { Button } from '@/z-shared/ui/button';
import { useEffect, useState } from 'react';
import { Checkbox, CheckboxSkeleton } from '@/z-shared/ui/checkbox';
import { ToggleButton, ToggleButtonGroup, ToggleButtonVariant } from '@/z-shared/ui/toggleButton';

const buttons = [ 1, 2, 3, 4 ];

const MainPage = () => {
    const { t } = useTranslation('mainPage');

    const [ help, setHelp ] = useState<string>('');
    const [ err, setErr ] = useState<string>('');
    const [ val, setVal ] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setHelp('This is a helper');
        }, 3000);

        setTimeout(() => {
            setVal('value');
        }, 4000);

        setTimeout(() => {
            setErr('This is a big fucking error! You are doing something very goddamn wrong');
        }, 5000);

        setTimeout(() => {
            setErr('');
            setHelp('');
        }, 7000);
    }, []);

    const [ meme, setMeme ] = useState<string>('1');

    return (
        <form className={s['container']}>
            {t('page')}
            <div className={s['grid']}>
                <Input
                    background={'secondary'}
                    placeholder={'place'}
                    label={'A very big fucking label come on'}
                    autoComplete={'email'}
                    name={'email'}
                    type={'email'}
                    helperText={help}
                    errorText={err}
                />
                <InputSkeleton/>
            </div>
            <Input
                background={'secondary'}
                icon={Fire}
                placeholder={'place'}
            />
            <Input
                background={'secondary'}
                icon={Fire}
                label={'A very big fucking label come on'}
                button={{ icon: Info }}
                defaultValue={val}
            />
            <Checkbox text={'gdfg'}/>
            <CheckboxSkeleton
                text={true}
                lastLineWidth={'25'}
            />
            <ToggleButtonGroup
                name={'btn'}
                value={meme}
                onChange={setMeme}
                preventDeselect={true}
            >
                {
                    buttons.map(it => (
                        <ToggleButton
                            text={`${it}`}
                            value={`${it}`}
                            variant={ToggleButtonVariant.OUTLINE}
                            key={it}
                        />
                    ))
                }
            </ToggleButtonGroup>
            <Button
                type={'submit'}
                text={'sumbit'}
            />
        </form>
    );
};

export default MainPage;
