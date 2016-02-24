import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
    name: 'objToArrayPipe',
    pure: false
})

export class ObjToArrayPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {

        let result = [];
        _.forIn(value, function(value1, key1) {

            let obj = {
                name: key1,
                number: value1,
                color: '',
                diff: ''
            };

            let bytesToSize = function(bytes) {
                let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                if (bytes == 0) return '0 Byte';
                let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                return Math.round(bytes / Math.pow(1024, i), 2) + sizes[i];
            };

            if (typeof value1 === 'string') {

                obj.number = bytesToSize(parseInt(value1));
            }

            _.forIn(args[0], function(value2, key2) {
                if (key1 === key2) {

                    if (value1 > value2) {
                        obj.color = 'red';
                        obj.diff = '+' + (parseInt(value1) - parseInt(value2));
                    } else if (value1 < value2) {
                        obj.color = 'green';
                        obj.diff = parseInt(value1) - parseInt(value2);
                    }

                    if (typeof value1 === 'string') {
                        obj.number = bytesToSize(value1);
                        obj.diff = obj.diff + 'Bytes'
                    }
                }
            });

            if (obj.diff) {
                result.push(obj);
            }
        });
        return result;
    }
}
