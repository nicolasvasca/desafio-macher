import { formatInTimeZone, toDate, format } from "date-fns-tz";
import { parse, parseISO } from "date-fns";
export class DateValidator {
  private static getFnsTmz(date: any): string {
    return formatInTimeZone(
      date,
      "America/Sao_Paulo",
      "yyyy-MM-dd HH:mm:ss.SSS"
    );
  }

  public static strToDateTime(date?: string): Date {
    if (!date || date === "") {
      date = this.getFnsTmz(new Date());
    }
    return toDate(this.getFnsTmz(date));
  }

  public static timestampNumber(date: Date): string {
    return format(parseISO(this.getFnsTmz(date)), "yyyyMMddHHmmssSSS");
  }

  public static dateToStrBR(date: Date): string {
    return format(date, "dd/MM/yyyy");
  }

  public static dateTimeToStr(date: Date): string {
    return this.getFnsTmz(date).toString();
  }
  public static dateTimeToStrBr(date: Date): string {
    return format(date, "dd/MM/yyyy HH:mm:ss");
  }

  public static getDateTimeStrCurrency(): string {
    return format(new Date(), "yyyy-mm-dd HH:mm:ss.SSS");
  }

  public static isDateExpired(expiresDateTime: string): boolean {
    return new Date() > new Date(expiresDateTime);
  }

  public static getAmericaSPTimeZoneDate(): Date {
    const options = {
      timeZone: "America/Sao_Paulo",
    };

    const dateFormatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = dateFormatter.format(new Date());
    return new Date(formattedDate);
  }

  public static toAmericaSPTimeZoneDate(date: Date): Date {
    const currentDate = new Date(date).toLocaleString("en-US", {
      timeZone: "America/Sao_Paulo",
    });
    return new Date(currentDate);
  }

  public static strBrToDate(date?: string): string {
    const parsedDate = parse(date, "dd/MM/yyyy", new Date());
    const formattedDate = format(parsedDate, "yyyy-MM-dd");

    return formattedDate;
  }
  public static dateTimeToHourStr(date: Date): string {
    const dateInTimeZone = toDate(this.getFnsTmz(date));
    return format(dateInTimeZone, "HH:mm:ss");
  }
}
