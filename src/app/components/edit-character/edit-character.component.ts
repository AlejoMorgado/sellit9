import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-character',
  templateUrl: './edit-character.component.html',
  styleUrls: ['./edit-character.component.scss'],
})
export class EditCharacterComponent {
  characterForm: FormGroup;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCharacterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = !!data.character;
    this.characterForm = this.fb.group({
      characterId: [data.character?.characterId || '', Validators.required],
      name: [data.character?.name || '', Validators.required],
      gender: [data.character?.gender || '', Validators.required],
      image: [data.character?.image || '', Validators.required],
      species: [data.character?.species || '', Validators.required],
      status: [data.character?.status || '', Validators.required],
    });
  }

  generateRandomId(): string {
    return (Math.random() * 1e16).toString(36);
  }

  onSubmit(): void {
    if (!this.isEdit) {
      this.characterForm.value.characterId = this.generateRandomId();
    }
    const formValue = this.characterForm.value;
    if (this.characterForm.errors === null) {
      this.dialogRef.close(formValue);
    } else {
      Swal.fire('Error', 'Invalid form', 'error');
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
