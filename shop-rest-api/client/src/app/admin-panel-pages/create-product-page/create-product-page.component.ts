import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
declare const showModalMessage: any;

@Component({
  selector: 'app-create-product-page',
  templateUrl: './create-product-page.component.html',
  styleUrls: ['./create-product-page.component.scss']
})
export class CreateProductPageComponent implements OnInit, AfterViewChecked {

  @ViewChild('inputFile') inputRef!: ElementRef;
  imagesPreview: any = [];
  images: File[] | undefined;
  productForm!: FormGroup;
  nameProduct: string = '';
  isHit: boolean = false;
  isDiscount: boolean = false;
  isNew: boolean = false;

  constructor(private productService: ProductService) { }

  ngAfterViewChecked() {
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(55)]),
      price: new FormControl("", [Validators.required, Validators.min(1), Validators.pattern('^([1-9][0-9]*)+(.[0-9]{1,2})?$')]),
      weight: new FormControl("", [Validators.required, Validators.min(1), Validators.pattern('[0-9]+')]),
      bonuses: new FormControl([]),
      currency: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),
      chartDays: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.maxLength(100)]),
      customFields: new FormArray([
        new FormGroup({
          nameCustomField: new FormControl(""),
          valueCustomField: new FormControl("")
        }),
      ])
    });
  }

  get formData() {
    return <FormArray>this.productForm.get('customFields');
  }

  onSubmit() {
    this.productForm.disable();
    this.productService.create(this.productForm.value, this.images).subscribe(
      () => {
        this.productForm.enable();
        showModalMessage('Успешно создано');
      },
      err => {
        this.productForm.enable();
        showModalMessage(err.message);
      }
    );
  }

  showMessage(message: string) {
    showModalMessage(message);
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
    this.imagesPreview = [];

    for (let file of files) {
      const reader = new FileReader();
      reader.onload = () => { // сначало определяем отдельное событие для каждого чтения
        this.imagesPreview.push(reader.result);
      }
      reader.readAsDataURL(file); // затем метод чтения
    }
  }

  addCustomField() {
    if (this.formData.controls.length < 5) {
      (<FormArray>this.productForm.controls['customFields']).push(new FormGroup({
        nameCustomField: new FormControl(""),
        valueCustomField: new FormControl("")
      }));
    }
  }

  removeCustomField() {
    this.formData.controls.pop();
  }
}