'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;


  t.react.isCompatTag = function (tagName) {
    return true;
  };

  var visitor = {
    JSXExpressionContainer: function JSXExpressionContainer(path) {
      if (path.parent && (path.parent.type == 'JSXAttribute' || path.parent.type == 'JSXElement')) {
        if (!path.node._kox) {
          path.node.expression = t.arrowFunctionExpression([t.identifier('m')], path.node.expression, false);
          path.node._kox = true;
        }
      }
    }
  };

  return {
    visitor: visitor
  };
};
