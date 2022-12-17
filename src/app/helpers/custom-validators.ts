import { AbstractControl } from '@angular/forms';
export class CustomValidators {
  static matchPassword(abstractControl: AbstractControl) {
    let password = abstractControl.get('password')?.value;
    let confirmPassword = abstractControl.get('confirmPassword')?.value;
     if (password != confirmPassword) {
        return abstractControl.get('confirmPassword')?.setErrors({
           matchPassword: true
         })
    } else {
      return null
    }
  }

  static isValidURL(abstractControl: AbstractControl) {
    let image = abstractControl.get('image')?.value;
     if (!image.startsWith('http://') || !image.startsWith('https://')) {
        return abstractControl.get('image')?.setErrors({
           invalidURL: true
         })
    } else {
      return null
    }
  }
  
}