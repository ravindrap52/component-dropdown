import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { DropDownData, DropdownItem } from './types';

import { DropDownDataSchema } from './dropdownSchema';

import { dropDownStyles } from './dropdown-menu-styles';

@customElement('dropdown-menu')
export class DropdownMenu extends LitElement {
  @state()
  protected open: boolean = false;

  @state()
  protected selectedItem: string = '';

  static styles = [dropDownStyles];

  @property({ type: String })
  displayName = 'Select';

  @property({ type: Boolean })
  disableDropdownButton = false;

  @property({ type: String })
  noItemsMessage = 'No items available';

  @property({ type: String })
  selectedValue = '';

  @property({
    type: Array,
    reflect: true,
    converter: {
      fromAttribute(value: string): DropDownData {
        if (!value) return [];
        try {
          const parsedData = JSON.parse(value);
          const result = DropDownDataSchema.safeParse(parsedData);
          if (result.success) {
            return result.data;
          } else {
            console.error('Invalid data format:', result.error);
            return [];
          }
        } catch (error) {
          console.error('Error parsing JSON data:', error);
          return [];
        }
      },
    },
  })
  data: DropDownData = [];

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick);
  }

  private handleOutsideClick = (event: MouseEvent): void => {
    if (!this.contains(event.target as Node)) {
      this.open = false;
    }
  };

  private toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.open = !this.open;
  }

  private handleItemClick(event: Event, item: DropdownItem): void {
    event.preventDefault();
    this.selectedItem = item.value;
    this.selectedValue = item.value;
    const selectedItemEvent = new CustomEvent<DropdownItem>('selectedItem', {
      detail: {
        label: item.label,
        value: item.value,
      },
    });
    this.dispatchEvent(selectedItemEvent);
    this.open = false;
  }

  private get normalizeData(): Array<DropdownItem> {
    if (!this.data || this.data.length === 0) return [];
    return this.data.map((item) => {
      if (typeof item === 'string') {
        // If the item is a string, convert it to a DropdownItem
        return { label: item, value: item };
      }
      return item;
    });
  }

  private renderItems(): TemplateResult<1>[] {
    const normalizedData = this.normalizeData;
    if (normalizedData.length === 0) {
      // If no items are available (empty or invalid data), return a fallback message
      return [
        html`<li class="dropdown-item no-items-available" role="menuitem" aria-disabled="true">
          ${this.noItemsMessage}
        </li>`,
      ];
    }
    return normalizedData.map(
      (item) => html`
        <li role="menuitem" tabindex="0" class="dropdown-item">
          <a
            href="javascript:void(0)"
            value=${item.value}
            @click=${(e: Event) => this.handleItemClick(e, item)}
            aria-selected="${this.selectedItem === item.value}"
            class=${classMap({
              active: this.selectedItem === item.value,
            })}
          >
            ${item.label}
          </a>
        </li>
      `,
    );
  }
  private getSelectedLabel(): string {
    const selectedItem = this.normalizeData.find((item) => item.value === this.selectedValue);
    this.selectedItem = selectedItem?.value || '';
    return selectedItem ? selectedItem.label : this.displayName;
  }

  render() {
    return html`
      <div class="dropdown">
        <button
          type="button"
          aria-expanded="${this.open}"
          aria-controls="dropdown-menu-list"
          ?disabled="${this.disableDropdownButton}"
          @click=${this.toggleDropdown}
          class="dropdown-button"
          aria-label="Toggle dropdown"
        >
          <slot>${this.getSelectedLabel()}</slot>
        </button>
        <ul
          role="menu"
          id="dropdown-menu-list"
          class=${classMap({
            'dropdown-list': true,
            show: this.open,
          })}
        >
          ${this.renderItems()}
        </ul>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dropdown-menu': DropdownMenu;
  }
}
