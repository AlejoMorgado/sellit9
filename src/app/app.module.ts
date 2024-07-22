import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterListComponent } from './components/organisms/character-list/character-list.component';
import { CharacterCardComponent } from './components/molecules/character-card/character-card.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { EditCharacterComponent } from './components/edit-character/edit-character.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { InputFieldComponent } from './components/atoms/input-field/input-field.component';
import { CharacterFormFieldsComponent } from './character-form-fields/character-form-fields.component';
@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    CharacterCardComponent,
    ButtonComponent,
    EditCharacterComponent,
    HeaderComponent,
    InputFieldComponent,
    CharacterFormFieldsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
