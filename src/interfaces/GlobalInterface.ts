// const setType = type "apple" | "google" | "twitter" | "emojione" | "messenger" | "facebook" | undefined

export default interface ContextInterface {
  darkMode: boolean;
  startup: boolean;
  set: 'apple' | 'google' | 'twitter' | 'emojione' | 'messenger' | 'facebook' | undefined;
}
