import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharacterService } from '../../../services/character.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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

  loadCharacters(): void {
    this.characterService.getCharacters().subscribe((data) => {
      this.characters = data;
    });
  }

  editCharacter(character: any): void {
    this.router.navigate(['/edit-character', character.id]);
  }
}
