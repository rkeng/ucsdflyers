module.exports = {
    "extends": "standard",
    "plugins": [
        "standard",
        "promise",
        "react"
    ],
    "rules": {
        "semi": "error",
        "curly": "error",
        "indent": "error",
        "eqeqeq": "error",
        "quotes": ["error", "single"],
        "max-len": ["warn", {
          "code": 120,
          "tabWidth": 4,
          "ignoreUrls": true
        }],
        "react/prop-types": 1,
        "react/display-name": 1,
        "no-cond-assign": "error",
        "no-unreachable": "error",
        "no-unused-vars": ["error", {
          "vars": "all",
          "varsIgnorePattern": "[sS]equelize",
          "args": "none"
        }],
        "no-trailing-spaces": "error"
    }
};