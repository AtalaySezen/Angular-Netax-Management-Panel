import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../../../shared/services/data.service';

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
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'edit' | 'new', product?: any }
  ) { }

  ngOnInit(): void {
    this.isEditMode = this.data.mode === 'edit';
    this.productForm = this.fb.group({
      title: [this.isEditMode ? this.data.product.title : '', Validators.required],
      price: [this.isEditMode ? this.data.product.price : '', [Validators.required, Validators.min(0)]]
    });
  }

  save(): void {
    if (this.productForm.valid) {
      let data = {
        title: this.productForm.get('title').value,
        price: this.productForm.get('price').value
      }

      if (this.isEditMode) {
        this.dataService.PutProductData(this.data.product.id, data).subscribe({
          next: (data) => {
            this.dialogRef.close(this.productForm.value);
          },
          error: (err) => {
            console.error(err);
          }
        })

      } else {
        this.dataService.AddNewProduct(data).subscribe({
          next: (data) => {
            console.log(data);
            this.dialogRef.close(this.productForm.value);
          },
          error: (err) => {
            console.error(err);
          }
        })
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }


}
