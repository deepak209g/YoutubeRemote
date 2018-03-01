(function(e) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = e()
    } else if (typeof define === "function" && define.amd) {
        define([], e)
    } else {
        var t;
        if (typeof window !== "undefined") {
            t = window
        } else if (typeof global !== "undefined") {
            t = global
        } else if (typeof self !== "undefined") {
            t = self
        } else {
            t = this
        }
        t.SimplePeer = e()
    }
})(function() {
    var e, t, r;
    return function() {
        function e(t, r, n) {
            function i(a, s) {
                if (!r[a]) {
                    if (!t[a]) {
                        var f = typeof require == "function" && require;
                        if (!s && f) return f(a, !0);
                        if (o) return o(a, !0);
                        var u = new Error("Cannot find module '" + a + "'");
                        throw u.code = "MODULE_NOT_FOUND", u
                    }
                    var l = r[a] = {
                        exports: {}
                    };
                    t[a][0].call(l.exports, function(e) {
                        var r = t[a][1][e];
                        return i(r ? r : e)
                    }, l, l.exports, e, t, r, n)
                }
                return r[a].exports
            }
            var o = typeof require == "function" && require;
            for (var a = 0; a < n.length; a++) i(n[a]);
            return i
        }
        return e
    }()({
        1: [function(e, t, r) {
            "use strict";
            r.byteLength = l;
            r.toByteArray = c;
            r.fromByteArray = p;
            var n = [];
            var i = [];
            var o = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
            var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            for (var s = 0, f = a.length; s < f; ++s) {
                n[s] = a[s];
                i[a.charCodeAt(s)] = s
            }
            i["-".charCodeAt(0)] = 62;
            i["_".charCodeAt(0)] = 63;

            function u(e) {
                var t = e.length;
                if (t % 4 > 0) {
                    throw new Error("Invalid string. Length must be a multiple of 4")
                }
                return e[t - 2] === "=" ? 2 : e[t - 1] === "=" ? 1 : 0
            }

            function l(e) {
                return e.length * 3 / 4 - u(e)
            }

            function c(e) {
                var t, r, n, a, s;
                var f = e.length;
                a = u(e);
                s = new o(f * 3 / 4 - a);
                r = a > 0 ? f - 4 : f;
                var l = 0;
                for (t = 0; t < r; t += 4) {
                    n = i[e.charCodeAt(t)] << 18 | i[e.charCodeAt(t + 1)] << 12 | i[e.charCodeAt(t + 2)] << 6 | i[e.charCodeAt(t + 3)];
                    s[l++] = n >> 16 & 255;
                    s[l++] = n >> 8 & 255;
                    s[l++] = n & 255
                }
                if (a === 2) {
                    n = i[e.charCodeAt(t)] << 2 | i[e.charCodeAt(t + 1)] >> 4;
                    s[l++] = n & 255
                } else if (a === 1) {
                    n = i[e.charCodeAt(t)] << 10 | i[e.charCodeAt(t + 1)] << 4 | i[e.charCodeAt(t + 2)] >> 2;
                    s[l++] = n >> 8 & 255;
                    s[l++] = n & 255
                }
                return s
            }

            function h(e) {
                return n[e >> 18 & 63] + n[e >> 12 & 63] + n[e >> 6 & 63] + n[e & 63]
            }

            function d(e, t, r) {
                var n;
                var i = [];
                for (var o = t; o < r; o += 3) {
                    n = (e[o] << 16 & 16711680) + (e[o + 1] << 8 & 65280) + (e[o + 2] & 255);
                    i.push(h(n))
                }
                return i.join("")
            }

            function p(e) {
                var t;
                var r = e.length;
                var i = r % 3;
                var o = "";
                var a = [];
                var s = 16383;
                for (var f = 0, u = r - i; f < u; f += s) {
                    a.push(d(e, f, f + s > u ? u : f + s))
                }
                if (i === 1) {
                    t = e[r - 1];
                    o += n[t >> 2];
                    o += n[t << 4 & 63];
                    o += "=="
                } else if (i === 2) {
                    t = (e[r - 2] << 8) + e[r - 1];
                    o += n[t >> 10];
                    o += n[t >> 4 & 63];
                    o += n[t << 2 & 63];
                    o += "="
                }
                a.push(o);
                return a.join("")
            }
        }, {}],
        2: [function(e, t, r) {}, {}],
        3: [function(e, t, r) {
            "use strict";
            var n = e("base64-js");
            var i = e("ieee754");
            r.Buffer = f;
            r.SlowBuffer = m;
            r.INSPECT_MAX_BYTES = 50;
            var o = 2147483647;
            r.kMaxLength = o;
            f.TYPED_ARRAY_SUPPORT = a();
            if (!f.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
                console.error("This browser lacks typed array (Uint8Array) support which is required by " + "`buffer` v5.x. Use `buffer` v4.x if you require old browser support.")
            }

            function a() {
                try {
                    var e = new Uint8Array(1);
                    e.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42
                        }
                    };
                    return e.foo() === 42
                } catch (e) {
                    return false
                }
            }
            Object.defineProperty(f.prototype, "parent", {
                get: function() {
                    if (!(this instanceof f)) {
                        return undefined
                    }
                    return this.buffer
                }
            });
            Object.defineProperty(f.prototype, "offset", {
                get: function() {
                    if (!(this instanceof f)) {
                        return undefined
                    }
                    return this.byteOffset
                }
            });

            function s(e) {
                if (e > o) {
                    throw new RangeError("Invalid typed array length")
                }
                var t = new Uint8Array(e);
                t.__proto__ = f.prototype;
                return t
            }

            function f(e, t, r) {
                if (typeof e === "number") {
                    if (typeof t === "string") {
                        throw new Error("If encoding is specified then the first argument must be a string")
                    }
                    return h(e)
                }
                return u(e, t, r)
            }
            if (typeof Symbol !== "undefined" && Symbol.species && f[Symbol.species] === f) {
                Object.defineProperty(f, Symbol.species, {
                    value: null,
                    configurable: true,
                    enumerable: false,
                    writable: false
                })
            }
            f.poolSize = 8192;

            function u(e, t, r) {
                if (typeof e === "number") {
                    throw new TypeError('"value" argument must not be a number')
                }
                if (X(e) || e && X(e.buffer)) {
                    return g(e, t, r)
                }
                if (typeof e === "string") {
                    return d(e, t)
                }
                return y(e)
            }
            f.from = function(e, t, r) {
                return u(e, t, r)
            };
            f.prototype.__proto__ = Uint8Array.prototype;
            f.__proto__ = Uint8Array;

            function l(e) {
                if (typeof e !== "number") {
                    throw new TypeError('"size" argument must be of type number')
                } else if (e < 0) {
                    throw new RangeError('"size" argument must not be negative')
                }
            }

            function c(e, t, r) {
                l(e);
                if (e <= 0) {
                    return s(e)
                }
                if (t !== undefined) {
                    return typeof r === "string" ? s(e).fill(t, r) : s(e).fill(t)
                }
                return s(e)
            }
            f.alloc = function(e, t, r) {
                return c(e, t, r)
            };

            function h(e) {
                l(e);
                return s(e < 0 ? 0 : v(e) | 0)
            }
            f.allocUnsafe = function(e) {
                return h(e)
            };
            f.allocUnsafeSlow = function(e) {
                return h(e)
            };

            function d(e, t) {
                if (typeof t !== "string" || t === "") {
                    t = "utf8"
                }
                if (!f.isEncoding(t)) {
                    throw new TypeError("Unknown encoding: " + t)
                }
                var r = b(e, t) | 0;
                var n = s(r);
                var i = n.write(e, t);
                if (i !== r) {
                    n = n.slice(0, i)
                }
                return n
            }

            function p(e) {
                var t = e.length < 0 ? 0 : v(e.length) | 0;
                var r = s(t);
                for (var n = 0; n < t; n += 1) {
                    r[n] = e[n] & 255
                }
                return r
            }

            function g(e, t, r) {
                if (t < 0 || e.byteLength < t) {
                    throw new RangeError('"offset" is outside of buffer bounds')
                }
                if (e.byteLength < t + (r || 0)) {
                    throw new RangeError('"length" is outside of buffer bounds')
                }
                var n;
                if (t === undefined && r === undefined) {
                    n = new Uint8Array(e)
                } else if (r === undefined) {
                    n = new Uint8Array(e, t)
                } else {
                    n = new Uint8Array(e, t, r)
                }
                n.__proto__ = f.prototype;
                return n
            }

            function y(e) {
                if (f.isBuffer(e)) {
                    var t = v(e.length) | 0;
                    var r = s(t);
                    if (r.length === 0) {
                        return r
                    }
                    e.copy(r, 0, 0, t);
                    return r
                }
                if (e) {
                    if (ArrayBuffer.isView(e) || "length" in e) {
                        if (typeof e.length !== "number" || K(e.length)) {
                            return s(0)
                        }
                        return p(e)
                    }
                    if (e.type === "Buffer" && Array.isArray(e.data)) {
                        return p(e.data)
                    }
                }
                throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object.")
            }

            function v(e) {
                if (e >= o) {
                    throw new RangeError("Attempt to allocate Buffer larger than maximum " + "size: 0x" + o.toString(16) + " bytes")
                }
                return e | 0
            }

            function m(e) {
                if (+e != e) {
                    e = 0
                }
                return f.alloc(+e)
            }
            f.isBuffer = function e(t) {
                return t != null && t._isBuffer === true
            };
            f.compare = function e(t, r) {
                if (!f.isBuffer(t) || !f.isBuffer(r)) {
                    throw new TypeError("Arguments must be Buffers")
                }
                if (t === r) return 0;
                var n = t.length;
                var i = r.length;
                for (var o = 0, a = Math.min(n, i); o < a; ++o) {
                    if (t[o] !== r[o]) {
                        n = t[o];
                        i = r[o];
                        break
                    }
                }
                if (n < i) return -1;
                if (i < n) return 1;
                return 0
            };
            f.isEncoding = function e(t) {
                switch (String(t).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return true;
                    default:
                        return false
                }
            };
            f.concat = function e(t, r) {
                if (!Array.isArray(t)) {
                    throw new TypeError('"list" argument must be an Array of Buffers')
                }
                if (t.length === 0) {
                    return f.alloc(0)
                }
                var n;
                if (r === undefined) {
                    r = 0;
                    for (n = 0; n < t.length; ++n) {
                        r += t[n].length
                    }
                }
                var i = f.allocUnsafe(r);
                var o = 0;
                for (n = 0; n < t.length; ++n) {
                    var a = t[n];
                    if (ArrayBuffer.isView(a)) {
                        a = f.from(a)
                    }
                    if (!f.isBuffer(a)) {
                        throw new TypeError('"list" argument must be an Array of Buffers')
                    }
                    a.copy(i, o);
                    o += a.length
                }
                return i
            };

            function b(e, t) {
                if (f.isBuffer(e)) {
                    return e.length
                }
                if (ArrayBuffer.isView(e) || X(e)) {
                    return e.byteLength
                }
                if (typeof e !== "string") {
                    e = "" + e
                }
                var r = e.length;
                if (r === 0) return 0;
                var n = false;
                for (;;) {
                    switch (t) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return r;
                        case "utf8":
                        case "utf-8":
                        case undefined:
                            return Y(e).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return r * 2;
                        case "hex":
                            return r >>> 1;
                        case "base64":
                            return $(e).length;
                        default:
                            if (n) return Y(e).length;
                            t = ("" + t).toLowerCase();
                            n = true
                    }
                }
            }
            f.byteLength = b;

            function w(e, t, r) {
                var n = false;
                if (t === undefined || t < 0) {
                    t = 0
                }
                if (t > this.length) {
                    return ""
                }
                if (r === undefined || r > this.length) {
                    r = this.length
                }
                if (r <= 0) {
                    return ""
                }
                r >>>= 0;
                t >>>= 0;
                if (r <= t) {
                    return ""
                }
                if (!e) e = "utf8";
                while (true) {
                    switch (e) {
                        case "hex":
                            return O(this, t, r);
                        case "utf8":
                        case "utf-8":
                            return M(this, t, r);
                        case "ascii":
                            return j(this, t, r);
                        case "latin1":
                        case "binary":
                            return I(this, t, r);
                        case "base64":
                            return L(this, t, r);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return N(this, t, r);
                        default:
                            if (n) throw new TypeError("Unknown encoding: " + e);
                            e = (e + "").toLowerCase();
                            n = true
                    }
                }
            }
            f.prototype._isBuffer = true;

            function _(e, t, r) {
                var n = e[t];
                e[t] = e[r];
                e[r] = n
            }
            f.prototype.swap16 = function e() {
                var t = this.length;
                if (t % 2 !== 0) {
                    throw new RangeError("Buffer size must be a multiple of 16-bits")
                }
                for (var r = 0; r < t; r += 2) {
                    _(this, r, r + 1)
                }
                return this
            };
            f.prototype.swap32 = function e() {
                var t = this.length;
                if (t % 4 !== 0) {
                    throw new RangeError("Buffer size must be a multiple of 32-bits")
                }
                for (var r = 0; r < t; r += 4) {
                    _(this, r, r + 3);
                    _(this, r + 1, r + 2)
                }
                return this
            };
            f.prototype.swap64 = function e() {
                var t = this.length;
                if (t % 8 !== 0) {
                    throw new RangeError("Buffer size must be a multiple of 64-bits")
                }
                for (var r = 0; r < t; r += 8) {
                    _(this, r, r + 7);
                    _(this, r + 1, r + 6);
                    _(this, r + 2, r + 5);
                    _(this, r + 3, r + 4)
                }
                return this
            };
            f.prototype.toString = function e() {
                var t = this.length;
                if (t === 0) return "";
                if (arguments.length === 0) return M(this, 0, t);
                return w.apply(this, arguments)
            };
            f.prototype.toLocaleString = f.prototype.toString;
            f.prototype.equals = function e(t) {
                if (!f.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                if (this === t) return true;
                return f.compare(this, t) === 0
            };
            f.prototype.inspect = function e() {
                var t = "";
                var n = r.INSPECT_MAX_BYTES;
                if (this.length > 0) {
                    t = this.toString("hex", 0, n).match(/.{2}/g).join(" ");
                    if (this.length > n) t += " ... "
                }
                return "<Buffer " + t + ">"
            };
            f.prototype.compare = function e(t, r, n, i, o) {
                if (!f.isBuffer(t)) {
                    throw new TypeError("Argument must be a Buffer")
                }
                if (r === undefined) {
                    r = 0
                }
                if (n === undefined) {
                    n = t ? t.length : 0
                }
                if (i === undefined) {
                    i = 0
                }
                if (o === undefined) {
                    o = this.length
                }
                if (r < 0 || n > t.length || i < 0 || o > this.length) {
                    throw new RangeError("out of range index")
                }
                if (i >= o && r >= n) {
                    return 0
                }
                if (i >= o) {
                    return -1
                }
                if (r >= n) {
                    return 1
                }
                r >>>= 0;
                n >>>= 0;
                i >>>= 0;
                o >>>= 0;
                if (this === t) return 0;
                var a = o - i;
                var s = n - r;
                var u = Math.min(a, s);
                var l = this.slice(i, o);
                var c = t.slice(r, n);
                for (var h = 0; h < u; ++h) {
                    if (l[h] !== c[h]) {
                        a = l[h];
                        s = c[h];
                        break
                    }
                }
                if (a < s) return -1;
                if (s < a) return 1;
                return 0
            };

            function C(e, t, r, n, i) {
                if (e.length === 0) return -1;
                if (typeof r === "string") {
                    n = r;
                    r = 0
                } else if (r > 2147483647) {
                    r = 2147483647
                } else if (r < -2147483648) {
                    r = -2147483648
                }
                r = +r;
                if (K(r)) {
                    r = i ? 0 : e.length - 1
                }
                if (r < 0) r = e.length + r;
                if (r >= e.length) {
                    if (i) return -1;
                    else r = e.length - 1
                } else if (r < 0) {
                    if (i) r = 0;
                    else return -1
                }
                if (typeof t === "string") {
                    t = f.from(t, n)
                }
                if (f.isBuffer(t)) {
                    if (t.length === 0) {
                        return -1
                    }
                    return S(e, t, r, n, i)
                } else if (typeof t === "number") {
                    t = t & 255;
                    if (typeof Uint8Array.prototype.indexOf === "function") {
                        if (i) {
                            return Uint8Array.prototype.indexOf.call(e, t, r)
                        } else {
                            return Uint8Array.prototype.lastIndexOf.call(e, t, r)
                        }
                    }
                    return S(e, [t], r, n, i)
                }
                throw new TypeError("val must be string, number or Buffer")
            }

            function S(e, t, r, n, i) {
                var o = 1;
                var a = e.length;
                var s = t.length;
                if (n !== undefined) {
                    n = String(n).toLowerCase();
                    if (n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le") {
                        if (e.length < 2 || t.length < 2) {
                            return -1
                        }
                        o = 2;
                        a /= 2;
                        s /= 2;
                        r /= 2
                    }
                }

                function f(e, t) {
                    if (o === 1) {
                        return e[t]
                    } else {
                        return e.readUInt16BE(t * o)
                    }
                }
                var u;
                if (i) {
                    var l = -1;
                    for (u = r; u < a; u++) {
                        if (f(e, u) === f(t, l === -1 ? 0 : u - l)) {
                            if (l === -1) l = u;
                            if (u - l + 1 === s) return l * o
                        } else {
                            if (l !== -1) u -= u - l;
                            l = -1
                        }
                    }
                } else {
                    if (r + s > a) r = a - s;
                    for (u = r; u >= 0; u--) {
                        var c = true;
                        for (var h = 0; h < s; h++) {
                            if (f(e, u + h) !== f(t, h)) {
                                c = false;
                                break
                            }
                        }
                        if (c) return u
                    }
                }
                return -1
            }
            f.prototype.includes = function e(t, r, n) {
                return this.indexOf(t, r, n) !== -1
            };
            f.prototype.indexOf = function e(t, r, n) {
                return C(this, t, r, n, true)
            };
            f.prototype.lastIndexOf = function e(t, r, n) {
                return C(this, t, r, n, false)
            };

            function E(e, t, r, n) {
                r = Number(r) || 0;
                var i = e.length - r;
                if (!n) {
                    n = i
                } else {
                    n = Number(n);
                    if (n > i) {
                        n = i
                    }
                }
                var o = t.length;
                if (n > o / 2) {
                    n = o / 2
                }
                for (var a = 0; a < n; ++a) {
                    var s = parseInt(t.substr(a * 2, 2), 16);
                    if (K(s)) return a;
                    e[r + a] = s
                }
                return a
            }

            function x(e, t, r, n) {
                return G(Y(t, e.length - r), e, r, n)
            }

            function k(e, t, r, n) {
                return G(J(t), e, r, n)
            }

            function T(e, t, r, n) {
                return k(e, t, r, n)
            }

            function A(e, t, r, n) {
                return G($(t), e, r, n)
            }

            function R(e, t, r, n) {
                return G(Z(t, e.length - r), e, r, n)
            }
            f.prototype.write = function e(t, r, n, i) {
                if (r === undefined) {
                    i = "utf8";
                    n = this.length;
                    r = 0
                } else if (n === undefined && typeof r === "string") {
                    i = r;
                    n = this.length;
                    r = 0
                } else if (isFinite(r)) {
                    r = r >>> 0;
                    if (isFinite(n)) {
                        n = n >>> 0;
                        if (i === undefined) i = "utf8"
                    } else {
                        i = n;
                        n = undefined
                    }
                } else {
                    throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported")
                }
                var o = this.length - r;
                if (n === undefined || n > o) n = o;
                if (t.length > 0 && (n < 0 || r < 0) || r > this.length) {
                    throw new RangeError("Attempt to write outside buffer bounds")
                }
                if (!i) i = "utf8";
                var a = false;
                for (;;) {
                    switch (i) {
                        case "hex":
                            return E(this, t, r, n);
                        case "utf8":
                        case "utf-8":
                            return x(this, t, r, n);
                        case "ascii":
                            return k(this, t, r, n);
                        case "latin1":
                        case "binary":
                            return T(this, t, r, n);
                        case "base64":
                            return A(this, t, r, n);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return R(this, t, r, n);
                        default:
                            if (a) throw new TypeError("Unknown encoding: " + i);
                            i = ("" + i).toLowerCase();
                            a = true
                    }
                }
            };
            f.prototype.toJSON = function e() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            };

            function L(e, t, r) {
                if (t === 0 && r === e.length) {
                    return n.fromByteArray(e)
                } else {
                    return n.fromByteArray(e.slice(t, r))
                }
            }

            function M(e, t, r) {
                r = Math.min(e.length, r);
                var n = [];
                var i = t;
                while (i < r) {
                    var o = e[i];
                    var a = null;
                    var s = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
                    if (i + s <= r) {
                        var f, u, l, c;
                        switch (s) {
                            case 1:
                                if (o < 128) {
                                    a = o
                                }
                                break;
                            case 2:
                                f = e[i + 1];
                                if ((f & 192) === 128) {
                                    c = (o & 31) << 6 | f & 63;
                                    if (c > 127) {
                                        a = c
                                    }
                                }
                                break;
                            case 3:
                                f = e[i + 1];
                                u = e[i + 2];
                                if ((f & 192) === 128 && (u & 192) === 128) {
                                    c = (o & 15) << 12 | (f & 63) << 6 | u & 63;
                                    if (c > 2047 && (c < 55296 || c > 57343)) {
                                        a = c
                                    }
                                }
                                break;
                            case 4:
                                f = e[i + 1];
                                u = e[i + 2];
                                l = e[i + 3];
                                if ((f & 192) === 128 && (u & 192) === 128 && (l & 192) === 128) {
                                    c = (o & 15) << 18 | (f & 63) << 12 | (u & 63) << 6 | l & 63;
                                    if (c > 65535 && c < 1114112) {
                                        a = c
                                    }
                                }
                        }
                    }
                    if (a === null) {
                        a = 65533;
                        s = 1
                    } else if (a > 65535) {
                        a -= 65536;
                        n.push(a >>> 10 & 1023 | 55296);
                        a = 56320 | a & 1023
                    }
                    n.push(a);
                    i += s
                }
                return F(n)
            }
            var B = 4096;

            function F(e) {
                var t = e.length;
                if (t <= B) {
                    return String.fromCharCode.apply(String, e)
                }
                var r = "";
                var n = 0;
                while (n < t) {
                    r += String.fromCharCode.apply(String, e.slice(n, n += B))
                }
                return r
            }

            function j(e, t, r) {
                var n = "";
                r = Math.min(e.length, r);
                for (var i = t; i < r; ++i) {
                    n += String.fromCharCode(e[i] & 127)
                }
                return n
            }

            function I(e, t, r) {
                var n = "";
                r = Math.min(e.length, r);
                for (var i = t; i < r; ++i) {
                    n += String.fromCharCode(e[i])
                }
                return n
            }

            function O(e, t, r) {
                var n = e.length;
                if (!t || t < 0) t = 0;
                if (!r || r < 0 || r > n) r = n;
                var i = "";
                for (var o = t; o < r; ++o) {
                    i += H(e[o])
                }
                return i
            }

            function N(e, t, r) {
                var n = e.slice(t, r);
                var i = "";
                for (var o = 0; o < n.length; o += 2) {
                    i += String.fromCharCode(n[o] + n[o + 1] * 256)
                }
                return i
            }
            f.prototype.slice = function e(t, r) {
                var n = this.length;
                t = ~~t;
                r = r === undefined ? n : ~~r;
                if (t < 0) {
                    t += n;
                    if (t < 0) t = 0
                } else if (t > n) {
                    t = n
                }
                if (r < 0) {
                    r += n;
                    if (r < 0) r = 0
                } else if (r > n) {
                    r = n
                }
                if (r < t) r = t;
                var i = this.subarray(t, r);
                i.__proto__ = f.prototype;
                return i
            };

            function U(e, t, r) {
                if (e % 1 !== 0 || e < 0) throw new RangeError("offset is not uint");
                if (e + t > r) throw new RangeError("Trying to access beyond buffer length")
            }
            f.prototype.readUIntLE = function e(t, r, n) {
                t = t >>> 0;
                r = r >>> 0;
                if (!n) U(t, r, this.length);
                var i = this[t];
                var o = 1;
                var a = 0;
                while (++a < r && (o *= 256)) {
                    i += this[t + a] * o
                }
                return i
            };
            f.prototype.readUIntBE = function e(t, r, n) {
                t = t >>> 0;
                r = r >>> 0;
                if (!n) {
                    U(t, r, this.length)
                }
                var i = this[t + --r];
                var o = 1;
                while (r > 0 && (o *= 256)) {
                    i += this[t + --r] * o
                }
                return i
            };
            f.prototype.readUInt8 = function e(t, r) {
                t = t >>> 0;
                if (!r) U(t, 1, this.length);
                return this[t]
            };
            f.prototype.readUInt16LE = function e(t, r) {
                t = t >>> 0;
                if (!r) U(t, 2, this.length);
                return this[t] | this[t + 1] << 8
            };
            f.prototype.readUInt16BE = function e(t, r) {
                t = t >>> 0;
                if (!r) U(t, 2, this.length);
                return this[t] << 8 | this[t + 1]
            };
            f.prototype.readUInt32LE = function e(t, r) {
                t = t >>> 0;
                if (!r) U(t, 4, this.length);
                return (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + this[t + 3] * 16777216
            };
            f.prototype.readUInt32BE = function e(t, r) {
                t = t >>> 0;
                if (!r) U(t, 4, this.length);
                return this[t] * 16777216 + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
            };
            f.prototype.readIntLE = function e(t, r, n) {
                t = t >>> 0;
                r = r >>> 0;
                if (!n) U(t, r, this.length);
                var i = this[t];
                var o = 1;
                var a = 0;
                while (++a < r && (o *= 256)) {
                    i += this[t + a] * o
                }
                o *= 128;
                if (i >= o) i -= Math.pow(2, 8 * r);
                return i
            };
            f.prototype.readIntBE = function e(t, r, n) {
                t = t >>> 0;
                r = r >>> 0;
                if (!n) U(t, r, this.length);
                var i = r;
                var o = 1;
                var a = this[t + --i];
                while (i > 0 && (o *= 256)) {
                    a += this[t + --i] * o
                }
                o *= 128;
                if (a >= o) a -= Math.pow(2, 8 * r);
                return a
            };
            f.prototype.readInt8 = function e(t, r) {
                t = t >>> 0;
                if (!r) U(t, 1, this.length);
                if (!(this[t] & 128)) return this[t];
                return (255 - this[t] + 1) * -1
            };
            f.prototype.readInt16LE = function e(t, r) {
                t = t >>> 0;
                if (!r) U(t, 2, this.length);
                var n = this[t] | this[t + 1] << 8;
                return n & 32768 ? n | 4294901760 : n
            };
            f.prototype.readInt16BE = function e(t, r) {
                t = t >>> 0;
                if (!r) U(t, 2, this.length);
                var n = this[t + 1] | this[t] << 8;
                return n & 32768 ? n | 4294901760 : n
            };
            f.prototype.readInt32LE = function e(t, r) {
                t = t >>> 0;
                if (!r) U(t, 4, this.length);
                return this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
            };
            f.prototype.readInt32BE = function e(t, r) {
                t = t >>> 0;
                if (!r) U(t, 4, this.length);
                return this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
            };
            f.prototype.readFloatLE = function e(t, r) {
                t = t >>> 0;
                if (!r) U(t, 4, this.length);
                return i.read(this, t, true, 23, 4)
            };
            f.prototype.readFloatBE = function e(t, r) {
                t = t >>> 0;
                if (!r) U(t, 4, this.length);
                return i.read(this, t, false, 23, 4)
            };
            f.prototype.readDoubleLE = function e(t, r) {
                t = t >>> 0;
                if (!r) U(t, 8, this.length);
                return i.read(this, t, true, 52, 8)
            };
            f.prototype.readDoubleBE = function e(t, r) {
                t = t >>> 0;
                if (!r) U(t, 8, this.length);
                return i.read(this, t, false, 52, 8)
            };

            function P(e, t, r, n, i, o) {
                if (!f.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (t > i || t < o) throw new RangeError('"value" argument is out of bounds');
                if (r + n > e.length) throw new RangeError("Index out of range")
            }
            f.prototype.writeUIntLE = function e(t, r, n, i) {
                t = +t;
                r = r >>> 0;
                n = n >>> 0;
                if (!i) {
                    var o = Math.pow(2, 8 * n) - 1;
                    P(this, t, r, n, o, 0)
                }
                var a = 1;
                var s = 0;
                this[r] = t & 255;
                while (++s < n && (a *= 256)) {
                    this[r + s] = t / a & 255
                }
                return r + n
            };
            f.prototype.writeUIntBE = function e(t, r, n, i) {
                t = +t;
                r = r >>> 0;
                n = n >>> 0;
                if (!i) {
                    var o = Math.pow(2, 8 * n) - 1;
                    P(this, t, r, n, o, 0)
                }
                var a = n - 1;
                var s = 1;
                this[r + a] = t & 255;
                while (--a >= 0 && (s *= 256)) {
                    this[r + a] = t / s & 255
                }
                return r + n
            };
            f.prototype.writeUInt8 = function e(t, r, n) {
                t = +t;
                r = r >>> 0;
                if (!n) P(this, t, r, 1, 255, 0);
                this[r] = t & 255;
                return r + 1
            };
            f.prototype.writeUInt16LE = function e(t, r, n) {
                t = +t;
                r = r >>> 0;
                if (!n) P(this, t, r, 2, 65535, 0);
                this[r] = t & 255;
                this[r + 1] = t >>> 8;
                return r + 2
            };
            f.prototype.writeUInt16BE = function e(t, r, n) {
                t = +t;
                r = r >>> 0;
                if (!n) P(this, t, r, 2, 65535, 0);
                this[r] = t >>> 8;
                this[r + 1] = t & 255;
                return r + 2
            };
            f.prototype.writeUInt32LE = function e(t, r, n) {
                t = +t;
                r = r >>> 0;
                if (!n) P(this, t, r, 4, 4294967295, 0);
                this[r + 3] = t >>> 24;
                this[r + 2] = t >>> 16;
                this[r + 1] = t >>> 8;
                this[r] = t & 255;
                return r + 4
            };
            f.prototype.writeUInt32BE = function e(t, r, n) {
                t = +t;
                r = r >>> 0;
                if (!n) P(this, t, r, 4, 4294967295, 0);
                this[r] = t >>> 24;
                this[r + 1] = t >>> 16;
                this[r + 2] = t >>> 8;
                this[r + 3] = t & 255;
                return r + 4
            };
            f.prototype.writeIntLE = function e(t, r, n, i) {
                t = +t;
                r = r >>> 0;
                if (!i) {
                    var o = Math.pow(2, 8 * n - 1);
                    P(this, t, r, n, o - 1, -o)
                }
                var a = 0;
                var s = 1;
                var f = 0;
                this[r] = t & 255;
                while (++a < n && (s *= 256)) {
                    if (t < 0 && f === 0 && this[r + a - 1] !== 0) {
                        f = 1
                    }
                    this[r + a] = (t / s >> 0) - f & 255
                }
                return r + n
            };
            f.prototype.writeIntBE = function e(t, r, n, i) {
                t = +t;
                r = r >>> 0;
                if (!i) {
                    var o = Math.pow(2, 8 * n - 1);
                    P(this, t, r, n, o - 1, -o)
                }
                var a = n - 1;
                var s = 1;
                var f = 0;
                this[r + a] = t & 255;
                while (--a >= 0 && (s *= 256)) {
                    if (t < 0 && f === 0 && this[r + a + 1] !== 0) {
                        f = 1
                    }
                    this[r + a] = (t / s >> 0) - f & 255
                }
                return r + n
            };
            f.prototype.writeInt8 = function e(t, r, n) {
                t = +t;
                r = r >>> 0;
                if (!n) P(this, t, r, 1, 127, -128);
                if (t < 0) t = 255 + t + 1;
                this[r] = t & 255;
                return r + 1
            };
            f.prototype.writeInt16LE = function e(t, r, n) {
                t = +t;
                r = r >>> 0;
                if (!n) P(this, t, r, 2, 32767, -32768);
                this[r] = t & 255;
                this[r + 1] = t >>> 8;
                return r + 2
            };
            f.prototype.writeInt16BE = function e(t, r, n) {
                t = +t;
                r = r >>> 0;
                if (!n) P(this, t, r, 2, 32767, -32768);
                this[r] = t >>> 8;
                this[r + 1] = t & 255;
                return r + 2
            };
            f.prototype.writeInt32LE = function e(t, r, n) {
                t = +t;
                r = r >>> 0;
                if (!n) P(this, t, r, 4, 2147483647, -2147483648);
                this[r] = t & 255;
                this[r + 1] = t >>> 8;
                this[r + 2] = t >>> 16;
                this[r + 3] = t >>> 24;
                return r + 4
            };
            f.prototype.writeInt32BE = function e(t, r, n) {
                t = +t;
                r = r >>> 0;
                if (!n) P(this, t, r, 4, 2147483647, -2147483648);
                if (t < 0) t = 4294967295 + t + 1;
                this[r] = t >>> 24;
                this[r + 1] = t >>> 16;
                this[r + 2] = t >>> 8;
                this[r + 3] = t & 255;
                return r + 4
            };

            function D(e, t, r, n, i, o) {
                if (r + n > e.length) throw new RangeError("Index out of range");
                if (r < 0) throw new RangeError("Index out of range")
            }

            function W(e, t, r, n, o) {
                t = +t;
                r = r >>> 0;
                if (!o) {
                    D(e, t, r, 4, 3.4028234663852886e38, -3.4028234663852886e38)
                }
                i.write(e, t, r, n, 23, 4);
                return r + 4
            }
            f.prototype.writeFloatLE = function e(t, r, n) {
                return W(this, t, r, true, n)
            };
            f.prototype.writeFloatBE = function e(t, r, n) {
                return W(this, t, r, false, n)
            };

            function q(e, t, r, n, o) {
                t = +t;
                r = r >>> 0;
                if (!o) {
                    D(e, t, r, 8, 1.7976931348623157e308, -1.7976931348623157e308)
                }
                i.write(e, t, r, n, 52, 8);
                return r + 8
            }
            f.prototype.writeDoubleLE = function e(t, r, n) {
                return q(this, t, r, true, n)
            };
            f.prototype.writeDoubleBE = function e(t, r, n) {
                return q(this, t, r, false, n)
            };
            f.prototype.copy = function e(t, r, n, i) {
                if (!f.isBuffer(t)) throw new TypeError("argument should be a Buffer");
                if (!n) n = 0;
                if (!i && i !== 0) i = this.length;
                if (r >= t.length) r = t.length;
                if (!r) r = 0;
                if (i > 0 && i < n) i = n;
                if (i === n) return 0;
                if (t.length === 0 || this.length === 0) return 0;
                if (r < 0) {
                    throw new RangeError("targetStart out of bounds")
                }
                if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
                if (i < 0) throw new RangeError("sourceEnd out of bounds");
                if (i > this.length) i = this.length;
                if (t.length - r < i - n) {
                    i = t.length - r + n
                }
                var o = i - n;
                if (this === t && typeof Uint8Array.prototype.copyWithin === "function") {
                    this.copyWithin(r, n, i)
                } else if (this === t && n < r && r < i) {
                    for (var a = o - 1; a >= 0; --a) {
                        t[a + r] = this[a + n]
                    }
                } else {
                    Uint8Array.prototype.set.call(t, this.subarray(n, i), r)
                }
                return o
            };
            f.prototype.fill = function e(t, r, n, i) {
                if (typeof t === "string") {
                    if (typeof r === "string") {
                        i = r;
                        r = 0;
                        n = this.length
                    } else if (typeof n === "string") {
                        i = n;
                        n = this.length
                    }
                    if (i !== undefined && typeof i !== "string") {
                        throw new TypeError("encoding must be a string")
                    }
                    if (typeof i === "string" && !f.isEncoding(i)) {
                        throw new TypeError("Unknown encoding: " + i)
                    }
                    if (t.length === 1) {
                        var o = t.charCodeAt(0);
                        if (i === "utf8" && o < 128 || i === "latin1") {
                            t = o
                        }
                    }
                } else if (typeof t === "number") {
                    t = t & 255
                }
                if (r < 0 || this.length < r || this.length < n) {
                    throw new RangeError("Out of range index")
                }
                if (n <= r) {
                    return this
                }
                r = r >>> 0;
                n = n === undefined ? this.length : n >>> 0;
                if (!t) t = 0;
                var a;
                if (typeof t === "number") {
                    for (a = r; a < n; ++a) {
                        this[a] = t
                    }
                } else {
                    var s = f.isBuffer(t) ? t : new f(t, i);
                    var u = s.length;
                    if (u === 0) {
                        throw new TypeError('The value "' + t + '" is invalid for argument "value"')
                    }
                    for (a = 0; a < n - r; ++a) {
                        this[a + r] = s[a % u]
                    }
                }
                return this
            };
            var z = /[^+/0-9A-Za-z-_]/g;

            function V(e) {
                e = e.split("=")[0];
                e = e.trim().replace(z, "");
                if (e.length < 2) return "";
                while (e.length % 4 !== 0) {
                    e = e + "="
                }
                return e
            }

            function H(e) {
                if (e < 16) return "0" + e.toString(16);
                return e.toString(16)
            }

            function Y(e, t) {
                t = t || Infinity;
                var r;
                var n = e.length;
                var i = null;
                var o = [];
                for (var a = 0; a < n; ++a) {
                    r = e.charCodeAt(a);
                    if (r > 55295 && r < 57344) {
                        if (!i) {
                            if (r > 56319) {
                                if ((t -= 3) > -1) o.push(239, 191, 189);
                                continue
                            } else if (a + 1 === n) {
                                if ((t -= 3) > -1) o.push(239, 191, 189);
                                continue
                            }
                            i = r;
                            continue
                        }
                        if (r < 56320) {
                            if ((t -= 3) > -1) o.push(239, 191, 189);
                            i = r;
                            continue
                        }
                        r = (i - 55296 << 10 | r - 56320) + 65536
                    } else if (i) {
                        if ((t -= 3) > -1) o.push(239, 191, 189)
                    }
                    i = null;
                    if (r < 128) {
                        if ((t -= 1) < 0) break;
                        o.push(r)
                    } else if (r < 2048) {
                        if ((t -= 2) < 0) break;
                        o.push(r >> 6 | 192, r & 63 | 128)
                    } else if (r < 65536) {
                        if ((t -= 3) < 0) break;
                        o.push(r >> 12 | 224, r >> 6 & 63 | 128, r & 63 | 128)
                    } else if (r < 1114112) {
                        if ((t -= 4) < 0) break;
                        o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, r & 63 | 128)
                    } else {
                        throw new Error("Invalid code point")
                    }
                }
                return o
            }

            function J(e) {
                var t = [];
                for (var r = 0; r < e.length; ++r) {
                    t.push(e.charCodeAt(r) & 255)
                }
                return t
            }

            function Z(e, t) {
                var r, n, i;
                var o = [];
                for (var a = 0; a < e.length; ++a) {
                    if ((t -= 2) < 0) break;
                    r = e.charCodeAt(a);
                    n = r >> 8;
                    i = r % 256;
                    o.push(i);
                    o.push(n)
                }
                return o
            }

            function $(e) {
                return n.toByteArray(V(e))
            }

            function G(e, t, r, n) {
                for (var i = 0; i < n; ++i) {
                    if (i + r >= t.length || i >= e.length) break;
                    t[i + r] = e[i]
                }
                return i
            }

            function X(e) {
                return e instanceof ArrayBuffer || e != null && e.constructor != null && e.constructor.name === "ArrayBuffer" && typeof e.byteLength === "number"
            }

            function K(e) {
                return e !== e
            }
        }, {
            "base64-js": 1,
            ieee754: 9
        }],
        4: [function(e, t, r) {
            var n = Object.create || S;
            var i = Object.keys || E;
            var o = Function.prototype.bind || x;

            function a() {
                if (!this._events || !Object.prototype.hasOwnProperty.call(this, "_events")) {
                    this._events = n(null);
                    this._eventsCount = 0
                }
                this._maxListeners = this._maxListeners || undefined
            }
            t.exports = a;
            a.EventEmitter = a;
            a.prototype._events = undefined;
            a.prototype._maxListeners = undefined;
            var s = 10;
            var f;
            try {
                var u = {};
                if (Object.defineProperty) Object.defineProperty(u, "x", {
                    value: 0
                });
                f = u.x === 0
            } catch (e) {
                f = false
            }
            if (f) {
                Object.defineProperty(a, "defaultMaxListeners", {
                    enumerable: true,
                    get: function() {
                        return s
                    },
                    set: function(e) {
                        if (typeof e !== "number" || e < 0 || e !== e) throw new TypeError('"defaultMaxListeners" must be a positive number');
                        s = e
                    }
                })
            } else {
                a.defaultMaxListeners = s
            }
            a.prototype.setMaxListeners = function e(t) {
                if (typeof t !== "number" || t < 0 || isNaN(t)) throw new TypeError('"n" argument must be a positive number');
                this._maxListeners = t;
                return this
            };

            function l(e) {
                if (e._maxListeners === undefined) return a.defaultMaxListeners;
                return e._maxListeners
            }
            a.prototype.getMaxListeners = function e() {
                return l(this)
            };

            function c(e, t, r) {
                if (t) e.call(r);
                else {
                    var n = e.length;
                    var i = _(e, n);
                    for (var o = 0; o < n; ++o) i[o].call(r)
                }
            }

            function h(e, t, r, n) {
                if (t) e.call(r, n);
                else {
                    var i = e.length;
                    var o = _(e, i);
                    for (var a = 0; a < i; ++a) o[a].call(r, n)
                }
            }

            function d(e, t, r, n, i) {
                if (t) e.call(r, n, i);
                else {
                    var o = e.length;
                    var a = _(e, o);
                    for (var s = 0; s < o; ++s) a[s].call(r, n, i)
                }
            }

            function p(e, t, r, n, i, o) {
                if (t) e.call(r, n, i, o);
                else {
                    var a = e.length;
                    var s = _(e, a);
                    for (var f = 0; f < a; ++f) s[f].call(r, n, i, o)
                }
            }

            function g(e, t, r, n) {
                if (t) e.apply(r, n);
                else {
                    var i = e.length;
                    var o = _(e, i);
                    for (var a = 0; a < i; ++a) o[a].apply(r, n)
                }
            }
            a.prototype.emit = function e(t) {
                var r, n, i, o, a, s;
                var f = t === "error";
                s = this._events;
                if (s) f = f && s.error == null;
                else if (!f) return false;
                if (f) {
                    if (arguments.length > 1) r = arguments[1];
                    if (r instanceof Error) {
                        throw r
                    } else {
                        var u = new Error('Unhandled "error" event. (' + r + ")");
                        u.context = r;
                        throw u
                    }
                    return false
                }
                n = s[t];
                if (!n) return false;
                var l = typeof n === "function";
                i = arguments.length;
                switch (i) {
                    case 1:
                        c(n, l, this);
                        break;
                    case 2:
                        h(n, l, this, arguments[1]);
                        break;
                    case 3:
                        d(n, l, this, arguments[1], arguments[2]);
                        break;
                    case 4:
                        p(n, l, this, arguments[1], arguments[2], arguments[3]);
                        break;
                    default:
                        o = new Array(i - 1);
                        for (a = 1; a < i; a++) o[a - 1] = arguments[a];
                        g(n, l, this, o)
                }
                return true
            };

            function y(e, t, r, i) {
                var o;
                var a;
                var s;
                if (typeof r !== "function") throw new TypeError('"listener" argument must be a function');
                a = e._events;
                if (!a) {
                    a = e._events = n(null);
                    e._eventsCount = 0
                } else {
                    if (a.newListener) {
                        e.emit("newListener", t, r.listener ? r.listener : r);
                        a = e._events
                    }
                    s = a[t]
                }
                if (!s) {
                    s = a[t] = r;
                    ++e._eventsCount
                } else {
                    if (typeof s === "function") {
                        s = a[t] = i ? [r, s] : [s, r]
                    } else {
                        if (i) {
                            s.unshift(r)
                        } else {
                            s.push(r)
                        }
                    }
                    if (!s.warned) {
                        o = l(e);
                        if (o && o > 0 && s.length > o) {
                            s.warned = true;
                            var f = new Error("Possible EventEmitter memory leak detected. " + s.length + ' "' + String(t) + '" listeners ' + "added. Use emitter.setMaxListeners() to " + "increase limit.");
                            f.name = "MaxListenersExceededWarning";
                            f.emitter = e;
                            f.type = t;
                            f.count = s.length;
                            if (typeof console === "object" && console.warn) {
                                console.warn("%s: %s", f.name, f.message)
                            }
                        }
                    }
                }
                return e
            }
            a.prototype.addListener = function e(t, r) {
                return y(this, t, r, false)
            };
            a.prototype.on = a.prototype.addListener;
            a.prototype.prependListener = function e(t, r) {
                return y(this, t, r, true)
            };

            function v() {
                if (!this.fired) {
                    this.target.removeListener(this.type, this.wrapFn);
                    this.fired = true;
                    switch (arguments.length) {
                        case 0:
                            return this.listener.call(this.target);
                        case 1:
                            return this.listener.call(this.target, arguments[0]);
                        case 2:
                            return this.listener.call(this.target, arguments[0], arguments[1]);
                        case 3:
                            return this.listener.call(this.target, arguments[0], arguments[1], arguments[2]);
                        default:
                            var e = new Array(arguments.length);
                            for (var t = 0; t < e.length; ++t) e[t] = arguments[t];
                            this.listener.apply(this.target, e)
                    }
                }
            }

            function m(e, t, r) {
                var n = {
                    fired: false,
                    wrapFn: undefined,
                    target: e,
                    type: t,
                    listener: r
                };
                var i = o.call(v, n);
                i.listener = r;
                n.wrapFn = i;
                return i
            }
            a.prototype.once = function e(t, r) {
                if (typeof r !== "function") throw new TypeError('"listener" argument must be a function');
                this.on(t, m(this, t, r));
                return this
            };
            a.prototype.prependOnceListener = function e(t, r) {
                if (typeof r !== "function") throw new TypeError('"listener" argument must be a function');
                this.prependListener(t, m(this, t, r));
                return this
            };
            a.prototype.removeListener = function e(t, r) {
                var i, o, a, s, f;
                if (typeof r !== "function") throw new TypeError('"listener" argument must be a function');
                o = this._events;
                if (!o) return this;
                i = o[t];
                if (!i) return this;
                if (i === r || i.listener === r) {
                    if (--this._eventsCount === 0) this._events = n(null);
                    else {
                        delete o[t];
                        if (o.removeListener) this.emit("removeListener", t, i.listener || r)
                    }
                } else if (typeof i !== "function") {
                    a = -1;
                    for (s = i.length - 1; s >= 0; s--) {
                        if (i[s] === r || i[s].listener === r) {
                            f = i[s].listener;
                            a = s;
                            break
                        }
                    }
                    if (a < 0) return this;
                    if (a === 0) i.shift();
                    else w(i, a);
                    if (i.length === 1) o[t] = i[0];
                    if (o.removeListener) this.emit("removeListener", t, f || r)
                }
                return this
            };
            a.prototype.removeAllListeners = function e(t) {
                var r, o, a;
                o = this._events;
                if (!o) return this;
                if (!o.removeListener) {
                    if (arguments.length === 0) {
                        this._events = n(null);
                        this._eventsCount = 0
                    } else if (o[t]) {
                        if (--this._eventsCount === 0) this._events = n(null);
                        else delete o[t]
                    }
                    return this
                }
                if (arguments.length === 0) {
                    var s = i(o);
                    var f;
                    for (a = 0; a < s.length; ++a) {
                        f = s[a];
                        if (f === "removeListener") continue;
                        this.removeAllListeners(f)
                    }
                    this.removeAllListeners("removeListener");
                    this._events = n(null);
                    this._eventsCount = 0;
                    return this
                }
                r = o[t];
                if (typeof r === "function") {
                    this.removeListener(t, r)
                } else if (r) {
                    for (a = r.length - 1; a >= 0; a--) {
                        this.removeListener(t, r[a])
                    }
                }
                return this
            };
            a.prototype.listeners = function e(t) {
                var r;
                var n;
                var i = this._events;
                if (!i) n = [];
                else {
                    r = i[t];
                    if (!r) n = [];
                    else if (typeof r === "function") n = [r.listener || r];
                    else n = C(r)
                }
                return n
            };
            a.listenerCount = function(e, t) {
                if (typeof e.listenerCount === "function") {
                    return e.listenerCount(t)
                } else {
                    return b.call(e, t)
                }
            };
            a.prototype.listenerCount = b;

            function b(e) {
                var t = this._events;
                if (t) {
                    var r = t[e];
                    if (typeof r === "function") {
                        return 1
                    } else if (r) {
                        return r.length
                    }
                }
                return 0
            }
            a.prototype.eventNames = function e() {
                return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : []
            };

            function w(e, t) {
                for (var r = t, n = r + 1, i = e.length; n < i; r += 1, n += 1) e[r] = e[n];
                e.pop()
            }

            function _(e, t) {
                var r = new Array(t);
                for (var n = 0; n < t; ++n) r[n] = e[n];
                return r
            }

            function C(e) {
                var t = new Array(e.length);
                for (var r = 0; r < t.length; ++r) {
                    t[r] = e[r].listener || e[r]
                }
                return t
            }

            function S(e) {
                var t = function() {};
                t.prototype = e;
                return new t
            }

            function E(e) {
                var t = [];
                for (var r in e)
                    if (Object.prototype.hasOwnProperty.call(e, r)) {
                        t.push(r)
                    }
                return r
            }

            function x(e) {
                var t = this;
                return function() {
                    return t.apply(e, arguments)
                }
            }
        }, {}],
        5: [function(e, t, r) {
            (function(e) {
                function t(e) {
                    if (Array.isArray) {
                        return Array.isArray(e)
                    }
                    return y(e) === "[object Array]"
                }
                r.isArray = t;

                function n(e) {
                    return typeof e === "boolean"
                }
                r.isBoolean = n;

                function i(e) {
                    return e === null
                }
                r.isNull = i;

                function o(e) {
                    return e == null
                }
                r.isNullOrUndefined = o;

                function a(e) {
                    return typeof e === "number"
                }
                r.isNumber = a;

                function s(e) {
                    return typeof e === "string"
                }
                r.isString = s;

                function f(e) {
                    return typeof e === "symbol"
                }
                r.isSymbol = f;

                function u(e) {
                    return e === void 0
                }
                r.isUndefined = u;

                function l(e) {
                    return y(e) === "[object RegExp]"
                }
                r.isRegExp = l;

                function c(e) {
                    return typeof e === "object" && e !== null
                }
                r.isObject = c;

                function h(e) {
                    return y(e) === "[object Date]"
                }
                r.isDate = h;

                function d(e) {
                    return y(e) === "[object Error]" || e instanceof Error
                }
                r.isError = d;

                function p(e) {
                    return typeof e === "function"
                }
                r.isFunction = p;

                function g(e) {
                    return e === null || typeof e === "boolean" || typeof e === "number" || typeof e === "string" || typeof e === "symbol" || typeof e === "undefined"
                }
                r.isPrimitive = g;
                r.isBuffer = e.isBuffer;

                function y(e) {
                    return Object.prototype.toString.call(e)
                }
            }).call(this, {
                isBuffer: e("../../is-buffer/index.js")
            })
        }, {
            "../../is-buffer/index.js": 11
        }],
        6: [function(e, t, r) {
            (function(n) {
                r = t.exports = e("./debug");
                r.log = a;
                r.formatArgs = o;
                r.save = s;
                r.load = f;
                r.useColors = i;
                r.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : u();
                r.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"];

                function i() {
                    if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
                        return true
                    }
                    if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
                        return false
                    }
                    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)
                }
                r.formatters.j = function(e) {
                    try {
                        return JSON.stringify(e)
                    } catch (e) {
                        return "[UnexpectedJSONParseError]: " + e.message
                    }
                };

                function o(e) {
                    var t = this.useColors;
                    e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + r.humanize(this.diff);
                    if (!t) return;
                    var n = "color: " + this.color;
                    e.splice(1, 0, n, "color: inherit");
                    var i = 0;
                    var o = 0;
                    e[0].replace(/%[a-zA-Z%]/g, function(e) {
                        if ("%%" === e) return;
                        i++;
                        if ("%c" === e) {
                            o = i
                        }
                    });
                    e.splice(o, 0, n)
                }

                function a() {
                    return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
                }

                function s(e) {
                    try {
                        if (null == e) {
                            r.storage.removeItem("debug")
                        } else {
                            r.storage.debug = e
                        }
                    } catch (e) {}
                }

                function f() {
                    var e;
                    try {
                        e = r.storage.debug
                    } catch (e) {}
                    if (!e && typeof n !== "undefined" && "env" in n) {
                        e = n.env.DEBUG
                    }
                    return e
                }
                r.enable(f());

                function u() {
                    try {
                        return window.localStorage
                    } catch (e) {}
                }
            }).call(this, e("_process"))
        }, {
            "./debug": 7,
            _process: 15
        }],
        7: [function(e, t, r) {
            r = t.exports = i.debug = i["default"] = i;
            r.coerce = u;
            r.disable = s;
            r.enable = a;
            r.enabled = f;
            r.humanize = e("ms");
            r.instances = [];
            r.names = [];
            r.skips = [];
            r.formatters = {};

            function n(e) {
                var t = 0,
                    n;
                for (n in e) {
                    t = (t << 5) - t + e.charCodeAt(n);
                    t |= 0
                }
                return r.colors[Math.abs(t) % r.colors.length]
            }

            function i(e) {
                var t;

                function i() {
                    if (!i.enabled) return;
                    var e = i;
                    var n = +new Date;
                    var o = n - (t || n);
                    e.diff = o;
                    e.prev = t;
                    e.curr = n;
                    t = n;
                    var a = new Array(arguments.length);
                    for (var s = 0; s < a.length; s++) {
                        a[s] = arguments[s]
                    }
                    a[0] = r.coerce(a[0]);
                    if ("string" !== typeof a[0]) {
                        a.unshift("%O")
                    }
                    var f = 0;
                    a[0] = a[0].replace(/%([a-zA-Z%])/g, function(t, n) {
                        if (t === "%%") return t;
                        f++;
                        var i = r.formatters[n];
                        if ("function" === typeof i) {
                            var o = a[f];
                            t = i.call(e, o);
                            a.splice(f, 1);
                            f--
                        }
                        return t
                    });
                    r.formatArgs.call(e, a);
                    var u = i.log || r.log || console.log.bind(console);
                    u.apply(e, a)
                }
                i.namespace = e;
                i.enabled = r.enabled(e);
                i.useColors = r.useColors();
                i.color = n(e);
                i.destroy = o;
                if ("function" === typeof r.init) {
                    r.init(i)
                }
                r.instances.push(i);
                return i
            }

            function o() {
                var e = r.instances.indexOf(this);
                if (e !== -1) {
                    r.instances.splice(e, 1);
                    return true
                } else {
                    return false
                }
            }

            function a(e) {
                r.save(e);
                r.names = [];
                r.skips = [];
                var t;
                var n = (typeof e === "string" ? e : "").split(/[\s,]+/);
                var i = n.length;
                for (t = 0; t < i; t++) {
                    if (!n[t]) continue;
                    e = n[t].replace(/\*/g, ".*?");
                    if (e[0] === "-") {
                        r.skips.push(new RegExp("^" + e.substr(1) + "$"))
                    } else {
                        r.names.push(new RegExp("^" + e + "$"))
                    }
                }
                for (t = 0; t < r.instances.length; t++) {
                    var o = r.instances[t];
                    o.enabled = r.enabled(o.namespace)
                }
            }

            function s() {
                r.enable("")
            }

            function f(e) {
                if (e[e.length - 1] === "*") {
                    return true
                }
                var t, n;
                for (t = 0, n = r.skips.length; t < n; t++) {
                    if (r.skips[t].test(e)) {
                        return false
                    }
                }
                for (t = 0, n = r.names.length; t < n; t++) {
                    if (r.names[t].test(e)) {
                        return true
                    }
                }
                return false
            }

            function u(e) {
                if (e instanceof Error) return e.stack || e.message;
                return e
            }
        }, {
            ms: 13
        }],
        8: [function(e, t, r) {
            t.exports = function e() {
                if (typeof window === "undefined") return null;
                var t = {
                    RTCPeerConnection: window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
                    RTCSessionDescription: window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription,
                    RTCIceCandidate: window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate
                };
                if (!t.RTCPeerConnection) return null;
                return t
            }
        }, {}],
        9: [function(e, t, r) {
            r.read = function(e, t, r, n, i) {
                var o, a;
                var s = i * 8 - n - 1;
                var f = (1 << s) - 1;
                var u = f >> 1;
                var l = -7;
                var c = r ? i - 1 : 0;
                var h = r ? -1 : 1;
                var d = e[t + c];
                c += h;
                o = d & (1 << -l) - 1;
                d >>= -l;
                l += s;
                for (; l > 0; o = o * 256 + e[t + c], c += h, l -= 8) {}
                a = o & (1 << -l) - 1;
                o >>= -l;
                l += n;
                for (; l > 0; a = a * 256 + e[t + c], c += h, l -= 8) {}
                if (o === 0) {
                    o = 1 - u
                } else if (o === f) {
                    return a ? NaN : (d ? -1 : 1) * Infinity
                } else {
                    a = a + Math.pow(2, n);
                    o = o - u
                }
                return (d ? -1 : 1) * a * Math.pow(2, o - n)
            };
            r.write = function(e, t, r, n, i, o) {
                var a, s, f;
                var u = o * 8 - i - 1;
                var l = (1 << u) - 1;
                var c = l >> 1;
                var h = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
                var d = n ? 0 : o - 1;
                var p = n ? 1 : -1;
                var g = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
                t = Math.abs(t);
                if (isNaN(t) || t === Infinity) {
                    s = isNaN(t) ? 1 : 0;
                    a = l
                } else {
                    a = Math.floor(Math.log(t) / Math.LN2);
                    if (t * (f = Math.pow(2, -a)) < 1) {
                        a--;
                        f *= 2
                    }
                    if (a + c >= 1) {
                        t += h / f
                    } else {
                        t += h * Math.pow(2, 1 - c)
                    }
                    if (t * f >= 2) {
                        a++;
                        f /= 2
                    }
                    if (a + c >= l) {
                        s = 0;
                        a = l
                    } else if (a + c >= 1) {
                        s = (t * f - 1) * Math.pow(2, i);
                        a = a + c
                    } else {
                        s = t * Math.pow(2, c - 1) * Math.pow(2, i);
                        a = 0
                    }
                }
                for (; i >= 8; e[r + d] = s & 255, d += p, s /= 256, i -= 8) {}
                a = a << i | s;
                u += i;
                for (; u > 0; e[r + d] = a & 255, d += p, a /= 256, u -= 8) {}
                e[r + d - p] |= g * 128
            }
        }, {}],
        10: [function(e, t, r) {
            if (typeof Object.create === "function") {
                t.exports = function e(t, r) {
                    t.super_ = r;
                    t.prototype = Object.create(r.prototype, {
                        constructor: {
                            value: t,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    })
                }
            } else {
                t.exports = function e(t, r) {
                    t.super_ = r;
                    var n = function() {};
                    n.prototype = r.prototype;
                    t.prototype = new n;
                    t.prototype.constructor = t
                }
            }
        }, {}],
        11: [function(e, t, r) {
            t.exports = function(e) {
                return e != null && (n(e) || i(e) || !!e._isBuffer)
            };

            function n(e) {
                return !!e.constructor && typeof e.constructor.isBuffer === "function" && e.constructor.isBuffer(e)
            }

            function i(e) {
                return typeof e.readFloatLE === "function" && typeof e.slice === "function" && n(e.slice(0, 0))
            }
        }, {}],
        12: [function(e, t, r) {
            var n = {}.toString;
            t.exports = Array.isArray || function(e) {
                return n.call(e) == "[object Array]"
            }
        }, {}],
        13: [function(e, t, r) {
            var n = 1e3;
            var i = n * 60;
            var o = i * 60;
            var a = o * 24;
            var s = a * 365.25;
            t.exports = function(e, t) {
                t = t || {};
                var r = typeof e;
                if (r === "string" && e.length > 0) {
                    return f(e)
                } else if (r === "number" && isNaN(e) === false) {
                    return t.long ? l(e) : u(e)
                }
                throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
            };

            function f(e) {
                e = String(e);
                if (e.length > 100) {
                    return
                }
                var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                if (!t) {
                    return
                }
                var r = parseFloat(t[1]);
                var f = (t[2] || "ms").toLowerCase();
                switch (f) {
                    case "years":
                    case "year":
                    case "yrs":
                    case "yr":
                    case "y":
                        return r * s;
                    case "days":
                    case "day":
                    case "d":
                        return r * a;
                    case "hours":
                    case "hour":
                    case "hrs":
                    case "hr":
                    case "h":
                        return r * o;
                    case "minutes":
                    case "minute":
                    case "mins":
                    case "min":
                    case "m":
                        return r * i;
                    case "seconds":
                    case "second":
                    case "secs":
                    case "sec":
                    case "s":
                        return r * n;
                    case "milliseconds":
                    case "millisecond":
                    case "msecs":
                    case "msec":
                    case "ms":
                        return r;
                    default:
                        return undefined
                }
            }

            function u(e) {
                if (e >= a) {
                    return Math.round(e / a) + "d"
                }
                if (e >= o) {
                    return Math.round(e / o) + "h"
                }
                if (e >= i) {
                    return Math.round(e / i) + "m"
                }
                if (e >= n) {
                    return Math.round(e / n) + "s"
                }
                return e + "ms"
            }

            function l(e) {
                return c(e, a, "day") || c(e, o, "hour") || c(e, i, "minute") || c(e, n, "second") || e + " ms"
            }

            function c(e, t, r) {
                if (e < t) {
                    return
                }
                if (e < t * 1.5) {
                    return Math.floor(e / t) + " " + r
                }
                return Math.ceil(e / t) + " " + r + "s"
            }
        }, {}],
        14: [function(e, t, r) {
            (function(e) {
                "use strict";
                if (!e.version || e.version.indexOf("v0.") === 0 || e.version.indexOf("v1.") === 0 && e.version.indexOf("v1.8.") !== 0) {
                    t.exports = {
                        nextTick: r
                    }
                } else {
                    t.exports = e
                }

                function r(t, r, n, i) {
                    if (typeof t !== "function") {
                        throw new TypeError('"callback" argument must be a function')
                    }
                    var o = arguments.length;
                    var a, s;
                    switch (o) {
                        case 0:
                        case 1:
                            return e.nextTick(t);
                        case 2:
                            return e.nextTick(function e() {
                                t.call(null, r)
                            });
                        case 3:
                            return e.nextTick(function e() {
                                t.call(null, r, n)
                            });
                        case 4:
                            return e.nextTick(function e() {
                                t.call(null, r, n, i)
                            });
                        default:
                            a = new Array(o - 1);
                            s = 0;
                            while (s < a.length) {
                                a[s++] = arguments[s]
                            }
                            return e.nextTick(function e() {
                                t.apply(null, a)
                            })
                    }
                }
            }).call(this, e("_process"))
        }, {
            _process: 15
        }],
        15: [function(e, t, r) {
            var n = t.exports = {};
            var i;
            var o;

            function a() {
                throw new Error("setTimeout has not been defined")
            }

            function s() {
                throw new Error("clearTimeout has not been defined")
            }(function() {
                try {
                    if (typeof setTimeout === "function") {
                        i = setTimeout
                    } else {
                        i = a
                    }
                } catch (e) {
                    i = a
                }
                try {
                    if (typeof clearTimeout === "function") {
                        o = clearTimeout
                    } else {
                        o = s
                    }
                } catch (e) {
                    o = s
                }
            })();

            function f(e) {
                if (i === setTimeout) {
                    return setTimeout(e, 0)
                }
                if ((i === a || !i) && setTimeout) {
                    i = setTimeout;
                    return setTimeout(e, 0)
                }
                try {
                    return i(e, 0)
                } catch (t) {
                    try {
                        return i.call(null, e, 0)
                    } catch (t) {
                        return i.call(this, e, 0)
                    }
                }
            }

            function u(e) {
                if (o === clearTimeout) {
                    return clearTimeout(e)
                }
                if ((o === s || !o) && clearTimeout) {
                    o = clearTimeout;
                    return clearTimeout(e)
                }
                try {
                    return o(e)
                } catch (t) {
                    try {
                        return o.call(null, e)
                    } catch (t) {
                        return o.call(this, e)
                    }
                }
            }
            var l = [];
            var c = false;
            var h;
            var d = -1;

            function p() {
                if (!c || !h) {
                    return
                }
                c = false;
                if (h.length) {
                    l = h.concat(l)
                } else {
                    d = -1
                }
                if (l.length) {
                    g()
                }
            }

            function g() {
                if (c) {
                    return
                }
                var e = f(p);
                c = true;
                var t = l.length;
                while (t) {
                    h = l;
                    l = [];
                    while (++d < t) {
                        if (h) {
                            h[d].run()
                        }
                    }
                    d = -1;
                    t = l.length
                }
                h = null;
                c = false;
                u(e)
            }
            n.nextTick = function(e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1) {
                    for (var r = 1; r < arguments.length; r++) {
                        t[r - 1] = arguments[r]
                    }
                }
                l.push(new y(e, t));
                if (l.length === 1 && !c) {
                    f(g)
                }
            };

            function y(e, t) {
                this.fun = e;
                this.array = t
            }
            y.prototype.run = function() {
                this.fun.apply(null, this.array)
            };
            n.title = "browser";
            n.browser = true;
            n.env = {};
            n.argv = [];
            n.version = "";
            n.versions = {};

            function v() {}
            n.on = v;
            n.addListener = v;
            n.once = v;
            n.off = v;
            n.removeListener = v;
            n.removeAllListeners = v;
            n.emit = v;
            n.prependListener = v;
            n.prependOnceListener = v;
            n.listeners = function(e) {
                return []
            };
            n.binding = function(e) {
                throw new Error("process.binding is not supported")
            };
            n.cwd = function() {
                return "/"
            };
            n.chdir = function(e) {
                throw new Error("process.chdir is not supported")
            };
            n.umask = function() {
                return 0
            }
        }, {}],
        16: [function(e, t, r) {
            (function(r, n) {
                "use strict";

                function i() {
                    throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11")
                }
                var o = e("safe-buffer").Buffer;
                var a = n.crypto || n.msCrypto;
                if (a && a.getRandomValues) {
                    t.exports = s
                } else {
                    t.exports = i
                }

                function s(e, t) {
                    if (e > 65536) throw new Error("requested too many random bytes");
                    var i = new n.Uint8Array(e);
                    if (e > 0) {
                        a.getRandomValues(i)
                    }
                    var s = o.from(i.buffer);
                    if (typeof t === "function") {
                        return r.nextTick(function() {
                            t(null, s)
                        })
                    }
                    return s
                }
            }).call(this, e("_process"), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {
            _process: 15,
            "safe-buffer": 26
        }],
        17: [function(e, t, r) {
            "use strict";
            var n = e("process-nextick-args").nextTick;
            var i = Object.keys || function(e) {
                var t = [];
                for (var r in e) {
                    t.push(r)
                }
                return t
            };
            t.exports = c;
            var o = e("core-util-is");
            o.inherits = e("inherits");
            var a = e("./_stream_readable");
            var s = e("./_stream_writable");
            o.inherits(c, a);
            var f = i(s.prototype);
            for (var u = 0; u < f.length; u++) {
                var l = f[u];
                if (!c.prototype[l]) c.prototype[l] = s.prototype[l]
            }

            function c(e) {
                if (!(this instanceof c)) return new c(e);
                a.call(this, e);
                s.call(this, e);
                if (e && e.readable === false) this.readable = false;
                if (e && e.writable === false) this.writable = false;
                this.allowHalfOpen = true;
                if (e && e.allowHalfOpen === false) this.allowHalfOpen = false;
                this.once("end", h)
            }

            function h() {
                if (this.allowHalfOpen || this._writableState.ended) return;
                n(d, this)
            }

            function d(e) {
                e.end()
            }
            Object.defineProperty(c.prototype, "destroyed", {
                get: function() {
                    if (this._readableState === undefined || this._writableState === undefined) {
                        return false
                    }
                    return this._readableState.destroyed && this._writableState.destroyed
                },
                set: function(e) {
                    if (this._readableState === undefined || this._writableState === undefined) {
                        return
                    }
                    this._readableState.destroyed = e;
                    this._writableState.destroyed = e
                }
            });
            c.prototype._destroy = function(e, t) {
                this.push(null);
                this.end();
                n(t, e)
            };

            function p(e, t) {
                for (var r = 0, n = e.length; r < n; r++) {
                    t(e[r], r)
                }
            }
        }, {
            "./_stream_readable": 19,
            "./_stream_writable": 21,
            "core-util-is": 5,
            inherits: 10,
            "process-nextick-args": 14
        }],
        18: [function(e, t, r) {
            "use strict";
            t.exports = o;
            var n = e("./_stream_transform");
            var i = e("core-util-is");
            i.inherits = e("inherits");
            i.inherits(o, n);

            function o(e) {
                if (!(this instanceof o)) return new o(e);
                n.call(this, e)
            }
            o.prototype._transform = function(e, t, r) {
                r(null, e)
            }
        }, {
            "./_stream_transform": 20,
            "core-util-is": 5,
            inherits: 10
        }],
        19: [function(e, t, r) {
            (function(r, n) {
                "use strict";
                var i = e("process-nextick-args").nextTick;
                t.exports = S;
                var o = e("isarray");
                var a;
                S.ReadableState = C;
                var s = e("events").EventEmitter;
                var f = function(e, t) {
                    return e.listeners(t).length
                };
                var u = e("./internal/streams/stream");
                var l = e("safe-buffer").Buffer;
                var c = n.Uint8Array || function() {};

                function h(e) {
                    return l.from(e)
                }

                function d(e) {
                    return l.isBuffer(e) || e instanceof c
                }
                var p = e("core-util-is");
                p.inherits = e("inherits");
                var g = e("util");
                var y = void 0;
                if (g && g.debuglog) {
                    y = g.debuglog("stream")
                } else {
                    y = function() {}
                }
                var v = e("./internal/streams/BufferList");
                var m = e("./internal/streams/destroy");
                var b;
                p.inherits(S, u);
                var w = ["error", "close", "destroy", "pause", "resume"];

                function _(e, t, r) {
                    if (typeof e.prependListener === "function") return e.prependListener(t, r);
                    if (!e._events || !e._events[t]) e.on(t, r);
                    else if (o(e._events[t])) e._events[t].unshift(r);
                    else e._events[t] = [r, e._events[t]]
                }

                function C(t, r) {
                    a = a || e("./_stream_duplex");
                    t = t || {};
                    var n = r instanceof a;
                    this.objectMode = !!t.objectMode;
                    if (n) this.objectMode = this.objectMode || !!t.readableObjectMode;
                    var i = t.highWaterMark;
                    var o = t.readableHighWaterMark;
                    var s = this.objectMode ? 16 : 16 * 1024;
                    if (i || i === 0) this.highWaterMark = i;
                    else if (n && (o || o === 0)) this.highWaterMark = o;
                    else this.highWaterMark = s;
                    this.highWaterMark = Math.floor(this.highWaterMark);
                    this.buffer = new v;
                    this.length = 0;
                    this.pipes = null;
                    this.pipesCount = 0;
                    this.flowing = null;
                    this.ended = false;
                    this.endEmitted = false;
                    this.reading = false;
                    this.sync = true;
                    this.needReadable = false;
                    this.emittedReadable = false;
                    this.readableListening = false;
                    this.resumeScheduled = false;
                    this.destroyed = false;
                    this.defaultEncoding = t.defaultEncoding || "utf8";
                    this.awaitDrain = 0;
                    this.readingMore = false;
                    this.decoder = null;
                    this.encoding = null;
                    if (t.encoding) {
                        if (!b) b = e("string_decoder/").StringDecoder;
                        this.decoder = new b(t.encoding);
                        this.encoding = t.encoding
                    }
                }

                function S(t) {
                    a = a || e("./_stream_duplex");
                    if (!(this instanceof S)) return new S(t);
                    this._readableState = new C(t, this);
                    this.readable = true;
                    if (t) {
                        if (typeof t.read === "function") this._read = t.read;
                        if (typeof t.destroy === "function") this._destroy = t.destroy
                    }
                    u.call(this)
                }
                Object.defineProperty(S.prototype, "destroyed", {
                    get: function() {
                        if (this._readableState === undefined) {
                            return false
                        }
                        return this._readableState.destroyed
                    },
                    set: function(e) {
                        if (!this._readableState) {
                            return
                        }
                        this._readableState.destroyed = e
                    }
                });
                S.prototype.destroy = m.destroy;
                S.prototype._undestroy = m.undestroy;
                S.prototype._destroy = function(e, t) {
                    this.push(null);
                    t(e)
                };
                S.prototype.push = function(e, t) {
                    var r = this._readableState;
                    var n;
                    if (!r.objectMode) {
                        if (typeof e === "string") {
                            t = t || r.defaultEncoding;
                            if (t !== r.encoding) {
                                e = l.from(e, t);
                                t = ""
                            }
                            n = true
                        }
                    } else {
                        n = true
                    }
                    return E(this, e, t, false, n)
                };
                S.prototype.unshift = function(e) {
                    return E(this, e, null, true, false)
                };

                function E(e, t, r, n, i) {
                    var o = e._readableState;
                    if (t === null) {
                        o.reading = false;
                        M(e, o)
                    } else {
                        var a;
                        if (!i) a = k(o, t);
                        if (a) {
                            e.emit("error", a)
                        } else if (o.objectMode || t && t.length > 0) {
                            if (typeof t !== "string" && !o.objectMode && Object.getPrototypeOf(t) !== l.prototype) {
                                t = h(t)
                            }
                            if (n) {
                                if (o.endEmitted) e.emit("error", new Error("stream.unshift() after end event"));
                                else x(e, o, t, true)
                            } else if (o.ended) {
                                e.emit("error", new Error("stream.push() after EOF"))
                            } else {
                                o.reading = false;
                                if (o.decoder && !r) {
                                    t = o.decoder.write(t);
                                    if (o.objectMode || t.length !== 0) x(e, o, t, false);
                                    else j(e, o)
                                } else {
                                    x(e, o, t, false)
                                }
                            }
                        } else if (!n) {
                            o.reading = false
                        }
                    }
                    return T(o)
                }

                function x(e, t, r, n) {
                    if (t.flowing && t.length === 0 && !t.sync) {
                        e.emit("data", r);
                        e.read(0)
                    } else {
                        t.length += t.objectMode ? 1 : r.length;
                        if (n) t.buffer.unshift(r);
                        else t.buffer.push(r);
                        if (t.needReadable) B(e)
                    }
                    j(e, t)
                }

                function k(e, t) {
                    var r;
                    if (!d(t) && typeof t !== "string" && t !== undefined && !e.objectMode) {
                        r = new TypeError("Invalid non-string/buffer chunk")
                    }
                    return r
                }

                function T(e) {
                    return !e.ended && (e.needReadable || e.length < e.highWaterMark || e.length === 0)
                }
                S.prototype.isPaused = function() {
                    return this._readableState.flowing === false
                };
                S.prototype.setEncoding = function(t) {
                    if (!b) b = e("string_decoder/").StringDecoder;
                    this._readableState.decoder = new b(t);
                    this._readableState.encoding = t;
                    return this
                };
                var A = 8388608;

                function R(e) {
                    if (e >= A) {
                        e = A
                    } else {
                        e--;
                        e |= e >>> 1;
                        e |= e >>> 2;
                        e |= e >>> 4;
                        e |= e >>> 8;
                        e |= e >>> 16;
                        e++
                    }
                    return e
                }

                function L(e, t) {
                    if (e <= 0 || t.length === 0 && t.ended) return 0;
                    if (t.objectMode) return 1;
                    if (e !== e) {
                        if (t.flowing && t.length) return t.buffer.head.data.length;
                        else return t.length
                    }
                    if (e > t.highWaterMark) t.highWaterMark = R(e);
                    if (e <= t.length) return e;
                    if (!t.ended) {
                        t.needReadable = true;
                        return 0
                    }
                    return t.length
                }
                S.prototype.read = function(e) {
                    y("read", e);
                    e = parseInt(e, 10);
                    var t = this._readableState;
                    var r = e;
                    if (e !== 0) t.emittedReadable = false;
                    if (e === 0 && t.needReadable && (t.length >= t.highWaterMark || t.ended)) {
                        y("read: emitReadable", t.length, t.ended);
                        if (t.length === 0 && t.ended) H(this);
                        else B(this);
                        return null
                    }
                    e = L(e, t);
                    if (e === 0 && t.ended) {
                        if (t.length === 0) H(this);
                        return null
                    }
                    var n = t.needReadable;
                    y("need readable", n);
                    if (t.length === 0 || t.length - e < t.highWaterMark) {
                        n = true;
                        y("length less than watermark", n)
                    }
                    if (t.ended || t.reading) {
                        n = false;
                        y("reading or ended", n)
                    } else if (n) {
                        y("do read");
                        t.reading = true;
                        t.sync = true;
                        if (t.length === 0) t.needReadable = true;
                        this._read(t.highWaterMark);
                        t.sync = false;
                        if (!t.reading) e = L(r, t)
                    }
                    var i;
                    if (e > 0) i = W(e, t);
                    else i = null;
                    if (i === null) {
                        t.needReadable = true;
                        e = 0
                    } else {
                        t.length -= e
                    }
                    if (t.length === 0) {
                        if (!t.ended) t.needReadable = true;
                        if (r !== e && t.ended) H(this)
                    }
                    if (i !== null) this.emit("data", i);
                    return i
                };

                function M(e, t) {
                    if (t.ended) return;
                    if (t.decoder) {
                        var r = t.decoder.end();
                        if (r && r.length) {
                            t.buffer.push(r);
                            t.length += t.objectMode ? 1 : r.length
                        }
                    }
                    t.ended = true;
                    B(e)
                }

                function B(e) {
                    var t = e._readableState;
                    t.needReadable = false;
                    if (!t.emittedReadable) {
                        y("emitReadable", t.flowing);
                        t.emittedReadable = true;
                        if (t.sync) i(F, e);
                        else F(e)
                    }
                }

                function F(e) {
                    y("emit readable");
                    e.emit("readable");
                    D(e)
                }

                function j(e, t) {
                    if (!t.readingMore) {
                        t.readingMore = true;
                        i(I, e, t)
                    }
                }

                function I(e, t) {
                    var r = t.length;
                    while (!t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark) {
                        y("maybeReadMore read 0");
                        e.read(0);
                        if (r === t.length) break;
                        else r = t.length
                    }
                    t.readingMore = false
                }
                S.prototype._read = function(e) {
                    this.emit("error", new Error("_read() is not implemented"))
                };
                S.prototype.pipe = function(e, t) {
                    var n = this;
                    var o = this._readableState;
                    switch (o.pipesCount) {
                        case 0:
                            o.pipes = e;
                            break;
                        case 1:
                            o.pipes = [o.pipes, e];
                            break;
                        default:
                            o.pipes.push(e);
                            break
                    }
                    o.pipesCount += 1;
                    y("pipe count=%d opts=%j", o.pipesCount, t);
                    var a = (!t || t.end !== false) && e !== r.stdout && e !== r.stderr;
                    var s = a ? l : w;
                    if (o.endEmitted) i(s);
                    else n.once("end", s);
                    e.on("unpipe", u);

                    function u(e, t) {
                        y("onunpipe");
                        if (e === n) {
                            if (t && t.hasUnpiped === false) {
                                t.hasUnpiped = true;
                                d()
                            }
                        }
                    }

                    function l() {
                        y("onend");
                        e.end()
                    }
                    var c = O(n);
                    e.on("drain", c);
                    var h = false;

                    function d() {
                        y("cleanup");
                        e.removeListener("close", m);
                        e.removeListener("finish", b);
                        e.removeListener("drain", c);
                        e.removeListener("error", v);
                        e.removeListener("unpipe", u);
                        n.removeListener("end", l);
                        n.removeListener("end", w);
                        n.removeListener("data", g);
                        h = true;
                        if (o.awaitDrain && (!e._writableState || e._writableState.needDrain)) c()
                    }
                    var p = false;
                    n.on("data", g);

                    function g(t) {
                        y("ondata");
                        p = false;
                        var r = e.write(t);
                        if (false === r && !p) {
                            if ((o.pipesCount === 1 && o.pipes === e || o.pipesCount > 1 && Z(o.pipes, e) !== -1) && !h) {
                                y("false write response, pause", n._readableState.awaitDrain);
                                n._readableState.awaitDrain++;
                                p = true
                            }
                            n.pause()
                        }
                    }

                    function v(t) {
                        y("onerror", t);
                        w();
                        e.removeListener("error", v);
                        if (f(e, "error") === 0) e.emit("error", t)
                    }
                    _(e, "error", v);

                    function m() {
                        e.removeListener("finish", b);
                        w()
                    }
                    e.once("close", m);

                    function b() {
                        y("onfinish");
                        e.removeListener("close", m);
                        w()
                    }
                    e.once("finish", b);

                    function w() {
                        y("unpipe");
                        n.unpipe(e)
                    }
                    e.emit("pipe", n);
                    if (!o.flowing) {
                        y("pipe resume");
                        n.resume()
                    }
                    return e
                };

                function O(e) {
                    return function() {
                        var t = e._readableState;
                        y("pipeOnDrain", t.awaitDrain);
                        if (t.awaitDrain) t.awaitDrain--;
                        if (t.awaitDrain === 0 && f(e, "data")) {
                            t.flowing = true;
                            D(e)
                        }
                    }
                }
                S.prototype.unpipe = function(e) {
                    var t = this._readableState;
                    var r = {
                        hasUnpiped: false
                    };
                    if (t.pipesCount === 0) return this;
                    if (t.pipesCount === 1) {
                        if (e && e !== t.pipes) return this;
                        if (!e) e = t.pipes;
                        t.pipes = null;
                        t.pipesCount = 0;
                        t.flowing = false;
                        if (e) e.emit("unpipe", this, r);
                        return this
                    }
                    if (!e) {
                        var n = t.pipes;
                        var i = t.pipesCount;
                        t.pipes = null;
                        t.pipesCount = 0;
                        t.flowing = false;
                        for (var o = 0; o < i; o++) {
                            n[o].emit("unpipe", this, r)
                        }
                        return this
                    }
                    var a = Z(t.pipes, e);
                    if (a === -1) return this;
                    t.pipes.splice(a, 1);
                    t.pipesCount -= 1;
                    if (t.pipesCount === 1) t.pipes = t.pipes[0];
                    e.emit("unpipe", this, r);
                    return this
                };
                S.prototype.on = function(e, t) {
                    var r = u.prototype.on.call(this, e, t);
                    if (e === "data") {
                        if (this._readableState.flowing !== false) this.resume()
                    } else if (e === "readable") {
                        var n = this._readableState;
                        if (!n.endEmitted && !n.readableListening) {
                            n.readableListening = n.needReadable = true;
                            n.emittedReadable = false;
                            if (!n.reading) {
                                i(N, this)
                            } else if (n.length) {
                                B(this)
                            }
                        }
                    }
                    return r
                };
                S.prototype.addListener = S.prototype.on;

                function N(e) {
                    y("readable nexttick read 0");
                    e.read(0)
                }
                S.prototype.resume = function() {
                    var e = this._readableState;
                    if (!e.flowing) {
                        y("resume");
                        e.flowing = true;
                        U(this, e)
                    }
                    return this
                };

                function U(e, t) {
                    if (!t.resumeScheduled) {
                        t.resumeScheduled = true;
                        i(P, e, t)
                    }
                }

                function P(e, t) {
                    if (!t.reading) {
                        y("resume read 0");
                        e.read(0)
                    }
                    t.resumeScheduled = false;
                    t.awaitDrain = 0;
                    e.emit("resume");
                    D(e);
                    if (t.flowing && !t.reading) e.read(0)
                }
                S.prototype.pause = function() {
                    y("call pause flowing=%j", this._readableState.flowing);
                    if (false !== this._readableState.flowing) {
                        y("pause");
                        this._readableState.flowing = false;
                        this.emit("pause")
                    }
                    return this
                };

                function D(e) {
                    var t = e._readableState;
                    y("flow", t.flowing);
                    while (t.flowing && e.read() !== null) {}
                }
                S.prototype.wrap = function(e) {
                    var t = this;
                    var r = this._readableState;
                    var n = false;
                    e.on("end", function() {
                        y("wrapped end");
                        if (r.decoder && !r.ended) {
                            var e = r.decoder.end();
                            if (e && e.length) t.push(e)
                        }
                        t.push(null)
                    });
                    e.on("data", function(i) {
                        y("wrapped data");
                        if (r.decoder) i = r.decoder.write(i);
                        if (r.objectMode && (i === null || i === undefined)) return;
                        else if (!r.objectMode && (!i || !i.length)) return;
                        var o = t.push(i);
                        if (!o) {
                            n = true;
                            e.pause()
                        }
                    });
                    for (var i in e) {
                        if (this[i] === undefined && typeof e[i] === "function") {
                            this[i] = function(t) {
                                return function() {
                                    return e[t].apply(e, arguments)
                                }
                            }(i)
                        }
                    }
                    for (var o = 0; o < w.length; o++) {
                        e.on(w[o], this.emit.bind(this, w[o]))
                    }
                    this._read = function(t) {
                        y("wrapped _read", t);
                        if (n) {
                            n = false;
                            e.resume()
                        }
                    };
                    return this
                };
                S._fromList = W;

                function W(e, t) {
                    if (t.length === 0) return null;
                    var r;
                    if (t.objectMode) r = t.buffer.shift();
                    else if (!e || e >= t.length) {
                        if (t.decoder) r = t.buffer.join("");
                        else if (t.buffer.length === 1) r = t.buffer.head.data;
                        else r = t.buffer.concat(t.length);
                        t.buffer.clear()
                    } else {
                        r = q(e, t.buffer, t.decoder)
                    }
                    return r
                }

                function q(e, t, r) {
                    var n;
                    if (e < t.head.data.length) {
                        n = t.head.data.slice(0, e);
                        t.head.data = t.head.data.slice(e)
                    } else if (e === t.head.data.length) {
                        n = t.shift()
                    } else {
                        n = r ? z(e, t) : V(e, t)
                    }
                    return n
                }

                function z(e, t) {
                    var r = t.head;
                    var n = 1;
                    var i = r.data;
                    e -= i.length;
                    while (r = r.next) {
                        var o = r.data;
                        var a = e > o.length ? o.length : e;
                        if (a === o.length) i += o;
                        else i += o.slice(0, e);
                        e -= a;
                        if (e === 0) {
                            if (a === o.length) {
                                ++n;
                                if (r.next) t.head = r.next;
                                else t.head = t.tail = null
                            } else {
                                t.head = r;
                                r.data = o.slice(a)
                            }
                            break
                        }++n
                    }
                    t.length -= n;
                    return i
                }

                function V(e, t) {
                    var r = l.allocUnsafe(e);
                    var n = t.head;
                    var i = 1;
                    n.data.copy(r);
                    e -= n.data.length;
                    while (n = n.next) {
                        var o = n.data;
                        var a = e > o.length ? o.length : e;
                        o.copy(r, r.length - e, 0, a);
                        e -= a;
                        if (e === 0) {
                            if (a === o.length) {
                                ++i;
                                if (n.next) t.head = n.next;
                                else t.head = t.tail = null
                            } else {
                                t.head = n;
                                n.data = o.slice(a)
                            }
                            break
                        }++i
                    }
                    t.length -= i;
                    return r
                }

                function H(e) {
                    var t = e._readableState;
                    if (t.length > 0) throw new Error('"endReadable()" called on non-empty stream');
                    if (!t.endEmitted) {
                        t.ended = true;
                        i(Y, t, e)
                    }
                }

                function Y(e, t) {
                    if (!e.endEmitted && e.length === 0) {
                        e.endEmitted = true;
                        t.readable = false;
                        t.emit("end")
                    }
                }

                function J(e, t) {
                    for (var r = 0, n = e.length; r < n; r++) {
                        t(e[r], r)
                    }
                }

                function Z(e, t) {
                    for (var r = 0, n = e.length; r < n; r++) {
                        if (e[r] === t) return r
                    }
                    return -1
                }
            }).call(this, e("_process"), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {
            "./_stream_duplex": 17,
            "./internal/streams/BufferList": 22,
            "./internal/streams/destroy": 23,
            "./internal/streams/stream": 24,
            _process: 15,
            "core-util-is": 5,
            events: 4,
            inherits: 10,
            isarray: 12,
            "process-nextick-args": 14,
            "safe-buffer": 26,
            "string_decoder/": 27,
            util: 2
        }],
        20: [function(e, t, r) {
            "use strict";
            t.exports = a;
            var n = e("./_stream_duplex");
            var i = e("core-util-is");
            i.inherits = e("inherits");
            i.inherits(a, n);

            function o(e, t) {
                var r = this._transformState;
                r.transforming = false;
                var n = r.writecb;
                if (!n) {
                    return this.emit("error", new Error("write callback called multiple times"))
                }
                r.writechunk = null;
                r.writecb = null;
                if (t != null) this.push(t);
                n(e);
                var i = this._readableState;
                i.reading = false;
                if (i.needReadable || i.length < i.highWaterMark) {
                    this._read(i.highWaterMark)
                }
            }

            function a(e) {
                if (!(this instanceof a)) return new a(e);
                n.call(this, e);
                this._transformState = {
                    afterTransform: o.bind(this),
                    needTransform: false,
                    transforming: false,
                    writecb: null,
                    writechunk: null,
                    writeencoding: null
                };
                this._readableState.needReadable = true;
                this._readableState.sync = false;
                if (e) {
                    if (typeof e.transform === "function") this._transform = e.transform;
                    if (typeof e.flush === "function") this._flush = e.flush
                }
                this.on("prefinish", s)
            }

            function s() {
                var e = this;
                if (typeof this._flush === "function") {
                    this._flush(function(t, r) {
                        f(e, t, r)
                    })
                } else {
                    f(this, null, null)
                }
            }
            a.prototype.push = function(e, t) {
                this._transformState.needTransform = false;
                return n.prototype.push.call(this, e, t)
            };
            a.prototype._transform = function(e, t, r) {
                throw new Error("_transform() is not implemented")
            };
            a.prototype._write = function(e, t, r) {
                var n = this._transformState;
                n.writecb = r;
                n.writechunk = e;
                n.writeencoding = t;
                if (!n.transforming) {
                    var i = this._readableState;
                    if (n.needTransform || i.needReadable || i.length < i.highWaterMark) this._read(i.highWaterMark)
                }
            };
            a.prototype._read = function(e) {
                var t = this._transformState;
                if (t.writechunk !== null && t.writecb && !t.transforming) {
                    t.transforming = true;
                    this._transform(t.writechunk, t.writeencoding, t.afterTransform)
                } else {
                    t.needTransform = true
                }
            };
            a.prototype._destroy = function(e, t) {
                var r = this;
                n.prototype._destroy.call(this, e, function(e) {
                    t(e);
                    r.emit("close")
                })
            };

            function f(e, t, r) {
                if (t) return e.emit("error", t);
                if (r != null) e.push(r);
                if (e._writableState.length) throw new Error("Calling transform done when ws.length != 0");
                if (e._transformState.transforming) throw new Error("Calling transform done when still transforming");
                return e.push(null)
            }
        }, {
            "./_stream_duplex": 17,
            "core-util-is": 5,
            inherits: 10
        }],
        21: [function(e, t, r) {
            (function(r, n) {
                "use strict";
                var i = e("process-nextick-args").nextTick;
                t.exports = w;

                function o(e, t, r) {
                    this.chunk = e;
                    this.encoding = t;
                    this.callback = r;
                    this.next = null
                }

                function a(e) {
                    var t = this;
                    this.next = null;
                    this.entry = null;
                    this.finish = function() {
                        N(t, e)
                    }
                }
                var s = !r.browser && ["v0.10", "v0.9."].indexOf(r.version.slice(0, 5)) > -1 ? setImmediate : i;
                var f;
                w.WritableState = m;
                var u = e("core-util-is");
                u.inherits = e("inherits");
                var l = {
                    deprecate: e("util-deprecate")
                };
                var c = e("./internal/streams/stream");
                var h = e("safe-buffer").Buffer;
                var d = n.Uint8Array || function() {};

                function p(e) {
                    return h.from(e)
                }

                function g(e) {
                    return h.isBuffer(e) || e instanceof d
                }
                var y = e("./internal/streams/destroy");
                u.inherits(w, c);

                function v() {}

                function m(t, r) {
                    f = f || e("./_stream_duplex");
                    t = t || {};
                    var n = r instanceof f;
                    this.objectMode = !!t.objectMode;
                    if (n) this.objectMode = this.objectMode || !!t.writableObjectMode;
                    var i = t.highWaterMark;
                    var o = t.writableHighWaterMark;
                    var s = this.objectMode ? 16 : 16 * 1024;
                    if (i || i === 0) this.highWaterMark = i;
                    else if (n && (o || o === 0)) this.highWaterMark = o;
                    else this.highWaterMark = s;
                    this.highWaterMark = Math.floor(this.highWaterMark);
                    this.finalCalled = false;
                    this.needDrain = false;
                    this.ending = false;
                    this.ended = false;
                    this.finished = false;
                    this.destroyed = false;
                    var u = t.decodeStrings === false;
                    this.decodeStrings = !u;
                    this.defaultEncoding = t.defaultEncoding || "utf8";
                    this.length = 0;
                    this.writing = false;
                    this.corked = 0;
                    this.sync = true;
                    this.bufferProcessing = false;
                    this.onwrite = function(e) {
                        A(r, e)
                    };
                    this.writecb = null;
                    this.writelen = 0;
                    this.bufferedRequest = null;
                    this.lastBufferedRequest = null;
                    this.pendingcb = 0;
                    this.prefinished = false;
                    this.errorEmitted = false;
                    this.bufferedRequestCount = 0;
                    this.corkedRequestsFree = new a(this)
                }
                m.prototype.getBuffer = function e() {
                    var t = this.bufferedRequest;
                    var r = [];
                    while (t) {
                        r.push(t);
                        t = t.next
                    }
                    return r
                };
                (function() {
                    try {
                        Object.defineProperty(m.prototype, "buffer", {
                            get: l.deprecate(function() {
                                return this.getBuffer()
                            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer " + "instead.", "DEP0003")
                        })
                    } catch (e) {}
                })();
                var b;
                if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
                    b = Function.prototype[Symbol.hasInstance];
                    Object.defineProperty(w, Symbol.hasInstance, {
                        value: function(e) {
                            if (b.call(this, e)) return true;
                            if (this !== w) return false;
                            return e && e._writableState instanceof m
                        }
                    })
                } else {
                    b = function(e) {
                        return e instanceof this
                    }
                }

                function w(t) {
                    f = f || e("./_stream_duplex");
                    if (!b.call(w, this) && !(this instanceof f)) {
                        return new w(t)
                    }
                    this._writableState = new m(t, this);
                    this.writable = true;
                    if (t) {
                        if (typeof t.write === "function") this._write = t.write;
                        if (typeof t.writev === "function") this._writev = t.writev;
                        if (typeof t.destroy === "function") this._destroy = t.destroy;
                        if (typeof t.final === "function") this._final = t.final
                    }
                    c.call(this)
                }
                w.prototype.pipe = function() {
                    this.emit("error", new Error("Cannot pipe, not readable"))
                };

                function _(e, t) {
                    var r = new Error("write after end");
                    e.emit("error", r);
                    i(t, r)
                }

                function C(e, t, r, n) {
                    var o = true;
                    var a = false;
                    if (r === null) {
                        a = new TypeError("May not write null values to stream")
                    } else if (typeof r !== "string" && r !== undefined && !t.objectMode) {
                        a = new TypeError("Invalid non-string/buffer chunk")
                    }
                    if (a) {
                        e.emit("error", a);
                        i(n, a);
                        o = false
                    }
                    return o
                }
                w.prototype.write = function(e, t, r) {
                    var n = this._writableState;
                    var i = false;
                    var o = !n.objectMode && g(e);
                    if (o && !h.isBuffer(e)) {
                        e = p(e)
                    }
                    if (typeof t === "function") {
                        r = t;
                        t = null
                    }
                    if (o) t = "buffer";
                    else if (!t) t = n.defaultEncoding;
                    if (typeof r !== "function") r = v;
                    if (n.ended) _(this, r);
                    else if (o || C(this, n, e, r)) {
                        n.pendingcb++;
                        i = E(this, n, o, e, t, r)
                    }
                    return i
                };
                w.prototype.cork = function() {
                    var e = this._writableState;
                    e.corked++
                };
                w.prototype.uncork = function() {
                    var e = this._writableState;
                    if (e.corked) {
                        e.corked--;
                        if (!e.writing && !e.corked && !e.finished && !e.bufferProcessing && e.bufferedRequest) M(this, e)
                    }
                };
                w.prototype.setDefaultEncoding = function e(t) {
                    if (typeof t === "string") t = t.toLowerCase();
                    if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((t + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + t);
                    this._writableState.defaultEncoding = t;
                    return this
                };

                function S(e, t, r) {
                    if (!e.objectMode && e.decodeStrings !== false && typeof t === "string") {
                        t = h.from(t, r)
                    }
                    return t
                }

                function E(e, t, r, n, i, o) {
                    if (!r) {
                        var a = S(t, n, i);
                        if (n !== a) {
                            r = true;
                            i = "buffer";
                            n = a
                        }
                    }
                    var s = t.objectMode ? 1 : n.length;
                    t.length += s;
                    var f = t.length < t.highWaterMark;
                    if (!f) t.needDrain = true;
                    if (t.writing || t.corked) {
                        var u = t.lastBufferedRequest;
                        t.lastBufferedRequest = {
                            chunk: n,
                            encoding: i,
                            isBuf: r,
                            callback: o,
                            next: null
                        };
                        if (u) {
                            u.next = t.lastBufferedRequest
                        } else {
                            t.bufferedRequest = t.lastBufferedRequest
                        }
                        t.bufferedRequestCount += 1
                    } else {
                        x(e, t, false, s, n, i, o)
                    }
                    return f
                }

                function x(e, t, r, n, i, o, a) {
                    t.writelen = n;
                    t.writecb = a;
                    t.writing = true;
                    t.sync = true;
                    if (r) e._writev(i, t.onwrite);
                    else e._write(i, o, t.onwrite);
                    t.sync = false
                }

                function k(e, t, r, n, o) {
                    --t.pendingcb;
                    if (r) {
                        i(o, n);
                        i(I, e, t);
                        e._writableState.errorEmitted = true;
                        e.emit("error", n)
                    } else {
                        o(n);
                        e._writableState.errorEmitted = true;
                        e.emit("error", n);
                        I(e, t)
                    }
                }

                function T(e) {
                    e.writing = false;
                    e.writecb = null;
                    e.length -= e.writelen;
                    e.writelen = 0
                }

                function A(e, t) {
                    var r = e._writableState;
                    var n = r.sync;
                    var i = r.writecb;
                    T(r);
                    if (t) k(e, r, n, t, i);
                    else {
                        var o = B(r);
                        if (!o && !r.corked && !r.bufferProcessing && r.bufferedRequest) {
                            M(e, r)
                        }
                        if (n) {
                            s(R, e, r, o, i)
                        } else {
                            R(e, r, o, i)
                        }
                    }
                }

                function R(e, t, r, n) {
                    if (!r) L(e, t);
                    t.pendingcb--;
                    n();
                    I(e, t)
                }

                function L(e, t) {
                    if (t.length === 0 && t.needDrain) {
                        t.needDrain = false;
                        e.emit("drain")
                    }
                }

                function M(e, t) {
                    t.bufferProcessing = true;
                    var r = t.bufferedRequest;
                    if (e._writev && r && r.next) {
                        var n = t.bufferedRequestCount;
                        var i = new Array(n);
                        var o = t.corkedRequestsFree;
                        o.entry = r;
                        var s = 0;
                        var f = true;
                        while (r) {
                            i[s] = r;
                            if (!r.isBuf) f = false;
                            r = r.next;
                            s += 1
                        }
                        i.allBuffers = f;
                        x(e, t, true, t.length, i, "", o.finish);
                        t.pendingcb++;
                        t.lastBufferedRequest = null;
                        if (o.next) {
                            t.corkedRequestsFree = o.next;
                            o.next = null
                        } else {
                            t.corkedRequestsFree = new a(t)
                        }
                        t.bufferedRequestCount = 0
                    } else {
                        while (r) {
                            var u = r.chunk;
                            var l = r.encoding;
                            var c = r.callback;
                            var h = t.objectMode ? 1 : u.length;
                            x(e, t, false, h, u, l, c);
                            r = r.next;
                            t.bufferedRequestCount--;
                            if (t.writing) {
                                break
                            }
                        }
                        if (r === null) t.lastBufferedRequest = null
                    }
                    t.bufferedRequest = r;
                    t.bufferProcessing = false
                }
                w.prototype._write = function(e, t, r) {
                    r(new Error("_write() is not implemented"))
                };
                w.prototype._writev = null;
                w.prototype.end = function(e, t, r) {
                    var n = this._writableState;
                    if (typeof e === "function") {
                        r = e;
                        e = null;
                        t = null
                    } else if (typeof t === "function") {
                        r = t;
                        t = null
                    }
                    if (e !== null && e !== undefined) this.write(e, t);
                    if (n.corked) {
                        n.corked = 1;
                        this.uncork()
                    }
                    if (!n.ending && !n.finished) O(this, n, r)
                };

                function B(e) {
                    return e.ending && e.length === 0 && e.bufferedRequest === null && !e.finished && !e.writing
                }

                function F(e, t) {
                    e._final(function(r) {
                        t.pendingcb--;
                        if (r) {
                            e.emit("error", r)
                        }
                        t.prefinished = true;
                        e.emit("prefinish");
                        I(e, t)
                    })
                }

                function j(e, t) {
                    if (!t.prefinished && !t.finalCalled) {
                        if (typeof e._final === "function") {
                            t.pendingcb++;
                            t.finalCalled = true;
                            i(F, e, t)
                        } else {
                            t.prefinished = true;
                            e.emit("prefinish")
                        }
                    }
                }

                function I(e, t) {
                    var r = B(t);
                    if (r) {
                        j(e, t);
                        if (t.pendingcb === 0) {
                            t.finished = true;
                            e.emit("finish")
                        }
                    }
                    return r
                }

                function O(e, t, r) {
                    t.ending = true;
                    I(e, t);
                    if (r) {
                        if (t.finished) i(r);
                        else e.once("finish", r)
                    }
                    t.ended = true;
                    e.writable = false
                }

                function N(e, t, r) {
                    var n = e.entry;
                    e.entry = null;
                    while (n) {
                        var i = n.callback;
                        t.pendingcb--;
                        i(r);
                        n = n.next
                    }
                    if (t.corkedRequestsFree) {
                        t.corkedRequestsFree.next = e
                    } else {
                        t.corkedRequestsFree = e
                    }
                }
                Object.defineProperty(w.prototype, "destroyed", {
                    get: function() {
                        if (this._writableState === undefined) {
                            return false
                        }
                        return this._writableState.destroyed
                    },
                    set: function(e) {
                        if (!this._writableState) {
                            return
                        }
                        this._writableState.destroyed = e
                    }
                });
                w.prototype.destroy = y.destroy;
                w.prototype._undestroy = y.undestroy;
                w.prototype._destroy = function(e, t) {
                    this.end();
                    t(e)
                }
            }).call(this, e("_process"), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {
            "./_stream_duplex": 17,
            "./internal/streams/destroy": 23,
            "./internal/streams/stream": 24,
            _process: 15,
            "core-util-is": 5,
            inherits: 10,
            "process-nextick-args": 14,
            "safe-buffer": 26,
            "util-deprecate": 28
        }],
        22: [function(e, t, r) {
            "use strict";

            function n(e, t) {
                if (!(e instanceof t)) {
                    throw new TypeError("Cannot call a class as a function")
                }
            }
            var i = e("safe-buffer").Buffer;
            var o = e("util");

            function a(e, t, r) {
                e.copy(t, r)
            }
            t.exports = function() {
                function e() {
                    n(this, e);
                    this.head = null;
                    this.tail = null;
                    this.length = 0
                }
                e.prototype.push = function e(t) {
                    var r = {
                        data: t,
                        next: null
                    };
                    if (this.length > 0) this.tail.next = r;
                    else this.head = r;
                    this.tail = r;
                    ++this.length
                };
                e.prototype.unshift = function e(t) {
                    var r = {
                        data: t,
                        next: this.head
                    };
                    if (this.length === 0) this.tail = r;
                    this.head = r;
                    ++this.length
                };
                e.prototype.shift = function e() {
                    if (this.length === 0) return;
                    var t = this.head.data;
                    if (this.length === 1) this.head = this.tail = null;
                    else this.head = this.head.next;
                    --this.length;
                    return t
                };
                e.prototype.clear = function e() {
                    this.head = this.tail = null;
                    this.length = 0
                };
                e.prototype.join = function e(t) {
                    if (this.length === 0) return "";
                    var r = this.head;
                    var n = "" + r.data;
                    while (r = r.next) {
                        n += t + r.data
                    }
                    return n
                };
                e.prototype.concat = function e(t) {
                    if (this.length === 0) return i.alloc(0);
                    if (this.length === 1) return this.head.data;
                    var r = i.allocUnsafe(t >>> 0);
                    var n = this.head;
                    var o = 0;
                    while (n) {
                        a(n.data, r, o);
                        o += n.data.length;
                        n = n.next
                    }
                    return r
                };
                return e
            }();
            if (o && o.inspect && o.inspect.custom) {
                t.exports.prototype[o.inspect.custom] = function() {
                    var e = o.inspect({
                        length: this.length
                    });
                    return this.constructor.name + " " + e
                }
            }
        }, {
            "safe-buffer": 26,
            util: 2
        }],
        23: [function(e, t, r) {
            "use strict";
            var n = e("process-nextick-args").nextTick;

            function i(e, t) {
                var r = this;
                var i = this._readableState && this._readableState.destroyed;
                var o = this._writableState && this._writableState.destroyed;
                if (i || o) {
                    if (t) {
                        t(e)
                    } else if (e && (!this._writableState || !this._writableState.errorEmitted)) {
                        n(a, this, e)
                    }
                    return this
                }
                if (this._readableState) {
                    this._readableState.destroyed = true
                }
                if (this._writableState) {
                    this._writableState.destroyed = true
                }
                this._destroy(e || null, function(e) {
                    if (!t && e) {
                        n(a, r, e);
                        if (r._writableState) {
                            r._writableState.errorEmitted = true
                        }
                    } else if (t) {
                        t(e)
                    }
                });
                return this
            }

            function o() {
                if (this._readableState) {
                    this._readableState.destroyed = false;
                    this._readableState.reading = false;
                    this._readableState.ended = false;
                    this._readableState.endEmitted = false
                }
                if (this._writableState) {
                    this._writableState.destroyed = false;
                    this._writableState.ended = false;
                    this._writableState.ending = false;
                    this._writableState.finished = false;
                    this._writableState.errorEmitted = false
                }
            }

            function a(e, t) {
                e.emit("error", t)
            }
            t.exports = {
                destroy: i,
                undestroy: o
            }
        }, {
            "process-nextick-args": 14
        }],
        24: [function(e, t, r) {
            t.exports = e("events").EventEmitter
        }, {
            events: 4
        }],
        25: [function(e, t, r) {
            r = t.exports = e("./lib/_stream_readable.js");
            r.Stream = r;
            r.Readable = r;
            r.Writable = e("./lib/_stream_writable.js");
            r.Duplex = e("./lib/_stream_duplex.js");
            r.Transform = e("./lib/_stream_transform.js");
            r.PassThrough = e("./lib/_stream_passthrough.js")
        }, {
            "./lib/_stream_duplex.js": 17,
            "./lib/_stream_passthrough.js": 18,
            "./lib/_stream_readable.js": 19,
            "./lib/_stream_transform.js": 20,
            "./lib/_stream_writable.js": 21
        }],
        26: [function(e, t, r) {
            var n = e("buffer");
            var i = n.Buffer;

            function o(e, t) {
                for (var r in e) {
                    t[r] = e[r]
                }
            }
            if (i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow) {
                t.exports = n
            } else {
                o(n, r);
                r.Buffer = a
            }

            function a(e, t, r) {
                return i(e, t, r)
            }
            o(i, a);
            a.from = function(e, t, r) {
                if (typeof e === "number") {
                    throw new TypeError("Argument must not be a number")
                }
                return i(e, t, r)
            };
            a.alloc = function(e, t, r) {
                if (typeof e !== "number") {
                    throw new TypeError("Argument must be a number")
                }
                var n = i(e);
                if (t !== undefined) {
                    if (typeof r === "string") {
                        n.fill(t, r)
                    } else {
                        n.fill(t)
                    }
                } else {
                    n.fill(0)
                }
                return n
            };
            a.allocUnsafe = function(e) {
                if (typeof e !== "number") {
                    throw new TypeError("Argument must be a number")
                }
                return i(e)
            };
            a.allocUnsafeSlow = function(e) {
                if (typeof e !== "number") {
                    throw new TypeError("Argument must be a number")
                }
                return n.SlowBuffer(e)
            }
        }, {
            buffer: 3
        }],
        27: [function(e, t, r) {
            "use strict";
            var n = e("safe-buffer").Buffer;
            var i = n.isEncoding || function(e) {
                e = "" + e;
                switch (e && e.toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                    case "raw":
                        return true;
                    default:
                        return false
                }
            };

            function o(e) {
                if (!e) return "utf8";
                var t;
                while (true) {
                    switch (e) {
                        case "utf8":
                        case "utf-8":
                            return "utf8";
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return "utf16le";
                        case "latin1":
                        case "binary":
                            return "latin1";
                        case "base64":
                        case "ascii":
                        case "hex":
                            return e;
                        default:
                            if (t) return;
                            e = ("" + e).toLowerCase();
                            t = true
                    }
                }
            }

            function a(e) {
                var t = o(e);
                if (typeof t !== "string" && (n.isEncoding === i || !i(e))) throw new Error("Unknown encoding: " + e);
                return t || e
            }
            r.StringDecoder = s;

            function s(e) {
                this.encoding = a(e);
                var t;
                switch (this.encoding) {
                    case "utf16le":
                        this.text = p;
                        this.end = g;
                        t = 4;
                        break;
                    case "utf8":
                        this.fillLast = c;
                        t = 4;
                        break;
                    case "base64":
                        this.text = y;
                        this.end = v;
                        t = 3;
                        break;
                    default:
                        this.write = m;
                        this.end = b;
                        return
                }
                this.lastNeed = 0;
                this.lastTotal = 0;
                this.lastChar = n.allocUnsafe(t)
            }
            s.prototype.write = function(e) {
                if (e.length === 0) return "";
                var t;
                var r;
                if (this.lastNeed) {
                    t = this.fillLast(e);
                    if (t === undefined) return "";
                    r = this.lastNeed;
                    this.lastNeed = 0
                } else {
                    r = 0
                }
                if (r < e.length) return t ? t + this.text(e, r) : this.text(e, r);
                return t || ""
            };
            s.prototype.end = d;
            s.prototype.text = h;
            s.prototype.fillLast = function(e) {
                if (this.lastNeed <= e.length) {
                    e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
                    return this.lastChar.toString(this.encoding, 0, this.lastTotal)
                }
                e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length);
                this.lastNeed -= e.length
            };

            function f(e) {
                if (e <= 127) return 0;
                else if (e >> 5 === 6) return 2;
                else if (e >> 4 === 14) return 3;
                else if (e >> 3 === 30) return 4;
                return -1
            }

            function u(e, t, r) {
                var n = t.length - 1;
                if (n < r) return 0;
                var i = f(t[n]);
                if (i >= 0) {
                    if (i > 0) e.lastNeed = i - 1;
                    return i
                }
                if (--n < r) return 0;
                i = f(t[n]);
                if (i >= 0) {
                    if (i > 0) e.lastNeed = i - 2;
                    return i
                }
                if (--n < r) return 0;
                i = f(t[n]);
                if (i >= 0) {
                    if (i > 0) {
                        if (i === 2) i = 0;
                        else e.lastNeed = i - 3
                    }
                    return i
                }
                return 0
            }

            function l(e, t, r) {
                if ((t[0] & 192) !== 128) {
                    e.lastNeed = 0;
                    return "�".repeat(r)
                }
                if (e.lastNeed > 1 && t.length > 1) {
                    if ((t[1] & 192) !== 128) {
                        e.lastNeed = 1;
                        return "�".repeat(r + 1)
                    }
                    if (e.lastNeed > 2 && t.length > 2) {
                        if ((t[2] & 192) !== 128) {
                            e.lastNeed = 2;
                            return "�".repeat(r + 2)
                        }
                    }
                }
            }

            function c(e) {
                var t = this.lastTotal - this.lastNeed;
                var r = l(this, e, t);
                if (r !== undefined) return r;
                if (this.lastNeed <= e.length) {
                    e.copy(this.lastChar, t, 0, this.lastNeed);
                    return this.lastChar.toString(this.encoding, 0, this.lastTotal)
                }
                e.copy(this.lastChar, t, 0, e.length);
                this.lastNeed -= e.length
            }

            function h(e, t) {
                var r = u(this, e, t);
                if (!this.lastNeed) return e.toString("utf8", t);
                this.lastTotal = r;
                var n = e.length - (r - this.lastNeed);
                e.copy(this.lastChar, 0, n);
                return e.toString("utf8", t, n)
            }

            function d(e) {
                var t = e && e.length ? this.write(e) : "";
                if (this.lastNeed) return t + "�".repeat(this.lastTotal - this.lastNeed);
                return t
            }

            function p(e, t) {
                if ((e.length - t) % 2 === 0) {
                    var r = e.toString("utf16le", t);
                    if (r) {
                        var n = r.charCodeAt(r.length - 1);
                        if (n >= 55296 && n <= 56319) {
                            this.lastNeed = 2;
                            this.lastTotal = 4;
                            this.lastChar[0] = e[e.length - 2];
                            this.lastChar[1] = e[e.length - 1];
                            return r.slice(0, -1)
                        }
                    }
                    return r
                }
                this.lastNeed = 1;
                this.lastTotal = 2;
                this.lastChar[0] = e[e.length - 1];
                return e.toString("utf16le", t, e.length - 1)
            }

            function g(e) {
                var t = e && e.length ? this.write(e) : "";
                if (this.lastNeed) {
                    var r = this.lastTotal - this.lastNeed;
                    return t + this.lastChar.toString("utf16le", 0, r)
                }
                return t
            }

            function y(e, t) {
                var r = (e.length - t) % 3;
                if (r === 0) return e.toString("base64", t);
                this.lastNeed = 3 - r;
                this.lastTotal = 3;
                if (r === 1) {
                    this.lastChar[0] = e[e.length - 1]
                } else {
                    this.lastChar[0] = e[e.length - 2];
                    this.lastChar[1] = e[e.length - 1]
                }
                return e.toString("base64", t, e.length - r)
            }

            function v(e) {
                var t = e && e.length ? this.write(e) : "";
                if (this.lastNeed) return t + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
                return t
            }

            function m(e) {
                return e.toString(this.encoding)
            }

            function b(e) {
                return e && e.length ? this.write(e) : ""
            }
        }, {
            "safe-buffer": 26
        }],
        28: [function(e, t, r) {
            (function(e) {
                t.exports = r;

                function r(e, t) {
                    if (n("noDeprecation")) {
                        return e
                    }
                    var r = false;

                    function i() {
                        if (!r) {
                            if (n("throwDeprecation")) {
                                throw new Error(t)
                            } else if (n("traceDeprecation")) {
                                console.trace(t)
                            } else {
                                console.warn(t)
                            }
                            r = true
                        }
                        return e.apply(this, arguments)
                    }
                    return i
                }

                function n(t) {
                    try {
                        if (!e.localStorage) return false
                    } catch (e) {
                        return false
                    }
                    var r = e.localStorage[t];
                    if (null == r) return false;
                    return String(r).toLowerCase() === "true"
                }
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {}],
        "/": [function(e, t, r) {
            (function(r) {
                t.exports = u;
                var n = e("debug")("simple-peer");
                var i = e("get-browser-rtc");
                var o = e("inherits");
                var a = e("randombytes");
                var s = e("readable-stream");
                var f = 64 * 1024;
                o(u, s.Duplex);

                function u(e) {
                    var t = this;
                    if (!(t instanceof u)) return new u(e);
                    t._id = a(4).toString("hex").slice(0, 7);
                    t._debug("new peer %o", e);
                    e = Object.assign({
                        allowHalfOpen: false
                    }, e);
                    s.Duplex.call(t, e);
                    t.channelName = e.initiator ? e.channelName || a(20).toString("hex") : null;
                    t._isChromium = typeof window !== "undefined" && !!window.webkitRTCPeerConnection;
                    t.initiator = e.initiator || false;
                    t.channelConfig = e.channelConfig || u.channelConfig;
                    t.config = e.config || u.config;
                    t.constraints = t._transformConstraints(e.constraints || u.constraints);
                    t.offerConstraints = t._transformConstraints(e.offerConstraints || {});
                    t.answerConstraints = t._transformConstraints(e.answerConstraints || {});
                    t.reconnectTimer = e.reconnectTimer || false;
                    t.sdpTransform = e.sdpTransform || function(e) {
                        return e
                    };
                    t.stream = e.stream || false;
                    t.trickle = e.trickle !== undefined ? e.trickle : true;
                    t.destroyed = false;
                    t.connected = false;
                    t.remoteAddress = undefined;
                    t.remoteFamily = undefined;
                    t.remotePort = undefined;
                    t.localAddress = undefined;
                    t.localPort = undefined;
                    t._wrtc = e.wrtc && typeof e.wrtc === "object" ? e.wrtc : i();
                    if (!t._wrtc) {
                        if (typeof window === "undefined") {
                            throw new Error("No WebRTC support: Specify `opts.wrtc` option in this environment")
                        } else {
                            throw new Error("No WebRTC support: Not a supported browser")
                        }
                    }
                    t._pcReady = false;
                    t._channelReady = false;
                    t._iceComplete = false;
                    t._channel = null;
                    t._pendingCandidates = [];
                    t._previousStreams = [];
                    t._chunk = null;
                    t._cb = null;
                    t._interval = null;
                    t._reconnectTimeout = null;
                    t._pc = new t._wrtc.RTCPeerConnection(t.config, t.constraints);
                    t._isWrtc = Array.isArray(t._pc.RTCIceConnectionStates);
                    t._isReactNativeWebrtc = typeof t._pc._peerConnectionId === "number";
                    t._pc.oniceconnectionstatechange = function() {
                        t._onIceStateChange()
                    };
                    t._pc.onicegatheringstatechange = function() {
                        t._onIceStateChange()
                    };
                    t._pc.onsignalingstatechange = function() {
                        t._onSignalingStateChange()
                    };
                    t._pc.onicecandidate = function(e) {
                        t._onIceCandidate(e)
                    };
                    if (t.initiator) {
                        var r = false;
                        t._pc.onnegotiationneeded = function() {
                            if (!r) t._createOffer();
                            r = true
                        };
                        t._setupData({
                            channel: t._pc.createDataChannel(t.channelName, t.channelConfig)
                        })
                    } else {
                        t._pc.ondatachannel = function(e) {
                            t._setupData(e)
                        }
                    }
                    if ("addTrack" in t._pc) {
                        if (t.stream) {
                            t.stream.getTracks().forEach(function(e) {
                                t._pc.addTrack(e, t.stream)
                            })
                        }
                        t._pc.ontrack = function(e) {
                            t._onTrack(e)
                        }
                    } else {
                        if (t.stream) t._pc.addStream(t.stream);
                        t._pc.onaddstream = function(e) {
                            t._onAddStream(e)
                        }
                    }
                    if (t.initiator && t._isWrtc) {
                        t._pc.onnegotiationneeded()
                    }
                    t._onFinishBound = function() {
                        t._onFinish()
                    };
                    t.once("finish", t._onFinishBound)
                }
                u.WEBRTC_SUPPORT = !!i();
                u.config = {
                    iceServers: [{
                        urls: "stun:stun.l.google.com:19302"
                    }, {
                        urls: "stun:global.stun.twilio.com:3478?transport=udp"
                    }]
                };
                u.constraints = {};
                u.channelConfig = {};
                Object.defineProperty(u.prototype, "bufferSize", {
                    get: function() {
                        var e = this;
                        return e._channel && e._channel.bufferedAmount || 0
                    }
                });
                u.prototype.address = function() {
                    var e = this;
                    return {
                        port: e.localPort,
                        family: "IPv4",
                        address: e.localAddress
                    }
                };
                u.prototype.signal = function(e) {
                    var t = this;
                    if (t.destroyed) throw new Error("cannot signal after peer is destroyed");
                    if (typeof e === "string") {
                        try {
                            e = JSON.parse(e)
                        } catch (t) {
                            e = {}
                        }
                    }
                    t._debug("signal()");
                    if (e.candidate) {
                        if (t._pc.remoteDescription && t._pc.remoteDescription.type) t._addIceCandidate(e.candidate);
                        else t._pendingCandidates.push(e.candidate)
                    }
                    if (e.sdp) {
                        t._pc.setRemoteDescription(new t._wrtc.RTCSessionDescription(e), function() {
                            if (t.destroyed) return;
                            t._pendingCandidates.forEach(function(e) {
                                t._addIceCandidate(e)
                            });
                            t._pendingCandidates = [];
                            if (t._pc.remoteDescription.type === "offer") t._createAnswer()
                        }, function(e) {
                            t.destroy(e)
                        })
                    }
                    if (!e.sdp && !e.candidate) {
                        t.destroy(new Error("signal() called with invalid signal data"))
                    }
                };
                u.prototype._addIceCandidate = function(e) {
                    var t = this;
                    try {
                        t._pc.addIceCandidate(new t._wrtc.RTCIceCandidate(e), l, function(e) {
                            t.destroy(e)
                        })
                    } catch (e) {
                        t.destroy(new Error("error adding candidate: " + e.message))
                    }
                };
                u.prototype.send = function(e) {
                    var t = this;
                    t._channel.send(e)
                };
                u.prototype.destroy = function(e) {
                    var t = this;
                    t._destroy(e, function() {})
                };
                u.prototype._destroy = function(e, t) {
                    var r = this;
                    if (r.destroyed) return;
                    r._debug("destroy (error: %s)", e && (e.message || e));
                    r.readable = r.writable = false;
                    if (!r._readableState.ended) r.push(null);
                    if (!r._writableState.finished) r.end();
                    r.destroyed = true;
                    r.connected = false;
                    r._pcReady = false;
                    r._channelReady = false;
                    r._previousStreams = null;
                    clearInterval(r._interval);
                    clearTimeout(r._reconnectTimeout);
                    r._interval = null;
                    r._reconnectTimeout = null;
                    r._chunk = null;
                    r._cb = null;
                    if (r._onFinishBound) r.removeListener("finish", r._onFinishBound);
                    r._onFinishBound = null;
                    if (r._pc) {
                        try {
                            r._pc.close()
                        } catch (e) {}
                        r._pc.oniceconnectionstatechange = null;
                        r._pc.onicegatheringstatechange = null;
                        r._pc.onsignalingstatechange = null;
                        r._pc.onicecandidate = null;
                        if ("addTrack" in r._pc) {
                            r._pc.ontrack = null
                        } else {
                            r._pc.onaddstream = null
                        }
                        r._pc.onnegotiationneeded = null;
                        r._pc.ondatachannel = null
                    }
                    if (r._channel) {
                        try {
                            r._channel.close()
                        } catch (e) {}
                        r._channel.onmessage = null;
                        r._channel.onopen = null;
                        r._channel.onclose = null;
                        r._channel.onerror = null
                    }
                    r._pc = null;
                    r._channel = null;
                    if (e) r.emit("error", e);
                    r.emit("close");
                    t()
                };
                u.prototype._setupData = function(e) {
                    var t = this;
                    if (!e.channel) {
                        return t.destroy(new Error("Data channel event is missing `channel` property"))
                    }
                    t._channel = e.channel;
                    t._channel.binaryType = "arraybuffer";
                    if (typeof t._channel.bufferedAmountLowThreshold === "number") {
                        t._channel.bufferedAmountLowThreshold = f
                    }
                    t.channelName = t._channel.label;
                    t._channel.onmessage = function(e) {
                        t._onChannelMessage(e)
                    };
                    t._channel.onbufferedamountlow = function() {
                        t._onChannelBufferedAmountLow()
                    };
                    t._channel.onopen = function() {
                        t._onChannelOpen()
                    };
                    t._channel.onclose = function() {
                        t._onChannelClose()
                    };
                    t._channel.onerror = function(e) {
                        t.destroy(e)
                    }
                };
                u.prototype._read = function() {};
                u.prototype._write = function(e, t, r) {
                    var n = this;
                    if (n.destroyed) return r(new Error("cannot write after peer is destroyed"));
                    if (n.connected) {
                        try {
                            n.send(e)
                        } catch (e) {
                            return n.destroy(e)
                        }
                        if (n._channel.bufferedAmount > f) {
                            n._debug("start backpressure: bufferedAmount %d", n._channel.bufferedAmount);
                            n._cb = r
                        } else {
                            r(null)
                        }
                    } else {
                        n._debug("write before connect");
                        n._chunk = e;
                        n._cb = r
                    }
                };
                u.prototype._onFinish = function() {
                    var e = this;
                    if (e.destroyed) return;
                    if (e.connected) {
                        t()
                    } else {
                        e.once("connect", t)
                    }

                    function t() {
                        setTimeout(function() {
                            e.destroy()
                        }, 1e3)
                    }
                };
                u.prototype._createOffer = function() {
                    var e = this;
                    if (e.destroyed) return;
                    e._pc.createOffer(function(t) {
                        if (e.destroyed) return;
                        t.sdp = e.sdpTransform(t.sdp);
                        e._pc.setLocalDescription(t, r, n);

                        function r() {
                            if (e.destroyed) return;
                            if (e.trickle || e._iceComplete) i();
                            else e.once("_iceComplete", i)
                        }

                        function n(t) {
                            e.destroy(t)
                        }

                        function i() {
                            var r = e._pc.localDescription || t;
                            e._debug("signal");
                            e.emit("signal", {
                                type: r.type,
                                sdp: r.sdp
                            })
                        }
                    }, function(t) {
                        e.destroy(t)
                    }, e.offerConstraints)
                };
                u.prototype._createAnswer = function() {
                    var e = this;
                    if (e.destroyed) return;
                    e._pc.createAnswer(function(t) {
                        if (e.destroyed) return;
                        t.sdp = e.sdpTransform(t.sdp);
                        e._pc.setLocalDescription(t, r, n);

                        function r() {
                            if (e.destroyed) return;
                            if (e.trickle || e._iceComplete) i();
                            else e.once("_iceComplete", i)
                        }

                        function n(t) {
                            e.destroy(t)
                        }

                        function i() {
                            var r = e._pc.localDescription || t;
                            e._debug("signal");
                            e.emit("signal", {
                                type: r.type,
                                sdp: r.sdp
                            })
                        }
                    }, function(t) {
                        e.destroy(t)
                    }, e.answerConstraints)
                };
                u.prototype._onIceStateChange = function() {
                    var e = this;
                    if (e.destroyed) return;
                    var t = e._pc.iceConnectionState;
                    var r = e._pc.iceGatheringState;
                    e._debug("iceStateChange (connection: %s) (gathering: %s)", t, r);
                    e.emit("iceStateChange", t, r);
                    if (t === "connected" || t === "completed") {
                        clearTimeout(e._reconnectTimeout);
                        e._pcReady = true;
                        e._maybeReady()
                    }
                    if (t === "disconnected") {
                        if (e.reconnectTimer) {
                            clearTimeout(e._reconnectTimeout);
                            e._reconnectTimeout = setTimeout(function() {
                                e.destroy()
                            }, e.reconnectTimer)
                        } else {
                            e.destroy()
                        }
                    }
                    if (t === "failed") {
                        e.destroy(new Error("Ice connection failed."))
                    }
                    if (t === "closed") {
                        e.destroy()
                    }
                };
                u.prototype.getStats = function(e) {
                    var t = this;
                    if (t._pc.getStats.length === 0) {
                        t._pc.getStats().then(function(t) {
                            var r = [];
                            t.forEach(function(e) {
                                r.push(e)
                            });
                            e(null, r)
                        }, function(t) {
                            e(t)
                        })
                    } else if (t._isReactNativeWebrtc) {
                        t._pc.getStats(null, function(t) {
                            var r = [];
                            t.forEach(function(e) {
                                r.push(e)
                            });
                            e(null, r)
                        }, function(t) {
                            e(t)
                        })
                    } else if (t._pc.getStats.length > 0) {
                        t._pc.getStats(function(r) {
                            if (t.destroyed) return;
                            var n = [];
                            r.result().forEach(function(e) {
                                var t = {};
                                e.names().forEach(function(r) {
                                    t[r] = e.stat(r)
                                });
                                t.id = e.id;
                                t.type = e.type;
                                t.timestamp = e.timestamp;
                                n.push(t)
                            });
                            e(null, n)
                        }, function(t) {
                            e(t)
                        })
                    } else {
                        e(null, [])
                    }
                };
                u.prototype._maybeReady = function() {
                    var e = this;
                    e._debug("maybeReady pc %s channel %s", e._pcReady, e._channelReady);
                    if (e.connected || e._connecting || !e._pcReady || !e._channelReady) return;
                    e._connecting = true;

                    function t() {
                        if (e.destroyed) return;
                        e.getStats(function(r, n) {
                            if (e.destroyed) return;
                            if (r) n = [];
                            var i = {};
                            var o = {};
                            var a = {};
                            var s = false;
                            n.forEach(function(e) {
                                if (e.type === "remotecandidate" || e.type === "remote-candidate") {
                                    i[e.id] = e
                                }
                                if (e.type === "localcandidate" || e.type === "local-candidate") {
                                    o[e.id] = e
                                }
                                if (e.type === "candidatepair" || e.type === "candidate-pair") {
                                    a[e.id] = e
                                }
                            });
                            n.forEach(function(e) {
                                if (e.type === "transport") {
                                    f(a[e.selectedCandidatePairId])
                                }
                                if (e.type === "googCandidatePair" && e.googActiveConnection === "true" || (e.type === "candidatepair" || e.type === "candidate-pair") && e.selected) {
                                    f(e)
                                }
                            });

                            function f(t) {
                                s = true;
                                var r = o[t.localCandidateId];
                                if (r && r.ip) {
                                    e.localAddress = r.ip;
                                    e.localPort = Number(r.port)
                                } else if (r && r.ipAddress) {
                                    e.localAddress = r.ipAddress;
                                    e.localPort = Number(r.portNumber)
                                } else if (typeof t.googLocalAddress === "string") {
                                    r = t.googLocalAddress.split(":");
                                    e.localAddress = r[0];
                                    e.localPort = Number(r[1])
                                }
                                var n = i[t.remoteCandidateId];
                                if (n && n.ip) {
                                    e.remoteAddress = n.ip;
                                    e.remotePort = Number(n.port)
                                } else if (n && n.ipAddress) {
                                    e.remoteAddress = n.ipAddress;
                                    e.remotePort = Number(n.portNumber)
                                } else if (typeof t.googRemoteAddress === "string") {
                                    n = t.googRemoteAddress.split(":");
                                    e.remoteAddress = n[0];
                                    e.remotePort = Number(n[1])
                                }
                                e.remoteFamily = "IPv4";
                                e._debug("connect local: %s:%s remote: %s:%s", e.localAddress, e.localPort, e.remoteAddress, e.remotePort)
                            }
                            if (!s && (!Object.keys(a).length || Object.keys(o).length)) {
                                setTimeout(t, 100);
                                return
                            } else {
                                e._connecting = false;
                                e.connected = true
                            }
                            if (e._chunk) {
                                try {
                                    e.send(e._chunk)
                                } catch (r) {
                                    return e.destroy(r)
                                }
                                e._chunk = null;
                                e._debug('sent chunk from "write before connect"');
                                var u = e._cb;
                                e._cb = null;
                                u(null)
                            }
                            if (typeof e._channel.bufferedAmountLowThreshold !== "number") {
                                e._interval = setInterval(function() {
                                    e._onInterval()
                                }, 150);
                                if (e._interval.unref) e._interval.unref()
                            }
                            e._debug("connect");
                            e.emit("connect")
                        })
                    }
                    t()
                };
                u.prototype._onInterval = function() {
                    var e = this;
                    if (!e._cb || !e._channel || e._channel.bufferedAmount > f) {
                        return
                    }
                    e._onChannelBufferedAmountLow()
                };
                u.prototype._onSignalingStateChange = function() {
                    var e = this;
                    if (e.destroyed) return;
                    e._debug("signalingStateChange %s", e._pc.signalingState);
                    e.emit("signalingStateChange", e._pc.signalingState)
                };
                u.prototype._onIceCandidate = function(e) {
                    var t = this;
                    if (t.destroyed) return;
                    if (e.candidate && t.trickle) {
                        t.emit("signal", {
                            candidate: {
                                candidate: e.candidate.candidate,
                                sdpMLineIndex: e.candidate.sdpMLineIndex,
                                sdpMid: e.candidate.sdpMid
                            }
                        })
                    } else if (!e.candidate) {
                        t._iceComplete = true;
                        t.emit("_iceComplete")
                    }
                };
                u.prototype._onChannelMessage = function(e) {
                    var t = this;
                    if (t.destroyed) return;
                    var n = e.data;
                    if (n instanceof ArrayBuffer) n = r.from(n);
                    t.push(n)
                };
                u.prototype._onChannelBufferedAmountLow = function() {
                    var e = this;
                    if (e.destroyed || !e._cb) return;
                    e._debug("ending backpressure: bufferedAmount %d", e._channel.bufferedAmount);
                    var t = e._cb;
                    e._cb = null;
                    t(null)
                };
                u.prototype._onChannelOpen = function() {
                    var e = this;
                    if (e.connected || e.destroyed) return;
                    e._debug("on channel open");
                    e._channelReady = true;
                    e._maybeReady()
                };
                u.prototype._onChannelClose = function() {
                    var e = this;
                    if (e.destroyed) return;
                    e._debug("on channel close");
                    e.destroy()
                };
                u.prototype._onAddStream = function(e) {
                    var t = this;
                    if (t.destroyed) return;
                    t._debug("on add stream");
                    t.emit("stream", e.stream)
                };
                u.prototype._onTrack = function(e) {
                    var t = this;
                    if (t.destroyed) return;
                    t._debug("on track");
                    var r = e.streams[0].id;
                    if (t._previousStreams.indexOf(r) !== -1) return;
                    t._previousStreams.push(r);
                    t.emit("stream", e.streams[0])
                };
                u.prototype._debug = function() {
                    var e = this;
                    var t = [].slice.call(arguments);
                    t[0] = "[" + e._id + "] " + t[0];
                    n.apply(null, t)
                };
                u.prototype._transformConstraints = function(e) {
                    var t = this;
                    if (Object.keys(e).length === 0) {
                        return e
                    }
                    if ((e.mandatory || e.optional) && !t._isChromium) {
                        var r = Object.assign({}, e.optional, e.mandatory);
                        if (r.OfferToReceiveVideo !== undefined) {
                            r.offerToReceiveVideo = r.OfferToReceiveVideo;
                            delete r["OfferToReceiveVideo"]
                        }
                        if (r.OfferToReceiveAudio !== undefined) {
                            r.offerToReceiveAudio = r.OfferToReceiveAudio;
                            delete r["OfferToReceiveAudio"]
                        }
                        return r
                    } else if (!e.mandatory && !e.optional && t._isChromium) {
                        if (e.offerToReceiveVideo !== undefined) {
                            e.OfferToReceiveVideo = e.offerToReceiveVideo;
                            delete e["offerToReceiveVideo"]
                        }
                        if (e.offerToReceiveAudio !== undefined) {
                            e.OfferToReceiveAudio = e.offerToReceiveAudio;
                            delete e["offerToReceiveAudio"]
                        }
                        return {
                            mandatory: e
                        }
                    }
                    return e
                };

                function l() {}
            }).call(this, e("buffer").Buffer)
        }, {
            buffer: 3,
            debug: 6,
            "get-browser-rtc": 8,
            inherits: 10,
            randombytes: 16,
            "readable-stream": 25
        }]
    }, {}, [])("/")
});