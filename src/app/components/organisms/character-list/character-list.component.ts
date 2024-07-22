import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharacterService } from '../../../services/character.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit, OnDestroy {
  characters: any[] = [];
  charactersUpdatedSub: Subscription;

  constructor(
    private characterService: CharacterService,
    private router: Router
  ) {
    this.charactersUpdatedSub = new Subscription();
  }

  ngOnInit(): void {
    this.showLoading();
    this.loadCharacters();

    this.charactersUpdatedSub = this.characterService
      .getCharactersUpdatedListener()
      .subscribe(() => {
        this.loadCharacters();
      });
  }

  ngOnDestroy(): void {
    if (this.charactersUpdatedSub) {
      this.charactersUpdatedSub.unsubscribe();
    }
  }

  showLoading(): void {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor, espere',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  loadCharacters(): void {
    this.characterService.getCharacters().subscribe((data) => {
      this.characters = data;
      Swal.close(); // Cierra el loading spinner cuando se han cargado los datos
    });
  }

  editCharacter(character: any): void {
    this.router.navigate(['/edit-character', character.id]);
  }
}
