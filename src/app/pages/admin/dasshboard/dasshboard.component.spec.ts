import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasshboardComponent } from './dasshboard.component';

describe('DasshboardComponent', () => {
  let component: DasshboardComponent;
  let fixture: ComponentFixture<DasshboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DasshboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DasshboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
