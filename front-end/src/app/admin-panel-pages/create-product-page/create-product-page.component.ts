import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { CreateProductService } from 'src/app/shared/services/creating-product.service';

@Component({
  selector: 'app-create-product-page',
  templateUrl: './create-product-page.component.html',
  styleUrls: ['./create-product-page.component.scss']
})
export class CreateProductPageComponent implements OnInit {

  @ViewChild('inputFile') inputRef!: ElementRef;
  imagePreview: string | null | undefined | ArrayBuffer;
  images: File[] | undefined;
  productForm!: FormGroup;
  nameProduct: string = '';
  isHit: boolean = false;
  isDiscount: boolean = false;
  isNew: boolean = false;

  constructor(private productService: CreateProductService) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl(""),
      cost: new FormControl(""),
      weight: new FormControl(""),
      bonuses: new FormControl(""),
      currency: new FormControl(""),
      weightUnit: new FormControl(""),
      category: new FormControl(""),
      chartDays: new FormControl(""),
    });
  }

  onSubmit() {
    this.productForm.disable();
    /* this.productService.create(this.productForm.value).subscribe(
      () => console.log('Yep')
    ) */
    this.productService.createTest(this.productForm.value, this.images).subscribe(
      () => {
        this.productForm.enable();
        console.log('yep')
      },
      err => {
        console.log(err);
        this.productForm.enable();
      }
    );
  }

  showBonus(bonus: string) {
    if (bonus == 'hit') this.isHit = !this.isHit;
    if (bonus == 'discount') this.isDiscount = !this.isDiscount;
    if (bonus == 'new') this.isNew = !this.isNew;
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    const files = event.target.files;
    this.images = files;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(files[0]);
  }
}
