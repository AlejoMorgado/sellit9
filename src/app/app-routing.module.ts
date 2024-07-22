import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './components/organisms/character-list/character-list.component';

export const routes: Routes = [
  { path: 'characters', component: CharacterListComponent },
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
  { path: '**', redirectTo: '/characters' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
