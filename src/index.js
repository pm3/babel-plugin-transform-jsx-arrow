
 /**
 * WRAP attribute expresiion to (m)=> expr
 *
 * == JSX Literals ==
 *
 * <sometag id={m.id}/>
 *
 * becomes:
 *
 * <sometag id={(m)=> m.id}/>
 */

export default function ({ types: t }) {

  t.react.isCompatTag = function(tagName){ return true };

  const visitor = {
  
  	JSXExpressionContainer(path) {
		if(path.parent && (path.parent.type=='JSXAttribute' || path.parent.type=='JSXElement')){
			if(!path.node._kox){
				path.node.expression = t.arrowFunctionExpression([t.identifier('m')], path.node.expression, false);
				path.node._kox = true;
			}
		}
	}
	
  };

  return {
    visitor
  };
}
