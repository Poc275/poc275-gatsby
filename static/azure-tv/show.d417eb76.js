var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequire65d0;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,o.call(a.exports,a,a.exports),a.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){n[e]=t},e.parcelRequire65d0=o);var a=o("8zQx8"),s=o("2wqqk"),r=o("hOCft");const i=new a.PublicClientApplication({auth:{clientId:"53bfecae-5150-4a44-8b5b-957ac4839fa4",authority:"https://login.microsoftonline.com/4583a017-e1c7-4872-bb63-71c8f247fb02"}}),c=i.getAllAccounts(),d={scopes:["https://storage.azure.com/user_impersonation"],account:c[0],forceRefresh:!1},l={scopes:["https://storage.azure.com/user_impersonation"],loginHint:c[0].username},m=e=>({getToken:()=>({token:e.accessToken,expiresOnTimestamp:new Date(e.expiresOn).getTime()})});i.acquireTokenSilent(d).then((async e=>{const t=new r.TableClient("https://azuretv.table.core.windows.net","azuretv",m(e)),n=new URLSearchParams(window.location.search);if(n.has("id")){const o=n.get("id"),a=await t.getEntity("shows",o);document.getElementById("backdrop").style.backgroundImage=a.backdrop_path?`url(https://image.tmdb.org/t/p/w780/${a.backdrop_path})`:`url(https://image.tmdb.org/t/p/w780/${a.poster_path})`,document.getElementById("title").textContent=a.name,document.getElementById("tagline").textContent=a.tagline,document.getElementById("overview").textContent=a.overview.split(".")[0],document.getElementById("total-episodes").textContent=`${a.number_of_episodes} episodes`,p(e,o,t)}else console.error("Show not found")})).catch((e=>{if(console.error(e),e instanceof a.InteractionRequiredAuthError)return i.acquireTokenRedirect(l)}));const p=async(e,t,n)=>{const o=new s.BlobServiceClient("https://azuretv.blob.core.windows.net/",m(e)).getContainerClient("media"),a=[];for await(const e of o.listBlobsByHierarchy("/",{prefix:`TV/${t}/`})){const s=o.getBlockBlobClient(e.name),r=(await s.getProperties()).metadata;try{const o=await n.getEntity("episodes",`${t}_${r.season}_${r.episode}`);a.push({season_number:o.season_number,episode_number:o.episode_number,name:o.name,overview:o.overview,still_path:o.still_path,air_date:o.air_date,blob:e})}catch(e){console.error(`Could not find information for season ${r.season}, episode ${r.episode}: ${e}`)}}a.sort(((e,t)=>e.season_number<t.season_number?-1:e.season_number===t.season_number?e.episode_number-t.episode_number:1)),u(a)},u=e=>{e.forEach((e=>{const t=document.createElement("div"),n=document.createElement("div");t.className="episode",n.className="episode-still",n.style.backgroundImage=`url(https://image.tmdb.org/t/p/w185/${e.still_path})`;const o=document.createElement("button");o.className="play-btn",o.textContent="▶",o.addEventListener("click",(()=>{b(e.blob,e)}),!1),n.appendChild(o);const a=document.createElement("p");a.className="episode-title";const s=0===e.season_number?`Extras: ${e.name}`:`Series ${e.season_number}: ${e.episode_number}. ${e.name}`;a.textContent=s;const r=document.createElement("p");r.textContent=e.overview.split(".")[0],t.appendChild(n),t.appendChild(a),t.appendChild(r),document.getElementById("episodes").appendChild(t)}))},b=(e,t)=>{const n=cast.framework.CastContext.getInstance().getCurrentSession(),o=new chrome.cast.media.TvShowMediaMetadata;o.episode=t.episode_number,o.images=[t.still_path],o.originalAirdate=t.air_date,o.season=t.season_number,o.title=t.name;const a=new chrome.cast.media.MediaInfo(`https://azuretv.blob.core.windows.net/media/${e.name}`,e.properties.contentType);a.metadata=o;const s=new chrome.cast.media.LoadRequest(a);n.loadMedia(s).then((()=>{console.log("Load succeeded")})).catch((e=>{console.error("Error code",e)}))};
//# sourceMappingURL=show.d417eb76.js.map
