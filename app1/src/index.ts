import { StorageService } from "common/storage";
import { UtilityService } from "common/utility";

setInterval(() => {
  const currentCount = StorageService.getItem("count") ?? 0;
  const a: MessageDTO = { text: `welcome to app1: ${currentCount}` };
  UtilityService.Log(a);
  StorageService.setItem("count", +currentCount + 1);
}, 2000);
