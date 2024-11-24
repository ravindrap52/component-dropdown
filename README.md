# Dropdown

A web compoent build by using Lit.

# Dropdown API Documentation

## Props


| Name | Type | Default | Description
| --- | --- | --- | --- | 
| displayName | string | Select | Use the displayName property to set the default label for the dropdown button
| disableDropdownButton | boolean | false | Add attribute `disableDropdownButton` when you want to disable the dropdown
| noItemsMessage | string | No items available | Message to display when no items are available
| selectedValue | string | ' ' | Pass the value, when you want to set the defaule value for dropdown
| selectedItem | function | -  | event: Emit the event with the selected data
| data | Array | []  | Data can be array of strings or array of objects <br> eg:  ['Option1', 'Option2', 'Option3', 'Option4'] <br> [{ label: 'Option 1', value: 'option-1' }, { label: 'Option 2', value: 'option-2' }]
   


## Libraries Used

### Zod

I used Zod for validations.

## Project Setup

### Cloning the Repository

To clone the repository, use the following command:

```bash
git https://github.com/ravindrap52/component-dropdown.git
```

### Installation

To install the dependencies, navigate into the project directory and run:

```bash
cd component-dropdown
npm install
```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

#### This will open the browser and navigate to http://localhost:5173.

### Building for Production

To build the project for production, use:

```bash
npm run build
```
