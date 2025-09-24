import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Header
      "home": "Home",
      "schemes": "Schemes",
      "benefits": "My Benefits",
      "mandiPrices": "Mandi Prices",
      "reportCorruption": "Report Corruption",
      "profile": "Profile",
      "login": "Login",
      "register": "Register",
      
      // Hero Section
      "heroTitle1": "Transparent Farming,",
      "heroTitle2": "Corruption-Free Future",
      "heroSubtitle": "Direct access to government agricultural schemes without middlemen. No middlemen, no corruption, just transparency.",
      "checkBenefits": "Check My Benefits",
      "reportCorruptionBtn": "Report Corruption",
      "secure": "100% Secure",
      "benefits": "₹12,000+ Benefits",
      
      // Schemes Page
      "governmentSchemes": "Government Schemes",
      "schemesDescription": "Live database of Central and State government agricultural schemes from data.gov.in",
      "filterSchemes": "Filter Schemes",
      "searchPlaceholder": "Search schemes by name, description, or eligibility...",
      "allTypes": "All Types",
      "centralSchemes": "Central Schemes",
      "stateSchemes": "State Schemes",
      "clearFilters": "Clear Filters",
      "refreshData": "Refresh Data",
      "viewDetails": "View Details",
      "apply": "Apply",
      "applyNow": "Apply Now",
      
      // Common
      "loading": "Loading...",
      "error": "Error",
      "success": "Success",
      "close": "Close",
      "save": "Save",
      "cancel": "Cancel",
      "submit": "Submit"
    }
  },
  hi: {
    translation: {
      // Header
      "home": "होम",
      "schemes": "योजनाएं",
      "benefits": "मेरे लाभ",
      "mandiPrices": "मंडी भाव",
      "reportCorruption": "भ्रष्टाचार की रिपोर्ट",
      "profile": "प्रोफाइल",
      "login": "लॉगिन",
      "register": "पंजीकरण",
      
      // Hero Section
      "heroTitle1": "पारदर्शी खेती,",
      "heroTitle2": "भ्रष्टाचार मुक्त भविष्य",
      "heroSubtitle": "बिना बिचौलियों के सरकारी कृषि योजनाओं तक सीधी पहुंच। कोई बिचौलिया नहीं, कोई भ्रष्टाचार नहीं, केवल पारदर्शिता।",
      "checkBenefits": "मेरे लाभ देखें",
      "reportCorruptionBtn": "भ्रष्टाचार की रिपोर्ट करें",
      "secure": "100% सुरक्षित",
      "benefits": "₹12,000+ लाभ",
      
      // Schemes Page
      "governmentSchemes": "सरकारी योजनाएं",
      "schemesDescription": "data.gov.in से केंद्रीय और राज्य सरकारी कृषि योजनाओं का लाइव डेटाबेस",
      "filterSchemes": "योजनाएं फिल्टर करें",
      "searchPlaceholder": "नाम, विवरण या पात्रता के आधार पर योजनाएं खोजें...",
      "allTypes": "सभी प्रकार",
      "centralSchemes": "केंद्रीय योजनाएं",
      "stateSchemes": "राज्य योजनाएं",
      "clearFilters": "फिल्टर साफ़ करें",
      "refreshData": "डेटा रीफ्रेश करें",
      "viewDetails": "विवरण देखें",
      "apply": "आवेदन करें",
      "applyNow": "अभी आवेदन करें",
      
      // Common
      "loading": "लोड हो रहा है...",
      "error": "त्रुटि",
      "success": "सफलता",
      "close": "बंद करें",
      "save": "सेव करें",
      "cancel": "रद्द करें",
      "submit": "जमा करें"
    }
  },
  pa: {
    translation: {
      // Header
      "home": "ਘਰ",
      "schemes": "ਸਕੀਮਾਂ",
      "benefits": "ਮੇਰੇ ਫਾਇਦੇ",
      "mandiPrices": "ਮੰਡੀ ਭਾਅ",
      "reportCorruption": "ਭ੍ਰਿਸ਼ਟਾਚਾਰ ਦੀ ਰਿਪੋਰਟ",
      "profile": "ਪ੍ਰੋਫਾਈਲ",
      "login": "ਲਾਗਇਨ",
      "register": "ਰਜਿਸਟਰ",
      
      // Hero Section
      "heroTitle1": "ਪਾਰਦਰਸ਼ੀ ਖੇਤੀ,",
      "heroTitle2": "ਭ੍ਰਿਸ਼ਟਾਚਾਰ ਮੁਕਤ ਭਵਿੱਖ",
      "heroSubtitle": "ਬਿਚੌਲਿਆਂ ਤੋਂ ਬਿਨਾਂ ਸਰਕਾਰੀ ਖੇਤੀ ਸਕੀਮਾਂ ਤੱਕ ਸਿੱਧੀ ਪਹੁੰਚ। ਕੋਈ ਬਿਚੌਲਿਆ ਨਹੀਂ, ਕੋਈ ਭ੍ਰਿਸ਼ਟਾਚਾਰ ਨਹੀਂ, ਸਿਰਫ਼ ਪਾਰਦਰਸ਼ਤਾ।",
      "checkBenefits": "ਮੇਰੇ ਫਾਇਦੇ ਦੇਖੋ",
      "reportCorruptionBtn": "ਭ੍ਰਿਸ਼ਟਾਚਾਰ ਦੀ ਰਿਪੋਰਟ ਕਰੋ",
      "secure": "100% ਸੁਰੱਖਿਤ",
      "benefits": "₹12,000+ ਫਾਇਦੇ",
      
      // Schemes Page
      "governmentSchemes": "ਸਰਕਾਰੀ ਸਕੀਮਾਂ",
      "schemesDescription": "data.gov.in ਤੋਂ ਕੇਂਦਰੀ ਅਤੇ ਰਾਜ ਸਰਕਾਰੀ ਖੇਤੀ ਸਕੀਮਾਂ ਦਾ ਲਾਈਵ ਡੇਟਾਬੇਸ",
      "filterSchemes": "ਸਕੀਮਾਂ ਫਿਲਟਰ ਕਰੋ",
      "searchPlaceholder": "ਨਾਮ, ਵੇਰਵੇ ਜਾਂ ਯੋਗਤਾ ਦੇ ਆਧਾਰ 'ਤੇ ਸਕੀਮਾਂ ਖੋਜੋ...",
      "allTypes": "ਸਾਰੀਆਂ ਕਿਸਮਾਂ",
      "centralSchemes": "ਕੇਂਦਰੀ ਸਕੀਮਾਂ",
      "stateSchemes": "ਰਾਜ ਸਕੀਮਾਂ",
      "clearFilters": "ਫਿਲਟਰ ਸਾਫ਼ ਕਰੋ",
      "refreshData": "ਡੇਟਾ ਰਿਫ੍ਰੈਸ਼ ਕਰੋ",
      "viewDetails": "ਵੇਰਵੇ ਦੇਖੋ",
      "apply": "ਅਰਜ਼ੀ ਦਿਓ",
      "applyNow": "ਹੁਣੇ ਅਰਜ਼ੀ ਦਿਓ",
      
      // Common
      "loading": "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
      "error": "ਗਲਤੀ",
      "success": "ਸਫਲਤਾ",
      "close": "ਬੰਦ ਕਰੋ",
      "save": "ਸੇਵ ਕਰੋ",
      "cancel": "ਰੱਦ ਕਰੋ",
      "submit": "ਜਮ੍ਹਾਂ ਕਰੋ"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
