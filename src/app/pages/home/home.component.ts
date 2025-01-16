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
import { AuthService } from '../../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  imports: [MatTableModule, MatSortModule, CommonModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule, MatToolbarModule, MatPaginatorModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort;
  dataService = inject(DataService);
  authService = inject(AuthService);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

  dataSource = new MatTableDataSource<Product>();
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
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

  deleteProduct(id: number) {
    console.log(id);
  }

  addNewProduct() {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '600px',
      height: 'auto',
      data: {
        mode: 'new'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result && result.event == 'success') {
        this.openSnackBar('Başarılı', 'Ok');
        this.getProductData(0, this.pageSize);
      }
    });
  }

  editProduct(title: string, price: number, id: number,) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '600px',
      height: 'auto',
      data: {
        mode: 'edit',
        product: { title: title, price: price, id: id }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result && result.event == 'success') {
        this.openSnackBar('Başarılı', 'Ok');
        this.getProductData(0, this.pageSize);
      }
    });
  }

}
