import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import { SchulteTable } from './schulte-table/schulte-table';

export const MIN_SIZE = 2;
export const MAX_SIZE = 10;
export const MIN_FONT_SIZE = 16;
export const MAX_FONT_SIZE = 42;

/** Fisher-Yates shuffle of 1..count. */
function shuffledNumbers(count: number): readonly number[] {
  const numbers = Array.from({ length: count }, (_, index) => index + 1);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
}

@Component({
  selector: 'app-root',
  imports: [SchulteTable],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly window = inject(DOCUMENT).defaultView;

  protected readonly minSize = MIN_SIZE;
  protected readonly maxSize = MAX_SIZE;
  protected readonly minFontSize = MIN_FONT_SIZE;
  protected readonly maxFontSize = MAX_FONT_SIZE;

  protected readonly sizes = Array.from(
    { length: MAX_SIZE - MIN_SIZE + 1 },
    (_, index) => MIN_SIZE + index,
  );

  protected readonly size = signal(5);
  protected readonly fontSize = signal(24);

  /** Reshuffles whenever the size changes, and once on load, so every visit starts fresh. */
  protected readonly numbers = linkedSignal<number, readonly number[]>({
    source: this.size,
    computation: (size) => shuffledNumbers(size * size),
  });

  protected generate(): void {
    this.numbers.set(shuffledNumbers(this.size() * this.size()));
  }

  protected print(): void {
    this.window?.print();
  }

  protected setSize(value: string): void {
    this.size.set(clamp(Number(value), MIN_SIZE, MAX_SIZE));
  }

  protected setFontSize(value: string): void {
    this.fontSize.set(clamp(Number(value), MIN_FONT_SIZE, MAX_FONT_SIZE));
  }
}

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) {
    return min;
  }
  return Math.min(max, Math.max(min, Math.round(value)));
}
