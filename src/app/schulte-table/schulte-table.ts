import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Ratio between the cell edge and the glyph size, so cells keep breathing room as text grows. */
const CELL_TO_FONT_RATIO = 2.4;

@Component({
  selector: 'app-schulte-table',
  templateUrl: './schulte-table.html',
  styleUrl: './schulte-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchulteTable {
  /** Numbers to lay out, already shuffled, in row-major order. */
  readonly numbers = input.required<readonly number[]>();

  /** Cells per row/column. */
  readonly size = input.required<number>();

  /** Glyph size in pixels. */
  readonly fontSize = input.required<number>();

  protected readonly columns = computed(() => `repeat(${this.size()}, minmax(0, 1fr))`);

  /** Grows with the font size, but never wider than the viewport allows. */
  protected readonly width = computed(
    () => `min(100%, ${Math.round(this.size() * this.fontSize() * CELL_TO_FONT_RATIO)}px)`,
  );
}
