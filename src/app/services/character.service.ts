import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'https://ql8qy3wivl.execute-api.us-east-2.amazonaws.com/dev';
  private charactersUpdated = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getDynamoCharacters`).pipe(
      map((response) => {
        const parsedResponse = JSON.parse(response.body);
        return parsedResponse;
      })
    );
  }

  updateCharacter(character: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`, character).pipe(
      map((response) => {
        this.charactersUpdated.next();
        return response;
      })
    );
  }

  deleteCharacter(characterId: string): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/delete`, { body: { characterId } })
      .pipe(
        map((response) => {
          this.charactersUpdated.next();
          return response;
        })
      );
  }

  createCharacter(character: any): Observable<any> {
    if (!character.image) {
      if (character.gender === 'Male' || character.gender === 'male') {
        character.image =
          'https://i.kym-cdn.com/photos/images/original/001/701/558/e6f.jpg';
      } else if (
        character.gender === 'Female' ||
        character.gender === 'female'
      ) {
        character.image =
          'https://i.pinimg.com/1200x/eb/d6/f8/ebd6f8c6ec541f56ec42e384c980847d.jpg';
      } else {
        character.image =
          'https://i.pinimg.com/474x/40/30/64/403064cf3ae0f1f56a380e41858200a4.jpg';
      }
    }

    return this.http.post<any>(`${this.apiUrl}/register`, character).pipe(
      map((response) => {
        this.charactersUpdated.next();
        return response;
      })
    );
  }

  getCharactersUpdatedListener(): Observable<void> {
    return this.charactersUpdated.asObservable();
  }
}
