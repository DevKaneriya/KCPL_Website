import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdpcondensorWorkHardest } from './pdpcondensor-work-hardest';

describe('PdpcondensorWorkHardest', () => {
  let component: PdpcondensorWorkHardest;
  let fixture: ComponentFixture<PdpcondensorWorkHardest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdpcondensorWorkHardest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdpcondensorWorkHardest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
