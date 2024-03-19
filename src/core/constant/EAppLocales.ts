export enum Lang {
  Ar,
  En,
  Fr,
}

export const getLangName = (lang: Lang) => {
  switch (lang) {
    case Lang.Ar:
      return "arabic";
    case Lang.En:
      return "english";
    case Lang.Fr:
      return "français";
    default:
      return "unknown language";
  }
};
