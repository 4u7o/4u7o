import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone);

class DayjsWrapper {
  private defaultFormat: string;
  private dayjsInstance: typeof dayjs;

  constructor() {
    this.defaultFormat = "YYYY-MM-DD HH:mm:ss";
    this.dayjsInstance = dayjs;
    this.dayjsInstance.tz.setDefault("Asia/Ho_Chi_Minh");
  }

  now(): string {
    return this.dayjsInstance().format(this.defaultFormat);
  }

  getInstance(): typeof dayjs {
    return this.dayjsInstance;
  }
}
const dayjsWrapper = new DayjsWrapper();
export default dayjsWrapper;
