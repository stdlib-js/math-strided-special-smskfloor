<!--

@license Apache-2.0

Copyright (c) 2021 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

# smskfloor

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Round each element in a single-precision floating-point strided array toward negative infinity according to a strided mask array.

<section class="intro">

</section>

<!-- /.intro -->

<section class="installation">

## Installation

```bash
npm install @stdlib/math-strided-special-smskfloor
```

Alternatively,

-   To load the package in a website via a `script` tag without installation and bundlers, use the [ES Module][es-module] available on the [`esm` branch][esm-url].
-   If you are using Deno, visit the [`deno` branch][deno-url].
-   For use in Observable, or in browser/node environments, use the [Universal Module Definition (UMD)][umd] build available on the [`umd` branch][umd-url].

The [branches.md][branches-url] file summarizes the available branches and displays a diagram illustrating their relationships.

</section>

<section class="usage">

## Usage

```javascript
var smskfloor = require( '@stdlib/math-strided-special-smskfloor' );
```

#### smskfloor( N, x, sx, m, sm, y, sy )

Rounds each element in a single-precision floating-point strided array toward negative infinity according to a strided mask array `x` according to a strided mask array and assigns the results to elements in a single-precision floating-point strided array `y`.

```javascript
var Float32Array = require( '@stdlib/array-float32' );
var Uint8Array = require( '@stdlib/array-uint8' );

var x = new Float32Array( [ 1.1, 2.5, -3.5, 4.0, -5.9 ] );
var m = new Uint8Array( [ 0, 0, 1, 0, 1 ] );
var y = new Float32Array( x.length );

smskfloor( x.length, x, 1, m, 1, y, 1 );
// y => <Float32Array>[ 1.0, 2.0, 0.0, 4.0, 0.0 ]
```

The function accepts the following arguments:

-   **N**: number of indexed elements.
-   **x**: input [`Float32Array`][@stdlib/array/float32].
-   **sx**: index increment for `x`.
-   **m**: mask [`Uint8Array`][@stdlib/array/uint8].
-   **sm**: index increment for `m`.
-   **y**: output [`Float32Array`][@stdlib/array/float32].
-   **sy**: index increment for `y`.

The `N` and stride parameters determine which strided array elements are accessed at runtime. For example, to index every other value in `x` and to index the first `N` elements of `y` in reverse order,

```javascript
var Float32Array = require( '@stdlib/array-float32' );
var Uint8Array = require( '@stdlib/array-uint8' );

var x = new Float32Array( [ 1.1, 2.5, -3.5, 4.0, -5.9, 6.4 ] );
var m = new Uint8Array( [ 0, 0, 1, 0, 1, 1 ] );
var y = new Float32Array( [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ] );

smskfloor( 3, x, 2, m, 2, y, -1 );
// y => <Float32Array>[ 0.0, 0.0, 1.0, 0.0, 0.0, 0.0 ]
```

Note that indexing is relative to the first index. To introduce an offset, use [`typed array`][@stdlib/array/float32] views.

```javascript
var Float32Array = require( '@stdlib/array-float32' );
var Uint8Array = require( '@stdlib/array-uint8' );

// Initial arrays...
var x0 = new Float32Array( [ 1.1, 2.5, -3.5, 4.0, -5.9, 6.4 ] );
var m0 = new Uint8Array( [ 0, 0, 1, 0, 1, 1 ] );
var y0 = new Float32Array( [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ] );

// Create offset views...
var x1 = new Float32Array( x0.buffer, x0.BYTES_PER_ELEMENT*1 ); // start at 2nd element
var m1 = new Uint8Array( m0.buffer, m0.BYTES_PER_ELEMENT*1 ); // start at 2nd element
var y1 = new Float32Array( y0.buffer, y0.BYTES_PER_ELEMENT*3 ); // start at 4th element

smskfloor( 3, x1, -2, m1, -2, y1, 1 );
// y0 => <Float32Array>[ 0.0, 0.0, 0.0, 0.0, 4.0, 2.0 ]
```

#### smskfloor.ndarray( N, x, sx, ox, m, sm, om, y, sy, oy )

Rounds each element in a single-precision floating-point strided array toward negative infinity according to a strided mask array `x` according to a strided mask array and assigns the results to elements in a single-precision floating-point strided array `y` using alternative indexing semantics.

```javascript
var Float32Array = require( '@stdlib/array-float32' );
var Uint8Array = require( '@stdlib/array-uint8' );

var x = new Float32Array( [ 1.1, 2.5, -3.5, 4.0, -5.9 ] );
var m = new Uint8Array( [ 0, 0, 1, 0, 1 ] );
var y = new Float32Array( [ 0.0, 0.0, 0.0, 0.0, 0.0 ] );

smskfloor.ndarray( x.length, x, 1, 0, m, 1, 0, y, 1, 0 );
// y => <Float32Array>[ 1.0, 2.0, 0.0, 4.0, 0.0 ]
```

The function accepts the following additional arguments:

-   **ox**: starting index for `x`.
-   **om**: starting index for `m`.
-   **oy**: starting index for `y`.

While [`typed array`][@stdlib/array/float32] views mandate a view offset based on the underlying `buffer`, the offset parameters support indexing semantics based on starting indices. For example, to index every other value in `x` starting from the second value and to index the last `N` elements in `y`,

```javascript
var Float32Array = require( '@stdlib/array-float32' );
var Uint8Array = require( '@stdlib/array-uint8' );

var x = new Float32Array( [ 1.1, 2.5, -3.5, 4.0, -5.9, 6.4 ] );
var m = new Uint8Array( [ 0, 0, 1, 0, 1, 1 ] );
var y = new Float32Array( [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ] );

smskfloor.ndarray( 3, x, 2, 1, m, 2, 1, y, -1, y.length-1 );
// y => <Float32Array>[ 0.0, 0.0, 0.0, 0.0, 4.0, 2.0 ]
```

</section>

<!-- /.usage -->

<section class="notes">

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var uniform = require( '@stdlib/random-base-uniform' );
var Float32Array = require( '@stdlib/array-float32' );
var Uint8Array = require( '@stdlib/array-uint8' );
var smskfloor = require( '@stdlib/math-strided-special-smskfloor' );

var x = new Float32Array( 10 );
var m = new Uint8Array( 10 );
var y = new Float32Array( 10 );

var i;
for ( i = 0; i < x.length; i++ ) {
    x[ i ] = uniform( -10.0, 10.0 );
    if ( uniform( 0.0, 1.0 ) < 0.5 ) {
        m[ i ] = 1;
    }
}
console.log( x );
console.log( m );
console.log( y );

smskfloor.ndarray( x.length, x, 1, 0, m, 1, 0, y, -1, y.length-1 );
console.log( y );
```

</section>

<!-- /.examples -->

<!-- C interface documentation. -->

* * *

<section class="c">

## C APIs

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

</section>

<!-- /.intro -->

<!-- C usage documentation. -->

<section class="usage">

### Usage

```c
#include "stdlib/math/strided/special/smskfloor.h"
```

#### stdlib_strided_smskfloor( N, \*X, strideX, \*Mask, strideMask, \*Y, strideY )

Rounds each element in a single-precision floating-point strided array `X` toward negative infinity according to a strided mask array and assigns the results to elements in a single-precision floating-point strided array `Y`.

```c
#include <stdint.h>

float X[] = { 1.1, 2.5, -3.5, 4.0, -5.9, 6.4, -7.0, 8.2 };
uint8_t Mask[] = { 0, 0, 1, 0, 1, 1, 0, 0 };
float Y[] = { 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 };

int64_t N = 4;

stdlib_strided_smskfloor( N, X, 2, Mask, 2, Y, 2 );
```

The function accepts the following arguments:

-   **N**: `[in] int64_t` number of indexed elements.
-   **X**: `[in] float*` input array.
-   **strideX**: `[in] int64_t` index increment for `X`.
-   **Mask**: `[in] uint8_t*` mask array.
-   **strideMask**: `[in] int64_t` index increment for `Mask`.
-   **Y**: `[out] float*` output array.
-   **strideY**: `[in] int64_t` index increment for `Y`.

```c
void stdlib_strided_smskfloor( const int64_t N, const float *X, const int64_t strideX, const uint8_t *Mask, const int64_t strideMask, float *Y, const int64_t strideY );
```

</section>

<!-- /.usage -->

<!-- C API usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

</section>

<!-- /.notes -->

<!-- C API usage examples. -->

<section class="examples">

### Examples

```c
#include "stdlib/math/strided/special/smskfloor.h"
#include <stdint.h>
#include <stdio.h>

int main() {
    // Create an input strided array:
    float X[] = { 1.1, 2.5, -3.5, 4.0, -5.9, 6.4, -7.0, 8.2 };

    // Create a mask strided array:
    uint8_t M[] = { 0, 0, 1, 0, 1, 1, 0, 0 };

    // Create an output strided array:
    float Y[] = { 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 };

    // Specify the number of elements:
    int64_t N = 4;

    // Specify the stride lengths:
    int64_t strideX = 2;
    int64_t strideM = 2;
    int64_t strideY = 2;

    // Compute the results:
    stdlib_strided_smskfloor( N, X, strideX, M, strideM, Y, strideY );

    // Print the results:
    for ( int i = 0; i < 8; i++ ) {
        printf( "Y[ %i ] = %f\n", i, Y[ i ] );
    }
}
```

</section>

<!-- /.examples -->

</section>

<!-- /.c -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

* * *

## See Also

-   <span class="package-name">[`@stdlib/math/strided/special/dmskfloor`][@stdlib/math/strided/special/dmskfloor]</span><span class="delimiter">: </span><span class="description">round each element in a double-precision floating-point strided array toward negative infinity according to a strided mask array.</span>
-   <span class="package-name">[`@stdlib/math/strided/special/sfloor`][@stdlib/math/strided/special/sfloor]</span><span class="delimiter">: </span><span class="description">round each element in a single-precision floating-point strided array toward negative infinity.</span>
-   <span class="package-name">[`@stdlib/math/strided/special/smskceil`][@stdlib/math/strided/special/smskceil]</span><span class="delimiter">: </span><span class="description">round each element in a single-precision floating-point strided array toward positive infinity according to a strided mask array.</span>
-   <span class="package-name">[`@stdlib/math/strided/special/smsktrunc`][@stdlib/math/strided/special/smsktrunc]</span><span class="delimiter">: </span><span class="description">round each element in a single-precision floating-point strided array toward zero according to a strided mask array.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2022. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/math-strided-special-smskfloor.svg
[npm-url]: https://npmjs.org/package/@stdlib/math-strided-special-smskfloor

[test-image]: https://github.com/stdlib-js/math-strided-special-smskfloor/actions/workflows/test.yml/badge.svg?branch=v0.0.9
[test-url]: https://github.com/stdlib-js/math-strided-special-smskfloor/actions/workflows/test.yml?query=branch:v0.0.9

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/math-strided-special-smskfloor/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/math-strided-special-smskfloor?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/math-strided-special-smskfloor.svg
[dependencies-url]: https://david-dm.org/stdlib-js/math-strided-special-smskfloor/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://gitter.im/stdlib-js/stdlib/

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/math-strided-special-smskfloor/tree/deno
[umd-url]: https://github.com/stdlib-js/math-strided-special-smskfloor/tree/umd
[esm-url]: https://github.com/stdlib-js/math-strided-special-smskfloor/tree/esm
[branches-url]: https://github.com/stdlib-js/math-strided-special-smskfloor/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/math-strided-special-smskfloor/main/LICENSE

[@stdlib/array/float32]: https://github.com/stdlib-js/array-float32

[@stdlib/array/uint8]: https://github.com/stdlib-js/array-uint8

<!-- <related-links> -->

[@stdlib/math/strided/special/dmskfloor]: https://github.com/stdlib-js/math-strided-special-dmskfloor

[@stdlib/math/strided/special/sfloor]: https://github.com/stdlib-js/math-strided-special-sfloor

[@stdlib/math/strided/special/smskceil]: https://github.com/stdlib-js/math-strided-special-smskceil

[@stdlib/math/strided/special/smsktrunc]: https://github.com/stdlib-js/math-strided-special-smsktrunc

<!-- </related-links> -->

</section>

<!-- /.links -->
