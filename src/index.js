
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
  
  const JSX_ANNOTATION_REGEX = /\*?\s*@jsx-arrow\s+([^\s]+)/;
  var params = [];


  const visitor = {
 
  	Program(path, state) { 

		const { file } = state; 
		let sparams = state.opts.pragma;

		for(const comment of file.ast.comments) {
      		const matches = JSX_ANNOTATION_REGEX.exec(comment.value);
      		if (matches) { 
      			sparams = matches[1];
	          	break;
	      	}
        }

        if(sparams) {
        	params = sparams.split(',').map((e) => e.trim());
        }

  	},

  	JSXExpressionContainer(path) {
		if(path.parent && (path.parent.type=='JSXAttribute' || path.parent.type=='JSXElement')){
			if(!path.node._kox){
				path.node.expression = t.arrowFunctionExpression(params.map((n)=> t.identifier(n)), path.node.expression, false);
				path.node._kox = true;
			}
		}
	}
	
  };

  return {
    visitor
  };
}