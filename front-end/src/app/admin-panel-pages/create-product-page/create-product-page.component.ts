import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { CreateProductService } from 'src/app/shared/services/creating-product.service';
import SwiperCore from "swiper/core";

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
  swiper!: SwiperCore;

  constructor(private productService: CreateProductService) { }

  ngAfterViewChecked() {
    this.swiper.updateSlidesClasses();
    this.swiper.updateProgress();
    this.swiper.updateSlides();
  }

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
      description: new FormControl(""),
      customFields: new FormArray([
        new FormGroup({
          nameCustomField: new FormControl(''),
          valueCustomField: new FormControl('')
        }),
      ])
    });
  }

  onSwiper(swiper: SwiperCore) {
    this.swiper = swiper;
  }

  onSlideChange() {

  }

  get formData() {
    return <FormArray>this.productForm.get('customFields');
  }

  onSubmit() {
    this.productForm.disable();
    this.productService.create(this.productForm.value, this.images).subscribe(
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
        nameCustomField: new FormControl(''),
        valueCustomField: new FormControl('')
      }));
    }
  }

  removeCustomField() {
    this.formData.controls.pop();
  }
}
