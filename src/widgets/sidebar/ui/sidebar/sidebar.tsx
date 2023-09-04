import useBooleanState from '@/z-shared/lib/hooks/useBooleanState';
import s from './sidebar.module.scss';
import { WithClassName } from '@/z-shared/types/withClassname';
import clsx from 'clsx';
import { Button, ButtonVariant } from '@/z-shared/ui/button';
import AngleLeft from '@/z-shared/assets/icons/angle-left.svg';
import { ThemeSwitcher } from '@/widgets/themeSwitcher';

interface SidebarProps extends WithClassName {}

export const Sidebar = ({ className }: SidebarProps) => {
    const [ collapsed, , , toggle ] = useBooleanState(false);

    return (
        <div
            className={clsx(s['sidebar'], collapsed && s['sidebar--collapsed'], className)}
        >
            <div/>
            <div className={s['controls']}>
                <ThemeSwitcher collapsed={collapsed}/>
                <Button
                    variant={ButtonVariant.GHOST}
                    text={collapsed ? undefined : 'Свернуть'}
                    onClick={toggle}
                    icon={(
                        <AngleLeft
                            className={clsx('flipabble', collapsed && 'flippable--flipped')}
                        />
                )}
                    fillContainer={true}
                />
            </div>
        </div>
    );
};
