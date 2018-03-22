export function ParseDateStringBasic(dateStr: string): Date {
  const formattedDateString =
    `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 9)}` +
    `${dateStr.substring(9, 11)}:${dateStr.substring(11, 13)}:${dateStr.substring(13, dateStr.length)}`;
  return new Date(formattedDateString);

}
