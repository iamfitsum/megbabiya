import {create} from "zustand"
import {Subscription} from "@/types/Subscription"

export type LanguagesSupported = 
|"en"
|"es"
|"de"
|"fr"
|"am"
|"ar"
|"ja"
|"zh"
|"la"
|"ru";

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
    en: "English",
    es: "Spanish",
    de: "German",
    fr: "French",
    am: "Amharic",
    ar: "Arabic",
    ja: "Japanese",
    zh: "Mandarin",
    la: "Latin",
    ru: "Russian",
}

interface SubscriptionState {
    subscription: Subscription | null | undefined;
    setSubscription: (subscription: Subscription | null) => void;
    // language: LanguagesSupported;
    // setLanguage: (language: LanguagesSupported) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
    subscription: undefined,
    setSubscription: (subscription: Subscription | null) => set({subscription}),
    // language: "en",
    // setLanguage: (language: LanguagesSupported) => set({language}),
}))