/*

import Dict exposing (foldl)
import Set exposing (toArray)

*/

// LOG

var _Debug_log__PROD = F2(function (tag, value) {
  return value;
});

var _Debug_log__DEBUG = F2(function (tag, value) {
  console.log(tag + ": " + _Debug_toString(value));
  return value;
});

// TODOS

function _Debug_todo(moduleName, region) {
  return function (message) {
    _Debug_crash(8, moduleName, region, message);
  };
}

function _Debug_todoCase(moduleName, region, value) {
  return function (message) {
    _Debug_crash(9, moduleName, region, value, message);
  };
}

// TO STRING

function _Debug_toString__PROD(value) {
  return "<internals>";
}

function _Debug_toString__DEBUG(value) {
  return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value) {
  if (value == null) {
    return _Debug_internalColor(ansi, "<null>");
  }

  if (typeof value === "function") {
    return _Debug_internalColor(ansi, "<function>");
  }

  if (typeof value === "boolean") {
    return _Debug_ctorColor(ansi, value ? "True" : "False");
  }

  if (typeof value === "number") {
    return _Debug_numberColor(ansi, value + "");
  }

  if (value instanceof String) {
    return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
  }

  if (typeof value === "string") {
    return _Debug_stringColor(
      ansi,
      '"' + _Debug_addSlashes(value, false) + '"',
    );
  }

  if (Array.isArray(value)) {
    var output = "[";

    value.length > 0 && (output += _Debug_toAnsiString(ansi, value[0]));

    for (var idx = 1; idx < value.length; idx++) {
      output += ", " + _Debug_toAnsiString(ansi, value[idx]);
    }

    return output + "]";
  }

  if (typeof value === "object" && "$" in value) {
    var tag = value.$;

    if (typeof tag === "number") {
      return _Debug_internalColor(ansi, "<internals>");
    }

    if (tag === "Set_gren_builtin") {
      return (
        _Debug_ctorColor(ansi, "Set") +
        _Debug_fadeColor(ansi, ".fromArray") +
        " " +
        _Debug_toAnsiString(ansi, __Set_toArray(value))
      );
    }

    if (tag === "RBNode_gren_builtin" || tag === "RBEmpty_gren_builtin") {
      return (
        _Debug_ctorColor(ansi, "Dict") +
        _Debug_fadeColor(ansi, ".fromArray") +
        " " +
        _Debug_toAnsiString(
          ansi,
          A3(
            __Dict_foldl,
            F3(function (key, value, acc) {
              acc.push({ key: key, value: value });
              return acc;
            }),
            [],
            value,
          ),
        )
      );
    }

    var output = "";
    for (var i in value) {
      if (i === "$") continue;
      var str = _Debug_toAnsiString(ansi, value[i]);
      var c0 = str[0];
      var parenless =
        c0 === "{" ||
        c0 === "(" ||
        c0 === "[" ||
        c0 === "<" ||
        c0 === '"' ||
        str.indexOf(" ") < 0;
      output += " " + (parenless ? str : "(" + str + ")");
    }
    return _Debug_ctorColor(ansi, tag) + output;
  }

  if (value instanceof DataView) {
    return _Debug_stringColor(ansi, "<" + value.byteLength + " bytes>");
  }

  if (typeof File !== "undefined" && value instanceof File) {
    return _Debug_internalColor(ansi, "<" + value.name + ">");
  }

  if (
    typeof _Array_Builder !== "undefined" &&
    value instanceof _Array_Builder
  ) {
    return _Debug_toAnsiString(ansi, value.__$array.slice(0, value.__$target));
  }

  if (typeof value === "object") {
    var output = [];
    for (var key in value) {
      var field = key[0] === "_" ? key.slice(1) : key;
      output.push(
        _Debug_fadeColor(ansi, field) +
          " = " +
          _Debug_toAnsiString(ansi, value[key]),
      );
    }
    if (output.length === 0) {
      return "{}";
    }
    return "{ " + output.join(", ") + " }";
  }

  return _Debug_internalColor(ansi, "<internals>");
}

function _Debug_addSlashes(str, isChar) {
  var s = str
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/\t/g, "\\t")
    .replace(/\r/g, "\\r")
    .replace(/\v/g, "\\v")
    .replace(/\0/g, "\\0");

  if (isChar) {
    return s.replace(/\'/g, "\\'");
  } else {
    return s.replace(/\"/g, '\\"');
  }
}

function _Debug_ctorColor(ansi, string) {
  return ansi ? "\x1b[96m" + string + "\x1b[0m" : string;
}

function _Debug_numberColor(ansi, string) {
  return ansi ? "\x1b[95m" + string + "\x1b[0m" : string;
}

function _Debug_stringColor(ansi, string) {
  return ansi ? "\x1b[93m" + string + "\x1b[0m" : string;
}

function _Debug_charColor(ansi, string) {
  return ansi ? "\x1b[92m" + string + "\x1b[0m" : string;
}

function _Debug_fadeColor(ansi, string) {
  return ansi ? "\x1b[37m" + string + "\x1b[0m" : string;
}

function _Debug_internalColor(ansi, string) {
  return ansi ? "\x1b[36m" + string + "\x1b[0m" : string;
}

function _Debug_toHexDigit(n) {
  return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}

// CRASH

function _Debug_crash__PROD(identifier) {
  throw new Error(
    "https://github.com/gren-lang/core/blob/1.0.0/hints/" + identifier + ".md",
  );
}

function _Debug_crash__DEBUG(identifier, fact1, fact2, fact3, fact4) {
  switch (identifier) {
    case 0:
      throw new Error(
        'What node should I take over? In JavaScript I need something like:\n\n    Gren.Main.init({\n        node: document.getElementById("gren-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.',
      );

    case 1:
      throw new Error(
        "Browser.application programs cannot handle URLs like this:\n\n    " +
          document.location.href +
          "\n\nWhat is the root? The root of your file system?",
      );

    case 2:
      var jsonErrorString = fact1;
      throw new Error(
        "Problem with the flags given to your Gren program on initialization.\n\n" +
          jsonErrorString,
      );

    case 3:
      var portName = fact1;
      throw new Error(
        "There can only be one port named `" +
          portName +
          "`, but your program has multiple.",
      );

    case 4:
      var portName = fact1;
      var problem = fact2;
      throw new Error(
        "Trying to send an unexpected type of value through port `" +
          portName +
          "`:\n" +
          problem,
      );

    case 5:
      throw new Error(
        'Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Gren sense.\nRead more about this at https://package.gren-lang.org/packages/gren-lang/core/latest/Basics#== which describes why it is this way and what the better version will look like.',
      );

    case 6:
      var moduleName = fact1;
      throw new Error(
        "Your page is loading multiple Gren scripts with a module named " +
          moduleName +
          ". Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!",
      );

    case 8:
      var moduleName = fact1;
      var region = fact2;
      var message = fact3;
      throw new Error(
        "TODO in module `" +
          moduleName +
          "` " +
          _Debug_regionToString(region) +
          "\n\n" +
          message,
      );

    case 9:
      var moduleName = fact1;
      var region = fact2;
      var value = fact3;
      var message = fact4;
      throw new Error(
        "TODO in module `" +
          moduleName +
          "` from the `case` expression " +
          _Debug_regionToString(region) +
          "\n\nIt received the following value:\n\n    " +
          _Debug_toString(value).replace("\n", "\n    ") +
          "\n\nBut the branch that handles it says:\n\n    " +
          message.replace("\n", "\n    "),
      );

    case 10:
      throw new Error("Bug in https://github.com/gren-lang/core/issues");

    case 11:
      throw new Error("Cannot perform mod 0. Division by zero error.");
  }
}

function _Debug_regionToString(region) {
  if (region.__$start.__$line === region.__$end.__$line) {
    return "on line " + region.__$start.__$line;
  }
  return (
    "on lines " + region.__$start.__$line + " through " + region.__$end.__$line
  );
}
