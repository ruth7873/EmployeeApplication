import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "managementIcon"
})
export class PipeIconManagement implements PipeTransform {
    transform(value: boolean): string {
        console.log(value);
        
        if (value == true)
            return "manage_accounts"
        else return "person"
    }
}