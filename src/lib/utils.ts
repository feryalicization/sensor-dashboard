export const cn = (...cls: (string | undefined | false | null)[]) => cls.filter(Boolean).join(" ");
export const fmtNumber = (v?: string | number) =>
v === undefined || v === null ? "—" : new Intl.NumberFormat().format(Number(v));