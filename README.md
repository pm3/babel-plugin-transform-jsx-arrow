# babel-plugin-transform-jsx-arrow
> wrap jsx expression to ()=> expr

## Example

**In**

```
<sometag />
```

**Out**

```
<sometag __source={ { fileName: 'this/file.js', lineNumber: 10 } } />
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-jsx-arrow
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["babel-plugin-transform-jsx-arrow"]
}
```

### Via CLI

```sh
babel --plugins babel-plugin-transform-jsx-arrow script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["babel-plugin-transform-jsx-arrow"]
});
``` 
