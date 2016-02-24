import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
    name: 'objToArrSummary',
    pure: false
})

export class ObjToArrSummaryPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {

        let result = [];

            let obj = {
                summary: '',
                name: '',
                urlBlockHeader: []
            };

            if (value.summary) {
                obj.name = value.localizedRuleName;
                obj.summary = value.summary['format'];

                if (value.summary.args) {

                    let args = value.summary.args;

                    for (let i = 0, max = args.length; i < max; i++) {

                        let type = args[i].type;

                        if (type === 'HYPERLINK') {
                            obj.summary = obj.summary.replace('{{BEGIN_LINK}}', '<a href="' + args[i].value + '">');
                            obj.summary = obj.summary.replace('{{END_LINK}}', '</a>');
                        } else {
                            obj.summary = obj.summary.replace('{{' + args[i].key + '}}', args[i].value);
                        }
                    }
                }

            }

            if (value.urlBlocks) {
                obj.urlBlockHeader = value.urlBlocks;
            }

            result.push(obj);
        return result;
    }
}
