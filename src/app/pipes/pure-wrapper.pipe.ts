import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'pure',
    pure: true,
    standalone: true
})
// we can use this pipe to wrap a pure function to ignore re-calculations
export class PureWrapperPipe implements PipeTransform {
    transform(callback: Function, ...args: any[]): string | null {
        if (!callback) {
            return null;
        }
        const result: string = callback(...args);
        return result;
    }
}
