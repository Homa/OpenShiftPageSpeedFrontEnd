import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
    name: 'sort2'
})
export class SortPipe2 implements PipeTransform {

    transform(array: any): Array<string> {

        if(array) {
            array.sort((a, b) => {

                if (parseFloat(a.value) < parseFloat(b.value)) {
                    return 1;
                    //.completed because we want to sort the list by completed property
                } else if (parseFloat(a.value) > parseFloat(b.value)) {
                    return -1;
                } else {
                    return 0;
                }
            });
            return array;
        }

    }
}
