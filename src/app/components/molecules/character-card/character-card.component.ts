// character-card.component.ts
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditCharacterComponent } from '../../edit-character/edit-character.component';
import { CharacterService } from '../../../services/character.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent {
  @Input() character: any;

  constructor(
    private dialog: MatDialog,
    private characterService: CharacterService
  ) {}

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditCharacterComponent, {
      width: '250px',
      data: { character: this.character },
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          Swal.fire({
            title: 'Updating Character',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          this.characterService.updateCharacter(result).subscribe({
            next: (response) => {
              this.character = { ...this.character, ...result };
              Swal.fire(
                'Success',
                'Character updated successfully!',
                'success'
              );
            },
            error: (error) => {
              console.error('Error updating character', error);
              Swal.fire(
                'Error',
                'There was an error updating the character',
                'error'
              );
            },
          });
        }
      },
      error: (error) => {
        console.error('Error closing dialog', error);
      },
    });
  }

  deleteCharacter() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this character?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleting Character',
          text: 'Please wait...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const characterId = this.character.characterId;
        this.characterService.deleteCharacter(characterId).subscribe({
          next: (response) => {
            Swal.fire('Deleted!', 'The character has been deleted.', 'success');
          },
          error: (error) => {
            console.error('Error deleting character:', error);
            Swal.fire(
              'Error',
              'There was an error deleting the character',
              'error'
            );
          },
        });
      }
    });
  }
}
