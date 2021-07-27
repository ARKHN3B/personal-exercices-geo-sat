import i18next            from "i18next";
import {initReactI18next} from "react-i18next";
import Backend            from "i18next-http-backend";
import {LocaleNamespace}  from "./helpers";

i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend      : {
      loadPath: "/assets/locales/{{lng}}/{{ns}}.json", // TODO: to .env
    },
    debug        : process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test",
    defaultNS    : LocaleNamespace.Common,
    fallbackLng  : "fr",
    interpolation: {
      escapeValue: false,
    }, // @ts-ignore
    lng          : "fr" | navigator.language || navigator.userLanguage, // FIXME unforce fr
    load         : "languageOnly",
    ns           : Object.values(LocaleNamespace),
    react        : {
      useSuspense: true, // TODO : add wait on subtree (https://react.i18next.com/legacy-v9/step-by-step-guide#b-loading-multiple-translation-files)
      wait       : true,
    },
  });

export default i18next; // imported in root (src/index.js|ts)
