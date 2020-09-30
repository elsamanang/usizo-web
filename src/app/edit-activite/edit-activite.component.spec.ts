import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActiviteComponent } from './edit-activite.component';

describe('EditActiviteComponent', () => {
  let component: EditActiviteComponent;
  let fixture: ComponentFixture<EditActiviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditActiviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
