import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
    name: 'dateFilter',
    pure: false
})

export class DateFilter implements PipeTransform {

    transform(value: any, args: any[] = null): any {
        let date = new Date(value).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        return date;
    }
}
