import ptBR, { format } from 'date-fns';

export function getFormattedDate(date: string): string {
  const formatedDate = format(new Date(date), `dd MMM yyyy`, {
    locale: ptBR,
  });

  return formatedDate;
}
