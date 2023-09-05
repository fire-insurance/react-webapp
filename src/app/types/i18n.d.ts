import 'i18next';
import globalNs from 'public/locales/ru/global.json';
import mainPageNs from 'public/locales/ru/mainPage.json';
import aboutPageNs from 'public/locales/ru/aboutPage.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'global';
        resources: {
            global: typeof globalNs;
            aboutPage: typeof aboutPageNs;
            mainPage: typeof mainPageNs;
        };
    }
}
