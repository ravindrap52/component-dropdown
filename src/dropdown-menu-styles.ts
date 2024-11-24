import { css } from 'lit';

export const dropDownStyles = css`
  :host {
    --button-background: #d1d3d8;
    --button-border: #d1d3d8;
    --primary-color: #333;
    --button-hover-background: #b0b3b8;
    --button-hover-border-color: #b0b3b8;

    --dropdown-background-white: #fff;

    --dropdown-item-hover-background: #e5e5e5;
    --dropdown-item-hover-border-left: #b0b3b8;
    --dropdown-item-hover-color: #333;
    --dropdown-item-active-background: #d0d0d0;

    --dropdown-list-border-color: #ddd;
  }

  :host(.primary) {
    --button-background: #004aad;
    --button-border: #0061cc;
    --primary-color: #ffffff;
    --button-hover-background: #0057d4;
    --button-hover-border-color: #0073e6;

    --dropdown-background-white: #fff;

    --dropdown-item-hover-background: #0073e6;
    --dropdown-item-hover-border-left: #0057d4;
    --dropdown-item-color: #333333;
    --dropdown-item-hover-color: #fff;
    --dropdown-item-active-background: #003f8c;

    --dropdown-list-border-color: #0073e6;
  }

  :host(.secondary) {
    --button-background: #ffe0b2;
    --button-border: #ffb74d;
    --primary-color: #3e4a59;
    --button-hover-background: #ff9800;
    --button-hover-border-color: #ff5722;

    --dropdown-background-white: #fff;

    --dropdown-item-hover-background: #ff7043;
    --dropdown-item-hover-border-left: #d84315;
    --dropdown-item-color: #6d4c41;
    --dropdown-item-hover-color: #fff;
    --dropdown-item-active-background: #d32f2f;

    --dropdown-list-border-color: #ff5722;
  }

  :host([align='right']) .dropdown-list {
    top: 100%;
    right: 0;
    left: auto;
  }

  :host([align='top']) .dropdown-list {
    bottom: 100%;
    top: auto;
    left: 0;
  }

  .dropdown * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .dropdown {
    display: inline-block;
    position: relative;
  }
  .dropdown-button {
    background-color: var(--button-background);
    color: var(--primary-color);
    border: 1px solid var(--button-border);
    padding: 12px 20px;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    border-radius: 5px;
    transition:
      background-color 0.3s,
      border-color 0.3s;
    width: auto;
    min-width: 160px;
    position: relative;
    white-space: nowrap;
    padding-right: 30px;
  }

  .dropdown-button:hover {
    background-color: var(--button-hover-border-color);
    border-color: var(--button-hover-border-color);
  }

  .dropdown-button::after {
    content: '';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid var(--primary-color);
    transition: transform 0.3s ease;
  }

  .dropdown-button[aria-expanded='true']::after {
    transform: rotate(180deg);
  }

  .dropdown-button[disabled] {
    cursor: not-allowed;
  }

  .dropdown-list {
    display: none;
    background-color: var(--dropdown-background-white);
    border: 1px solid var(--dropdown-list-border-color);
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    list-style-type: none;
    min-width: 160px;
    width: 100%;
    margin: 0;
    padding: 0;
    opacity: 0;
    transform: translateY(-10px);
    position: absolute;
    transition:
      opacity 0.3s ease,
      visibility 0s 0.3s,
      transform 0.3s ease;
    z-index: 1;
  }

  .dropdown-list.show {
    display: block;
    opacity: 1;
    transform: translateY(0);
  }

  .dropdown-item {
    width: 100%;
  }

  .dropdown-item a {
    color: var(--dropdown-item-color);
    text-decoration: none;
    display: block;
    padding: 12px 20px;
    width: 100%;
    text-align: left;
    transition:
      border-left 0.3s ease,
      padding-left 0.3s ease,
      background-color 0.3s ease;
  }

  .dropdown-item a:hover {
    background-color: var(--dropdown-item-hover-background);
    border-left: 4px solid var(--dropdown-item-hover-border-left);
    color: var(--dropdown-item-hover-color);
    padding-left: 24px;
  }

  .dropdown-item a.active {
    background-color: var(--dropdown-item-active-background);
    color: var(--dropdown-item-hover-color);
  }
  .no-items-available {
    padding: 1rem;
    color: var(--dropdown-item-color);
  }
`;
