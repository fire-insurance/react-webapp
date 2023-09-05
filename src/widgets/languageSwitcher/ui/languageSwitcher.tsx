import { WithClassName } from '@/z-shared/types/withClassname';
import { ButtonVariant } from '@/z-shared/ui/button';
import { CollapsableButton } from '@/z-shared/ui/collapsableButton';
import { t } from 'i18next';
import Language from '@/z-shared/assets/icons/language.svg';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps extends WithClassName {
    collapsed: boolean;
}

export const LanguageSwitcher = ({ className, collapsed }: LanguageSwitcherProps) => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <CollapsableButton
            variant={ButtonVariant.GHOST}
            collapsed={collapsed}
            text={t('toggleLang')}
            icon={<Language/>}
            onClick={toggleLanguage}
            className={className}
        />
    );
};
