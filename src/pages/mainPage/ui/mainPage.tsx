import { useTranslation } from 'react-i18next';
import s from './mainPage.module.scss';
import { Input, InputSkeleton } from '@/z-shared/ui/input';
import Fire from '@/z-shared/assets/icons/fire.svg';
import Info from '@/z-shared/assets/icons/info.svg';
import { Button } from '@/z-shared/ui/button';
import { useEffect, useState } from 'react';
import { Checkbox, CheckboxSkeleton } from '@/z-shared/ui/checkbox';
import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupSkeleton, ToggleButtonSize, ToggleButtonVariant } from '@/z-shared/ui/toggleButton';
import { ToolTip, WithTooltip } from '@/z-shared/ui/toolTip';
import { useModal } from '@/z-shared/providers/modalProvider';
import NoEmailModal from './noEmailModal/noEmailModal';

const buttons = [ 1, 2, 3, 4 ];

const MainPage = () => {
    const { t } = useTranslation('mainPage');

    const [ help, setHelp ] = useState<string>('');
    const [ err, setErr ] = useState<string>('');
    const [ val, setVal ] = useState('');

    const [ openNoEmailModal ] = useModal(NoEmailModal);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setHelp('This is a helper');
    //     }, 3000);

    //     setTimeout(() => {
    //         setVal('value');
    //     }, 4000);

    //     setTimeout(() => {
    //         setErr('This is a big fucking error! You are doing something very goddamn wrong');
    //     }, 5000);

    //     setTimeout(() => {
    //         setErr('');
    //         setHelp('');
    //     }, 7000);
    // }, []);

    const [ meme, setMeme ] = useState<string | undefined>(undefined);

    const disabled = true;

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
                variant={ToggleButtonVariant.OUTLINE}
                size={ToggleButtonSize.S}
            >
                {
                    buttons.map((it, index) => (
                        <ToggleButton
                            text={`${it}`}
                            value={`${it}`}
                            key={it}
                        />
                    ))
                }
            </ToggleButtonGroup>
            <ToggleButtonGroupSkeleton
                buttonQuantity={4}
                size={ToggleButtonSize.S}
            />
            <ToggleButtonGroup
                name={'btn'}
                value={meme}
                onChange={setMeme}
                variant={ToggleButtonVariant.UNDERLINE}
            >
                {
                    buttons.map((it, index) => (
                        <ToggleButton
                            text={`${it}`}
                            value={`${it}`}
                            key={it}
                        />
                    ))
                }
            </ToggleButtonGroup>
            <ToolTip
                tip={'1 Lorem inpsum Lorem inpsum Lorem inpsum Lorem inpsum Lorem inpsum Lorem inpsum '}
                text={'This is This is This is'}
            />
            <ToolTip
                tip={'2 Lorem inpsum Lorem inpsum Lorem inpsum Lorem inpsum Lorem inpsum Lorem inpsum '}
            />
            <WithTooltip
                tip={'3 Button disabled cos fuck u'}
                showOnCondition={disabled}
            >
                <Button
                    type={'submit'}
                    text={'submit'}
                    fillContainer={true}
                    disabled={disabled}
                />
            </WithTooltip>
            <Button
                text={'Open email modal'}
                onClick={() => openNoEmailModal({ userEmail: 'anyemail' })}
            />
        </form>
    );
};

export default MainPage;
