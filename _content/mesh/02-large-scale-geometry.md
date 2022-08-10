---
name: Large Scale Geometry
year: 2022
week: 20
day: 3
tags:
  - Geometry
  - Torus
---

So here are some first details about the #Mesh.

The world is a giant torus with exactly the same surface as the earth. The
measuring is decimal and uses units (**u**) which are equivalent to 1 meter and
klicks (**k**) for kilometers.

The form factor of the torus is **7**. So the tube ends up with a radius of
**929 k** and the inner radius (the hole) is **6504 k**.

The tube is split into 512 sectors, which results in a width of **11.4 k** per
sector. The torus has 4.096 sectors. Therefore on the outside equator, the
sectors are nearly squares.

Sectors have a unique address written as `@ttt.TTT`. `ttt` represents the tube
segment in octal (as lower case letters `a..h`). `TTT` represents the torus
segment in hexadecimal (as numbers and uppercase letters `0..9A..F`). Valid
addresses look like this: `@had.14D`.

Let's get into more human dimensions with the next post.
