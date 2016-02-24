import { Pipe } from 'angular2/core';

@Pipe({
    name: 'camelCaseToText',
    pure: false
})

export class CamelCaseToTextPipe {
    transform(value: string) {
        var text:string = value.charAt(0).toUpperCase() + value.slice(1);
        return text.replace(/([a-z\d])([A-Z])/g, '$1' + ' ' + '$2');
    }
}
