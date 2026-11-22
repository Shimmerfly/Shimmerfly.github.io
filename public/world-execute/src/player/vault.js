import { CONFIG } from "./config.js?v=Cv08Ht0h";
//#region src/player/vault.js
var S = crypto.subtle;
var te = new TextEncoder();
var CURVE = {
	name: "ECDH",
	namedCurve: "P-256"
};
/** The configured label of the protocol. Every function below takes `ns` to override it (tests). */
var NS = CONFIG.audio.namespace;
/** Why the song could not be fetched: code 'status' (the server answered `status`) or 'unreachable' (no answer). */
var SongError = class extends Error {
	constructor(code, status = 0) {
		super(code === "status" ? `audio ${status}` : "cannot reach the audio service");
		this.name = "SongError";
		this.code = code;
		this.status = status;
	}
};
var b64u = {
	enc: (b) => btoa(String.fromCharCode(...new Uint8Array(b))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""),
	dec: (s) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0))
};
/** The HKDF info of the key wrap. */
var wrapInfo = (ns = NS) => `${ns}/wrap`;
/** Each part is bound to its place: a part moved to another slot fails to open. */
var aad = (i, n, ns = NS) => te.encode(`${ns}/part/${i}/${n}`);
async function hkdf(ikm, salt, info, alg, usages) {
	const base = await S.importKey("raw", ikm, "HKDF", false, ["deriveKey"]);
	return S.deriveKey({
		name: "HKDF",
		hash: "SHA-256",
		salt,
		info: te.encode(info)
	}, base, alg, false, usages);
}
/** The song's bytes (a browser-decodable audio file), fetched straight from `api` (an absolute URL). */
async function fetchSong(api, { fetch = globalThis.fetch } = {}) {
	const r = await fetch(api).catch(() => {
		throw new SongError("unreachable");
	});
	if (!r.ok) throw new SongError("status", r.status);
	return r.arrayBuffer();
}
//#endregion
export { NS, SongError, aad, b64u, fetchSong, hkdf, wrapInfo };
