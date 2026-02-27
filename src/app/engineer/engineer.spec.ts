import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Engineer } from './engineer';

describe('Engineer', () => {
  let component: Engineer;
  let fixture: ComponentFixture<Engineer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Engineer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Engineer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
