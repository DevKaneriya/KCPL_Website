import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkWithYou } from './work-with-you';

describe('WorkWithYou', () => {
  let component: WorkWithYou;
  let fixture: ComponentFixture<WorkWithYou>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkWithYou]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkWithYou);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
