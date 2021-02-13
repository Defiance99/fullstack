import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Product } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class CreateProductService {

    constructor(private http: HttpClient) {

    }

    create(form: Product, images?: File[]) {
        const fd = new FormData();
        console.log(form)

        if (images) {
            for (let image of images) {
                fd.append('images', image, image.name);
            }
        }
        fd.append('cost', String(form.cost))
        fd.append('name', form.name)
        fd.append('weight', String(form.weight))
        fd.append('currency', form.currency)
        fd.append('weightUnit', form.weightUnit)
        fd.append('description', form.description);
        fd.append('bonuses', JSON.stringify(form.bonuses));
        fd.append('category', JSON.stringify(form.category));
        fd.append('chartDays', JSON.stringify(form.chartDays));
        fd.append('customFields', JSON.stringify(form.customFields));


        console.log(fd.get('images'));

        return this.http.post('/api/product/uploadMultipleFiles', fd);
    }

}