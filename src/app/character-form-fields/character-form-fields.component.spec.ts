import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFormFieldsComponent } from './character-form-fields.component';

describe('CharacterFormFieldsComponent', () => {
  let component: CharacterFormFieldsComponent;
  let fixture: ComponentFixture<CharacterFormFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterFormFieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
