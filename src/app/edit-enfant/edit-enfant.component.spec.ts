import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEnfantComponent } from './edit-enfant.component';

describe('EditEnfantComponent', () => {
  let component: EditEnfantComponent;
  let fixture: ComponentFixture<EditEnfantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEnfantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
