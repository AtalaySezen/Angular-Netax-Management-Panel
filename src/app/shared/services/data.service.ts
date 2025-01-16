import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductResponse, QueryPageSize } from '../models/general.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  http = inject(HttpClient);

  GetProductData(parameters: QueryPageSize = { skip: 1, limit: 12 }) {
    return this.http.get<ProductResponse>(environment.apiUrl + `products/?limit=${parameters.limit}&skip=${parameters.skip}&select=title,price`);
  }

}
