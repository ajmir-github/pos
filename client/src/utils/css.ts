export function classes(...cls: any[]) {
  const strCls = cls.filter((data) => typeof data === "string");
  return strCls.join(" ");
}

export function conditionalClasses<Condition extends string | number>(
  condition: Condition,
  objectClasses: Partial<Record<Condition, string>>,
  defaultClass: string = ""
) {
  return objectClasses[condition] || defaultClass;
}
