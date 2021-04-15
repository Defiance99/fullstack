import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Product } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private products$!: Observable<Product[]>;

    constructor(private http: HttpClient) {

    }

    create(form: Product, images?: File[]) {
        const fd = new FormData();

        if (images) {
            for (let image of images) {
                fd.append('images', image, image.name);
            }
        }
        fd.append('price', form.price);
        fd.append('name', form.name);
        fd.append('weight', String(form.weight));
        fd.append('currency', form.currency);
        fd.append('description', form.description);
        fd.append('bonuses', JSON.stringify(form.bonuses));
        fd.append('category', JSON.stringify(form.category));
        fd.append('chartDays', JSON.stringify(form.chartDays));
        fd.append('customFields', JSON.stringify(form.customFields));
        
        return this.http.post('/api/product/uploadMultipleFiles', fd);
    }

    getByFilters(category: string = '%', day: string = '%'): Observable<Product[]> {
        return this.http.get<Product[]>(`/api/product/getByFilters?category=${category}&day=${day}`);
    }

    getById(id: string): Observable<Product> {
        return this.http.get<Product>(`/api/product/getById/${id}`);
    }

    getProducts(limit: number = 8): Observable<Product[]> {
        return this.http.get<Product[]>(`/api/product/getProducts?limit=${limit}`);
    }

    getAll() {
        /* return this.http.get<Product[]>('/api/product/getAll'); */
        this.setPositions(this.http.get<Product[]>('/api/product/getAll'));
    }

    setPositions(products: Observable<Product[]>) {
        this.products$ = products;
    }

    getPositions(): Observable<Product[]> {
        return this.products$;
    }

}