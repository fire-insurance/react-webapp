import { Button, ButtonVariant } from '@/z-shared/ui/button';
import Test from '@/z-shared/assets/icons/uil_fire.svg';

const MainPage = () => <>
    <Button
        variant={ButtonVariant.PRIMARY}
        text={'button'}
        icon={<Test/>}
    />
    <Test style={{ 'width': '32px', 'height': '32px' }}/>
</>;

export default MainPage;
