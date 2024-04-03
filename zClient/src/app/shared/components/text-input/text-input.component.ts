import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements ControlValueAccessor { //ControlValueAccessor is used to create a custom form control directive that integrates with angular forms
  @Input() type = 'text'
  @Input() label = ''

  constructor (@Self() public controlDir: NgControl){ //NgControl is a base class for FormControl - binds a form control object to a dom element
                //198-  self makes sure that we dont reuse an input that has already once been passed in this injection, we want this to be unique for every input we are creating - self guarantees that we use local injection
                this.controlDir.valueAccessor = this; // this binds the value to whatever input we are currently in
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  //we dont need to implement them, if we leave them like that they will do their original, unoverrided functionality

  get control(): FormControl {
    return this.controlDir.control as FormControl // we are going to use this inside our template instead of controlDir. We would get errors otherwise. because we are Using formcontrols we cant use NgControl because we are using strict typing .
  }

}
