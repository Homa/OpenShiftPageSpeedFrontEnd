

import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
    name: 'placeDataInPlaceholders',
    pure: false
})

export class PlaceDataInPlaceholdersPipe implements PipeTransform {
    transform(urlBlocks: Array<string>, args: any[] = null): any {

        let result = [];

        for (let j = 0, max = urlBlocks.length; j < max; j++) {

            let obj = {
                summary: '',
                urls: []
            };

            if (urlBlocks[j].header) {

                obj.summary = urlBlocks[j].header.format;

                if (urlBlocks[j].header.args) {

                    let args = urlBlocks[j].header.args;

                    for (let i = 0, max = args.length; i < max; i++) {

                        let type: string = args[i].type;

                        if (type === 'HYPERLINK') {
                            obj.summary = obj.summary.replace('{{BEGIN_LINK}}', '<a href="' + args[i].value + '">');
                            obj.summary = obj.summary.replace('{{END_LINK}}', '</a>');
                        } else {
                            obj.summary = obj.summary.replace('{{' + args[i].key + '}}', args[i].value);
                        }
                    }
                }

                if (urlBlocks[j].urls) {

                    obj.urls = urlBlocks[j].urls;
                }

                result.push(obj);
            }

            return result;
        }
    }
}

