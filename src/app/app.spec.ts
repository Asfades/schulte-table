import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a 5x5 table with a shuffled 1..25 by default', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const cells = (fixture.nativeElement as HTMLElement).querySelectorAll('.cell');

    expect(cells.length).toBe(25);
    const values = Array.from(cells, (cell) => Number(cell.textContent));
    expect([...values].sort((a, b) => a - b)).toEqual(
      Array.from({ length: 25 }, (_, index) => index + 1),
    );
  });

  it('should render a green Generate button below the table', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const button = root.querySelector('button.generate')!;
    const table = root.querySelector('app-schulte-table')!;

    expect(button.textContent?.trim()).toBe('Generate');
    expect(table.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('should reshuffle when Generate is clicked', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const read = () =>
      Array.from(root.querySelectorAll('.cell'), (cell) => cell.textContent).join();

    const before = read();
    let after = before;
    // A shuffle can legitimately repeat itself; a handful of clicks makes that vanishingly unlikely.
    for (let attempt = 0; attempt < 10 && after === before; attempt++) {
      root.querySelector<HTMLButtonElement>('button.generate')!.click();
      await fixture.whenStable();
      after = read();
    }

    expect(after).not.toBe(before);
  });

  it('should resize the table when a new size is picked', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const select = root.querySelector<HTMLSelectElement>('select')!;

    select.value = '10';
    select.dispatchEvent(new Event('change'));
    await fixture.whenStable();

    expect(root.querySelectorAll('.cell').length).toBe(100);
  });

  it('should apply the chosen text size to the table', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const range = root.querySelector<HTMLInputElement>('input[type="range"]')!;

    expect(range.min).toBe('16');
    expect(range.max).toBe('42');

    range.value = '42';
    range.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(root.querySelector<HTMLElement>('.grid')!.style.fontSize).toBe('42px');
  });
});
