'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;


  t.react.isCompatTag = function (tagName) {
    return true;
  };

  var JSX_ANNOTATION_REGEX = /\*?\s*@jsx-arrow\s*\(([^\)]*)\)/;
  var params = null;

  var visitor = {
    Program: function Program(path, state) {
      var file = state.file;

      var sparams = null;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = file.ast.comments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var comment = _step.value;

          var matches = JSX_ANNOTATION_REGEX.exec(comment.value);
          if (matches) {
            sparams = matches[1];
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (sparams) {
        params = sparams.split(',').map(function (e) {
          return e.trim();
        }).filter(function (e) {
          return e && e.length > 0;
        });
      }
    },
    JSXExpressionContainer: function JSXExpressionContainer(path) {
      if (params && path.parent && (path.parent.type == 'JSXAttribute' || path.parent.type == 'JSXElement')) {
        if (!path.node._kox) {
          path.node.expression = t.arrowFunctionExpression(params.map(function (n) {
            return t.identifier(n);
          }), path.node.expression, false);
          path.node._kox = true;
        }
      }
    }
  };

  return {
    visitor: visitor
  };
};
