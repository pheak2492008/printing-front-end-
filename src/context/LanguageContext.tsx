import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type LangKey = "km" | "en" | "zh";

interface LanguageContextType {
  lang: LangKey;
  setLang: (lang: LangKey) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<LangKey>("km"); // Default to Khmer
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
