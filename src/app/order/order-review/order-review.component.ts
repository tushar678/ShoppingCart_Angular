import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent implements OnInit {
  userId = 1; // passed hard-coded to be retrieved from local storage
  TotalPrice: any;
  productList: any = [];
  taxData: any = [];
  checkoutId: any;

  constructor(
    private userService: UserService,
    private orderService: OrdersService
    ) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

    shippingDetails = new FormGroup({
    CheckoutId: new FormControl(),  
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    Address: new FormControl('', Validators.required),
    City: new FormControl('', Validators.required),
    State: new FormControl('', Validators.required),
    Country: new FormControl('', Validators.required),
    ZipCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    Phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    AddressType: new FormControl('', Validators.required),
  })
  
  getCartDetails(){
    this.userService.GetItemToCart(this.userId).subscribe((data: any)=> {
      debugger
      this.TotalPrice=0;
      this.productList = data;
      for(var i=0;i<this.productList.length;i++){
        if(this.TotalPrice!=null && this.TotalPrice!=0 &&   this.TotalPrice!=undefined){
                this.TotalPrice = this.TotalPrice+this.productList[i].cartTotal;
              }else{
                this.TotalPrice = this.productList[i].cartTotal;;
              }
      }
      console.log('Cart Details', this.productList, 'Total Price', this.TotalPrice);
      this.calculateTax();
    })
  }

  calculateTax(){
    this.orderService.createCheckout(this.TotalPrice).subscribe((data: any)=> {
      this.taxData = data;
      this.checkoutId = this.taxData.checkoutId;
      console.log('Tax Calculated Data', this.taxData);
    })
  }

  makePayment(){
    console.log('Payment Amount', this.taxData.finalPay);
    console.log('Shipping Details', this.shippingDetails.value);
    this.addShippingDetails();
  }

  addShippingDetails(){
    this.shippingDetails.controls['CheckoutId'].setValue(this.checkoutId);
    this.orderService.addShippingDetails(this.shippingDetails.value).subscribe((data: any)=> {
      console.log('Shipping Details Added', data);
      this.shippingDetails.reset();
    })
  }
}
