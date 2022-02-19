import { Moment } from 'moment';

export interface DateRange {
  start: Moment | null;
  end: Moment | null;
}
