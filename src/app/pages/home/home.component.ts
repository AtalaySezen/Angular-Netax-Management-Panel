import { Component, inject, ViewChild } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product, ProductResponse } from '../../shared/models/general.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MatTableModule, MatSortModule, CommonModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule, MatToolbarModule, MatPaginatorModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  dataService = inject(DataService);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['title', 'price', 'actions'];
  pageSize: number = 12;
  totalItemCount: number = 0;

  ngOnInit() {
    this.getProductData(0, this.pageSize);
  }

  getProductData(skip: number, limit: number): void {
    this.dataService.GetProductData({ skip, limit }).subscribe({
      next: (data: ProductResponse) => {
        this.dataSource.data = data.products;
        this.totalItemCount = data.total;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onPageChange(event: any): void {
    const skip = event.pageIndex * event.pageSize;
    const limit = event.pageSize;
    this.getProductData(skip, limit);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
