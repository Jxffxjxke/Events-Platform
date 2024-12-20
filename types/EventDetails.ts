export type EventDetails = {
  image: string;
  title: string;
  location: string;
  description: string;
  date: Date | string;
  openingTime: Date;
  closingTime: Date;
  creator_id?: string;
};
