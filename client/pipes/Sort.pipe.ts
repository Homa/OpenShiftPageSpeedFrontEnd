import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {

    transform(array: any, args: any): Array<string> {

        array.sort((a, b) => {
            if (parseFloat(a.impact) < parseFloat(b.impact)) {
                return -1;
                //.completed because we want to sort the list by completed property
            } else if (parseFloat(a.impact) > parseFloat(b.impact)) {
                return 1;
            } else {
                return 0;
            }
        });

        return array;
    }
}
