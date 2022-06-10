import { eventMitt } from "my-lib/utils";
import { mitts } from "my-lib/utils/hooks";

export function reload(){
    eventMitt.emit(mitts.reload)
}