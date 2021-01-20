import { IFilter } from '../interfaces/Filter';

export default class EndToDateFilter implements IFilter {
  private endDate: Date;
  private createdAt: Date;

  constructor(endDate: Date, createdAt: Date) {
    this.endDate = endDate;
    this.createdAt = createdAt;
  }

  public filter(): boolean {
    return this.createdAt.getTime() <= this.endDate.getTime();
  }
}