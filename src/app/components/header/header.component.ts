import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditCharacterComponent } from '../edit-character/edit-character.component';
import { CharacterService } from '../../services/character.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private dialog: MatDialog,
    private characterService: CharacterService
  ) {}

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(EditCharacterComponent, {
      width: '250px',
      data: { character: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        Swal.fire({
          title: 'Creating Character',
          text: 'Please wait...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        this.characterService.createCharacter(result).subscribe({
          next: (response) => {
            Swal.fire('Success', 'Character created successfully!', 'success');
          },
          error: (error) => {
            console.error('Error creating character', error);
            Swal.fire('Error', 'Error creating character', 'error');
          },
        });
      }
    });
  }
}
