export const names = {
  siteName: "BoxInvesting",
};
// https://www.khroma.co/train/
export const eventsName = [
  { value: 1, symbolSize: 5, label: "Новости", type: "news", color: "rgba(84,92,110, 0.5)" },
  { value: 2, symbolSize: 10, label: "Девиденды", type: "dividends", color: "rgba(63,128,160, 0.5)" },
  { value: 3, symbolSize: 10, label: "Отчётность", type: "reporting", color: "rgba(86,66,66)" },
  { value: 4, symbolSize: 10, label: "Поглощение", type: "absorption", color: "rgba(199,187,214, 0.5)" },
  { value: 5, symbolSize: 15, label: "Назначения", type: "appointments", color: "rgba(73,137,169, 0.5)" },
  { value: 6, symbolSize: 10, label: "Делистинг", type: "delisting", color: "rgba(186,168,224, 0.5)" },
  { value: 7, symbolSize: 15, label: "Листинг на бирже", type: "exchangeListing", color: "rgba(48,62,60, 0.5)" },
  { value: 8, symbolSize: 15, label: "Сплит акций", type: "split", color: "rgba(49,93,86, 0.5)" },
  { value: 9, symbolSize: 15, label: "Санкции", type: "sanctions", color: "rgba(91,93,68, 0.5)" },
];


export const controllTypeInstrument = [
  { value: "all", label: "Все инструменты", type: "all", color: "rgba(124, 0, 89, 0.5)" },
  { value: "shares", label: "Акции", type: "shares", color: "rgba(124, 0, 89, 0.5)" },
  { value: "coin", label: "Криптовалюты", type: "coin", color: "rgba(146, 126, 70, 0.5)" },
];

export const controllSharesLevel = [
  { value: 0, label: "Все типы акций", type: "0", color: "rgba(124, 0, 89, 0.5)" },
  { value: 1, label: "Голубые фишки", type: "1", color: "rgba(124, 0, 89, 0.5)" },
  { value: 2, label: "Второй эшелон", type: "2", color: "rgba(146, 126, 70, 0.5)" },
  { value: 3, label: "Третий эшелон", type: "3", color: "rgba(146, 126, 70, 0.5)" },
];
 


