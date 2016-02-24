import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
    name: 'placeDataInPlaceholders2',
    pure: false
})

export class PlaceDataInPlaceholders2Pipe implements PipeTransform {
    transform(format: string, args: Array<string> = null): any {

        let result = '';

        let obj = {
            summary: ''
        };

        result = format;
        let argument = args[0];
        for (let i = 0, max = argument.length; i < max; i++) {

            let type = argument[i].type;

            if (type === 'HYPERLINK') {
                result = result.replace('{{BEGIN_LINK}}', '<a href="' + argument[i].value + '">');
                result = result.replace('{{END_LINK}}', '</a>');
            } else {
                result = result.replace('{{' + argument[i].key + '}}', argument[i].value);
            }
        }

        return result;

    }
}

