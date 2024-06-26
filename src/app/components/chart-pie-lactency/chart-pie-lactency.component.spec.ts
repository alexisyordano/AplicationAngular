import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPieLactencyComponent } from './chart-pie-lactency.component';

describe('ChartPieLactencyComponent', () => {
  let component: ChartPieLactencyComponent;
  let fixture: ComponentFixture<ChartPieLactencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartPieLactencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartPieLactencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
