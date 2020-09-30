import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnfantComponent } from './add-enfant.component';

describe('AddEnfantComponent', () => {
  let component: AddEnfantComponent;
  let fixture: ComponentFixture<AddEnfantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEnfantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
