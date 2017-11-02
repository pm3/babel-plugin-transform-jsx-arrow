# babel-plugin-transform-jsx-arrow
> wrap jsx expression to ()=> expr

annotate jsx file
@jsx-arrow ( param, param )- param list used in arrow

## Example

**In**

```
/* @jsx vdom */
/* @jsx-arrow(m) */
<div id={m.id}> {m.id} </div>
```

**Out**

the same as

```
<div id={(m) => m.id}> {(m) => m.id} </div>

or

vdom('div', {
		id : function(m) { return m.id }
	},
	function(m) { return m.id }
	)

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
