# rokket Documentation

The game is built with JavaScript and the PixiJS rendering library for WebGL.

## Folder Structure

- `public/` everything shipped to the user

  - `index.html` main page

  - `graphics/` SVG game graphics

  - `scripts/`

    - `main.js` PixiJS app declaration, **game loop**

    Every other file contains a class extending a PixiJS container (or derivate), which is responsible for one actor or the background. The instances are exported from there. 

- `node_modules/` dependencies

## Functioning

### Parallax Background

#### Object Generation

*probability for generating a new space object in one game loop* 
$$
P = \frac{d \cdot o_d \cdot v}{w}
$$

$w$ = screen width; $v$  = object speed; $d$ = game loop execution time; $o_d$ = average amount of simultaneously displayed objects

### Spacecraft

### Meteroid

