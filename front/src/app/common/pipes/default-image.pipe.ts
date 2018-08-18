import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
    name: 'defaultImage'
})
export class DefaultImagePipe implements PipeTransform {

    transform(value: string): string {
        if (!value) {
            return `${environment.apiUrls.images.base}/${environment.apiUrls.images.empty}`;
        }
        return value;
    }
}
