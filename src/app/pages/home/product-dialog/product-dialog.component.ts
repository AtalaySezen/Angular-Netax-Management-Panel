import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../../../shared/services/data.service';
import { PutAddProduct } from '../../../shared/models/general.model';

@Component({
  selector: 'app-product-dialog',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss'
})
export class ProductDialogComponent {
  dataService = inject(DataService);
  productForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'edit' | 'new', product?: PutAddProduct }
  ) { }

  ngOnInit(): void {
    this.isEditMode = this.data.mode === 'edit';
    this.productForm = this.fb.group({
      title: [this.isEditMode ? this.data.product.title : '', Validators.required],
      price: [this.isEditMode ? this.data.product.price : '', [Validators.required, Validators.min(0)]]
    });
  }

  submitData(data: PutAddProduct): void {
    const request$ = this.isEditMode
      ? this.dataService.PutProductData(this.data.product.id, data)
      : this.dataService.AddNewProduct(data);

    request$.subscribe({
      next: (response) => this.dialogRef.close({ event: 'success', data: response }),
      error: (err) => console.error(err),
    });
  }

  save(): void {
    if (this.productForm.valid) {
      const data: PutAddProduct = this.productForm.value;
      this.submitData(data);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
