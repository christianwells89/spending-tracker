CRA fails with TS 4+, change line 238 of node_modules\react-scripts\scripts\utils\verifyTypeScriptSetup.js
to the following to fix:

```javascript
} else if (parsedCompilerOptions[option] !== valueToCheck && option !== "jsx") {
```

Added `patch-package` and `postinstall-postinstall` to automatically patch 4.0.0 with this change.
