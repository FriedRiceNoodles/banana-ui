// To be honest, the code below is copied from https://github.com/ant-design/ant-design/blob/master/components/statistic/utils.ts#L25C13-L25C13

const timeUnits = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
] as const;

type keyofTimeUnits = typeof timeUnits[number][0];

export function formatTimeStr(duration: number, format: string) {
  let leftDuration: number = duration;

  const timeDataObject: { text: string; formattedTextArray: string[]; data: Record<keyofTimeUnits, { existsInFormat: boolean; value: number }> } = {
    text: '',
    formattedTextArray: [],
    data: {
      Y: { existsInFormat: false, value: 0 },
      M: { existsInFormat: false, value: 0 },
      D: { existsInFormat: false, value: 0 },
      H: { existsInFormat: false, value: 0 },
      m: { existsInFormat: false, value: 0 },
      s: { existsInFormat: false, value: 0 },
      S: { existsInFormat: false, value: 0 },
    },
  };

  const escapeRegex = /\[[^\]]*]/g;
  const keepList: string[] = (format.match(escapeRegex) || []).map((str) => str.slice(1, -1));
  const templateText = format.replace(escapeRegex, '[]');

  const replacedText = timeUnits.reduce((current, [name, unit]) => {
    if (current.includes(name)) {
      const value = Math.floor(leftDuration / unit);
      timeDataObject.data[name].existsInFormat = true;
      timeDataObject.data[name].value = value;
      leftDuration -= value * unit;
      return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
        const len = match.length;
        const result = value.toString().padStart(len, '0');
        timeDataObject.formattedTextArray.push(result);
        return result;
      });
    }
    return current;
  }, templateText);

  let index = 0;
  const text = replacedText.replace(escapeRegex, () => {
    const match = keepList[index];
    index += 1;
    return match;
  });

  timeDataObject.text = text;
  return timeDataObject;
}
