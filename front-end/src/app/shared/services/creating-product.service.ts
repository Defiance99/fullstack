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
        for (let bonus of form.bonuses) {
            fd.append('bonuses', bonus);
        }
        for (let category of form.category) {
            fd.append('category', category);
        }
        for (let chartDay of form.chartDays) {
            fd.append('chartDays', chartDay);
        }
        for (let field of form.customFields) {
            console.log(form)
            console.log(field)
            fd.append('customFields', field)
        }
        fd.append('cost', String(form.cost))
        fd.append('name', form.name)
        fd.append('weight', String(form.weight))
        fd.append('currency', form.currency)
        fd.append('weightUnit', form.weightUnit)
        fd.append('description', form.description);

        return this.http.post('/api/product/upload', fd);
    }

}