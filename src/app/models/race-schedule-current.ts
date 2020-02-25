import { ParseDateStringBasic } from "../services/util/date-helper";

export class RaceScheduleCurrent {
  location: string;
  country: string;
  summary: string;
  uid: string;
  dtstart: string;
  dtend: any[];
  dtstamp: string;
  eventDate: Date;
  categories: string;
  geo: string[];
  sequence: string;
  status: string;
}
