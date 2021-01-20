import { IFilter } from "../interfaces/Filter";

export default class StartFromDateFilter implements IFilter {
  private startDate: Date;
  private createdAt: Date;

  constructor(startDate: Date, createdAt: Date) {
    this.startDate = startDate;
    this.createdAt = createdAt;
  }

  public filter(): boolean {
    return this.createdAt.getTime() >= this.startDate.getTime();
  }
}