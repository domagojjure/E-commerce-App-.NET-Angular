import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errors: string[] | null = null

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router){ //ovdjeeee

  }

  complexPassword="(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$"

  registerForm=this.fb.group({
    displayName: ['', Validators.required ],
    email: ['', [Validators.required, Validators.email], [this.validateEmailNotTaken()]], //second array is for async validators 
    password: ['', [Validators.required,Validators.pattern(this.complexPassword)]]
  })

  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe({
      next: ()=> this.router.navigateByUrl('/shop'),
      error: error => this.errors= error.errors
    })
  }

  validateEmailNotTaken(): AsyncValidatorFn { // AbstractControl is a base class for formControl
    return (control: AbstractControl) =>{
      return control.valueChanges.pipe( // valuechanges gets called every time there is a value change
        debounceTime(1000), // gives 1 second of time before proceeding
        take(1) , // takes only the last value
        switchMap (//switchmap returns an observable from the function inside
          ()=>{
            return this.accountService.checkEmailExists(control.value).pipe (//pipe is used to transform values
            map(result=> result ? {emailExists:true}:null),
            finalize (()=> control.markAllAsTouched())

      ) 
            
          }
        )   

      )
       
    }

  }

}
