import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorePower } from './more-power';

describe('MorePower', () => {
  let component: MorePower;
  let fixture: ComponentFixture<MorePower>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MorePower]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MorePower);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
