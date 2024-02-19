### How to pan zoom?

[More info on The-Node-Editor-Study-03 DevLogs]

It's different between Canvas and normal DOM elements.

----

### Scale to the mouse position

- the first issue is that the DOM elements has the origin by default at `center` and we need to change it to `top-left`
  to make the scale to the mouse position work properly. which is not the case for the canvas.
- The canvas has the origin at `top-left` by default.

---
