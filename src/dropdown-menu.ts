import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { DropDownData, DropdownItem } from './types';

import { DropDownDataSchema } from './dropdownSchema';

import { dropDownStyles } from './dropdown-menu-styles';

@customElement('dropdown-menu')
export class DropdownMenu extends LitElement {
  // handling dropdown open and close state
  @state()
  protected open: boolean = false;

  // selected dropdown value
  @state()
  protected selectedItem: string = '';

  // dropdwon styles
  static styles = [dropDownStyles];

  // name to display, when no item is slected
  @property({ type: String })
  displayName = 'Select';

  // disable the dropdown
  @property({ type: Boolean })
  disableDropdownButton = false;

  // message to show when no items are present
  @property({ type: String })
  noItemsMessage = 'No items available';

  // default selected value to show in the dropdown
  @property({ type: String })
  selectedValue = '';

  // data to display, data can be Array of strings or Array of objects
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

  // registering the event handleOutsideClick, when the component is rendering
  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this.handleOutsideClick);
  }

  // unregistering the event handleOutsideClick
  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick);
  }

  // closing the dropdwon when we click outside pf the node
  private handleOutsideClick = (event: MouseEvent): void => {
    if (!this.contains(event.target as Node)) {
      this.open = false;
    }
  };

  // toggling the state of the dropdown
  private toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.open = !this.open;
  }

  /**
   * This method will set the selected item and selected value, and it will dispatch the selectedItem
   * event, and this will close the dropdown after selecting the item.
   * @param {Event} event - event.
   * @param {DropdownItem} item - The selected item.
   * @returns void.
   */
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

  /**
   * This method formats the data when it's an array of strings, 
   * returning it as an array of objects with label and value properties.
   * @returns Array<DropdownItem>.
   */
  private get normalizeData(): Array<DropdownItem> {
    if (!this.data || this.data.length === 0) return [];
    return this.data.map((item) => {
      if (typeof item === 'string') {
        return { label: item, value: item };
      }
      return item;
    });
  }

  /**
   * This method will return the items, if data is not empty, if it is
   * empty then it will return the message.
   * @returns TemplateResult<1>[].
   */
  private renderItems(): TemplateResult<1>[] {
    const normalizedData = this.normalizeData;
    if (normalizedData.length === 0) {
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

  /**
   * This method will return the selected label, if it's present, or it will
   * return the display name
   * @returns void.
   */
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
