function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},r=t.parcelRequire65d0;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},t.parcelRequire65d0=r);var i=r("8zQx8"),a=r("2wqqk"),l=r("gsP8W");const s=new i.PublicClientApplication({auth:{clientId:"53bfecae-5150-4a44-8b5b-957ac4839fa4",authority:"https://login.microsoftonline.com/4583a017-e1c7-4872-bb63-71c8f247fb02"}});s.handleRedirectPromise().then((async t=>{if(t){const n={getToken:()=>({token:t.accessToken,expiresOnTimestamp:Date.now()+36e5})},o=new a.BlobServiceClient("https://azuretv.blob.core.windows.net/",n).getContainerClient("media");for await(const t of o.listBlobsByHierarchy("/",{prefix:"TV/"}))if("prefix"===t.kind){const n=t.name.split("/")[1],o=e(l)[n],r=document.createElement("img");r.src=`https://image.tmdb.org/t/p/w92/${o.poster_path}`,r.alt=`${o.name} poster`;const i=document.createElement("p");i.className="poster-title",i.textContent=o.name;const a=document.createElement("a");a.href=`show.html?id=${o.id}`,a.appendChild(r),a.appendChild(i);const s=document.createElement("div");s.className="poster",s.appendChild(a);document.getElementById("library").appendChild(s)}}else try{const e={scopes:["https://storage.azure.com/user_impersonation"]};s.loginRedirect(e)}catch(e){console.error(e)}})).catch((e=>{console.error(e)}));
//# sourceMappingURL=index.a011b524.js.map
