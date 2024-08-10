- [ ] alot of types is missing and set to any, maybe has to losen it a bit at this point?!
- [ ] Socket need a connections props which I still don't have data for it to pass, set it to [] for now.
- [ ] Drag from socket should create a connection.
- [ ] Connection between 2 sockets of different type will cast if possible (check the ouptut value type and the input
  socket type and invoke the conversion function if possible) else remove the active connection.
- [ ] Somehow we need to design the node preview -- e.g. want to debug the result of the current selected node
    - [ ] Option1: We can preview in place - inside the node itself.
    - [ ] Option2: We can preview the result in the viewport.

## V1

- [x] Feat: Highlight selected node
- [x] Fix: The connection goes to (0, 0) when first created, but after moving the canvas.
- [x] Feat Connection of socket execute the socket function to connect input to output.
- [x] Feat: Remove connection won't reset the socket value to default, but instead keep it as is.
- [x] Feat: Can only connect sockets of the same type.
- [x] Style: Color of the connections.
- [x] Feat: When socket is connected, we can't adjust its value, should only display the socket name.

## V2

- [ ] add node category to the node defination.
- [ ] All the nodes looks the same right now, either add an icon for each node or bg color for each node (category) each
  all the math nodes has the same bg color or blue.
    - [ ] Option 1: instead of change the bg of the whole node we can change the header color only (blender + unity +
      unreal + substance designer)
- [ ] socket color has to match the node color, e.g. I know I can connect a color node to this socket.
- [ ] if I change the mix node for example to mix float, then the color code of the node is different than mix colors.
- [ ] so we categorize the node by what data it operators on (float, color, vector, etc).
- [ ] add a new socket type dropdown => specially for the mix node to change the input/output type and function.

# V2.2

- [ ] Feat: Implement more fundamental ThreeJS nodes.
    - [ ] Vector2 Node
    - [ ] Vector3 Node
    - Example Math of 2 or more numbers

## V3

- [ ] Feat: Implement topological sort to execute the graph.
    - Recreate this example (https://app.nodetoy.co/file/9844f954-16f7-443f-bbf8-a90b59d863bf) using the graph.
    - What nodes in this projects?

## V4

- [ ] Feat: Build a custom color picker component, as the default one is not standard across all browsers.
    - [ ] Can save colors to a palette.
    - [ ] Can pick color from the browser.
    - [ ] Can switch HSL/RGB/HEXA

## V5

- [ ] Fix: Disable pan the canvas using only mouse - it should pan using [Alt] + [Mouse].
- [ ] Feat: can multi select nodes by drag rectangle.
- [ ] Feat: show a floating panel at the bottom left of the screen with the node properties.

## V6

- [ ] Feat: Try to get a list of all the API functions that ThreeJS provides.
    - [ ] get the input and output of each function.
    - [ ] get the type of each input and output.
    - [ ] get the description of each function.
- [ ] Feat: Implement a search bar to search for nodes.

## V7

- [ ] Feat: Implement a way to save and load the graph.
- [ ] Feat: Implement a way to export the graph to a JSON file.
- [ ] Feat: Implement a way to import the graph from a JSON file.
- [ ] Feat: Learn Node and Read about GraphQL + Postgres that Figma is using.
- [ ] Feat: Learn from Figma and Miro architecture.

## V8

- [ ] Feat: can preview each node output so far (like substance designer)

---
