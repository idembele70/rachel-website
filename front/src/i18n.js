import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import translatetionENG from "values/texts/eng.json"
import translatetionFR from "values/texts/fr.json"

// the translations
const resources = {
  eng: {
    translation: translatetionENG
  },
  fr: {
    translation: translatetionFR
  }
}
i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    // debug: true
    // fallbackLng: "en"
    supportedLngs: ["fr", "en"],
    resources,
    detection: {
      order: ["htmlTag", "cookie", "localStorage", "path", "subdomain"],
      caches: ["cookie"]
    }
  })

export default i18n
