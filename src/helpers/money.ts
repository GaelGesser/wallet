export const CENTS_PER_BRL = 100;

export const centsToBrl = (cents: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / CENTS_PER_BRL);

export const brlToCents = (brl: number) => brl * CENTS_PER_BRL;
