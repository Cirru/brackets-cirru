
define(function(require, exports, module) {
  
  var LanguageManager = brackets.getModule("language/LanguageManager");
  
  CodeMirror.defineMode("cirru", function() {
    return {
      startState: function() {
        return {
          head: true
        };
      },
      token: function(stream, state) {
        if (stream.sol()) {
          state.head = true;
        }
        if (stream.match("$")) {
          state.head = true;
          return "comment";
        } else if (stream.match(',')) {
          state.head = false;
          return 'bracket';
        } else if (stream.match(/^[^\$\"\s\(\)][^\"\s\(\)]*/)) {
          if (state.head) {
            state.head = false;
            return "keyword";
          } else {
            return "atom";
          }
        } else if (stream.match(/^"([^\\\"]|(\\.))*\"/)) {
          if (state.head) {
            state.head = false;
            return "keyword";
          } else {
            return "atom";
          }
        } else if (stream.match("(")) {
          state.head = true;
          return "comment";
        } else if (stream.match(")")) {
          state.head = false;
          return "comment";
        } else {
          stream.next();
          return null;
        }
      }
    };
  });
  
  LanguageManager.defineLanguage("jade", {
    name: "Cirru",
    mode: "cirru",
    fileExtensions: ["cirru", "cr"],
    lineComment: ["--"]
  });
  
});  