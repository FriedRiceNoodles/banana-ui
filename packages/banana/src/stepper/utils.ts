export const isInteger = (value: string) => {
  return /^[0-9]+$/.test(value);
};

export class MathUtils {
  static add(a: number, b: number) {
    if (isInteger(a.toString()) && isInteger(b.toString())) {
      return a + b;
    }

    try {
      const aTransformIntMultiple = String(a).split('.')?.[1]?.length ?? 0;
      const bTransformIntMultiple = String(b).split('.')?.[1]?.length ?? 0;

      const maxMultiple = Math.pow(10, Math.max(aTransformIntMultiple, bTransformIntMultiple));

      return (a * maxMultiple + b * maxMultiple) / maxMultiple;
    } catch (error) {
      return a + b;
    }
  }

  static minus(a: number, b: number) {
    if (isInteger(a.toString()) && isInteger(b.toString())) {
      return a - b;
    }
    try {
      const aTransformIntMultiple = String(a).split('.')?.[1]?.length ?? 0;
      const bTransformIntMultiple = String(b).split('.')?.[1]?.length ?? 0;

      const maxMultiple = Math.pow(10, Math.max(aTransformIntMultiple, bTransformIntMultiple));

      const resPrecision =
        aTransformIntMultiple >= bTransformIntMultiple ? aTransformIntMultiple : bTransformIntMultiple;

      return Number(((a * maxMultiple - b * maxMultiple) / maxMultiple).toFixed(resPrecision));
    } catch (error) {
      return a - b;
    }
  }
}
