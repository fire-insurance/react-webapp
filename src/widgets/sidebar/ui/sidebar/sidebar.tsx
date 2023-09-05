import useBooleanState from '@/z-shared/lib/hooks/useBooleanState';
import s from './sidebar.module.scss';
import { WithClassName } from '@/z-shared/types/withClassname';
import clsx from 'clsx';
import { ButtonVariant } from '@/z-shared/ui/button';
import AngleLeft from '@/z-shared/assets/icons/angle-left.svg';
import { ThemeSwitcher } from '@/widgets/themeSwitcher';
import { CollapsableButton } from '@/z-shared/ui/collapsableButton';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/widgets/languageSwitcher/ui/languageSwitcher';

interface SidebarProps extends WithClassName {}

export const Sidebar = ({ className }: SidebarProps) => {
    const [ collapsed, , , toggle ] = useBooleanState(false);
    const { t } = useTranslation();

    return (
        <div
            className={clsx(s['sidebar'], collapsed && s['sidebar--collapsed'], className)}
        >
            <div/>
            <div className={s['controls']}>
                <LanguageSwitcher collapsed={collapsed}/>
                <ThemeSwitcher collapsed={collapsed}/>
                <CollapsableButton
                    collapsed={collapsed}
                    variant={ButtonVariant.GHOST}
                    text={t('collapse')}
                    onClick={toggle}
                    icon={(
                        <AngleLeft
                            className={clsx('flipabble', collapsed && 'flipabble--flipped')}
                        />
                )}
                    fillContainer={true}
                />
            </div>
        </div>
    );
};
