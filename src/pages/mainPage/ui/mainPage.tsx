/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import s from './mainPage.module.scss';
import { Input, InputSkeleton } from '@/z-shared/ui/input';
import Fire from '@/z-shared/assets/icons/fire.svg';
import Info from '@/z-shared/assets/icons/info.svg';
import { Button, ButtonVariant } from '@/z-shared/ui/button';
import { useEffect, useMemo, useState } from 'react';
import { Checkbox, CheckboxSkeleton } from '@/z-shared/ui/checkbox';
import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupSkeleton, ToggleButtonSize, ToggleButtonVariant } from '@/z-shared/ui/toggleButton';
import { ToolTip, WithTooltip } from '@/z-shared/ui/toolTip';
import { useModal } from '@/z-shared/providers/modalProvider';
import NoEmailModal from './noEmailModal/noEmailModal';
import { Select, createGenericSelect } from '@/z-shared/ui/select';

const buttons = [ 1, 2, 3, 4 ];

const optionKeys = [ 'option1', 'option2', 'option3' ] as const;
type OptionsKeyType = typeof optionKeys[number];

const options: Map<OptionsKeyType, string> = new Map([
    [ 'option1', 'Опция 1' ],
    [ 'option2', 'Опция 2' ],
    [ 'option3', 'Опция 3' ],
]);

const AppSelect = createGenericSelect<OptionsKeyType>();

const MainPage = () => {
    const { t } = useTranslation('mainPage');

    const [ help, setHelp ] = useState<string>('');
    const [ err, setErr ] = useState<string>('');
    const [ val, setVal ] = useState('');

    const [ openNoEmailModal ] = useModal(NoEmailModal);

    const [ selectedValue, setSelectedValue ] = useState<OptionsKeyType>();

    const getOptionLabel = (value: OptionsKeyType) => options.get(value);

    const memoOptions = useMemo(() => Array.from(options), []);

    useEffect(() => {
        setTimeout(() => {
            setHelp('This is a helper');
        }, 3000);
    }, []);

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

    const [ multiSelectedValue, setMultiSelectedValue ] = useState<OptionsKeyType[]>();

    const getMultiOptionLabel = (value: OptionsKeyType[] | undefined) =>
        value?.map(it => options.get(it)).join(', ');

    const [ open, setOpen ] = useState(true);

    return (
        <form className={s['container']}>
            {t('page')}
            <div className={s['grid']}>
                <Input
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
                icon={Fire}
                placeholder={'place'}
            />
            <Input
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
            {/* <ToggleButtonGroup
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
            </ToggleButtonGroup> */}
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
            <Button
                variant={ButtonVariant.SECONDARY}
                text={'Open email modal'}
            />
            <AppSelect
                label={'Basic select'}
                value={selectedValue}
                onChange={setSelectedValue}
                options={memoOptions}
                getOptionLabel={getOptionLabel}
                open={open}
                setOpen={setOpen}
            />
            <AppSelect
                multi={true}
                label={'Basic select'}
                value={multiSelectedValue}
                onChange={setMultiSelectedValue}
                options={memoOptions}
                getOptionLabel={getMultiOptionLabel}
            />
        </form>
    );
};

export default MainPage;
