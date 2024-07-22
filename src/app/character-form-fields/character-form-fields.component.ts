import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-character-form-fields',
  templateUrl: './character-form-fields.component.html',
  styleUrls: ['./character-form-fields.component.scss'],
})
export class CharacterFormFieldsComponent {
  @Input() form: FormGroup = new FormGroup({});

  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }
}
