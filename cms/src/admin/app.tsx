import { type StrapiApp } from '@strapi/strapi/admin';


export default {
  config: {
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
  },
    bootstrap(app: StrapiApp) {
    
      const style = document.createElement('style');
      style.innerHTML = `
        /* Скрываем страницу настроек */
        [href*="/settings"] { 
          display: none !important; 
        }
        /* Скрываем иконку настроек */
        a[href*="/settings"], button[data-for="settings"] {
          display: none !important;
        }
        
        /* Скрываем Marketplace */
        [href*="/marketplace"], a[href*="/marketplace"], div[data-for="marketplace"] {
          display: none !important;
        }
        
        /* Скрываем Deploy */
        [href*="/deploy"], a[href*="/plugins/cloud"], div[data-for="deploy"] {
          display: none !important;
        }
        
        /* Скрываем Content-Builder */
        [href*="/content-type-builder"], a[href*="/plugins/content-type-builder"], div[data-for="content-type-builder"] {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }
};
