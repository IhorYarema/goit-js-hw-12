import{a as g,S as q,i as y}from"./assets/vendor-DXaqCXe3.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const H="49237472-e2704486942ee192f1a430e77",M="https://pixabay.com/api/";g({method:"get",url:"https://jsonplaceholder.typicode.com/users"});async function L(t,r=1,a=15){try{const{data:s}=await g.get(M,{params:{key:H,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:a}});return{images:s.hits,totalHits:s.totalHits}}catch(s){return console.error("Error fetching images:",s),{images:[],totalHits:0}}}const p=document.querySelector(".gallery"),w=document.querySelector(".loader"),u=document.querySelector(".load-more");let B=new q(".gallery a");function v(t,r=!1){if(r&&(p.innerHTML=""),t.length===0){m("Sorry, there are no images matching your search query. Please try again!");return}const a=t.map(({webformatURL:s,largeImageURL:e,tags:o,likes:n,views:S,comments:b,downloads:P})=>`
            <li>
                <a href="${e}">
                    <img src="${s}" alt="${o}" loading="lazy">
                </a>
                <div><p>Likes: <span>${n}</span></p> <p> Views: <span>${S}</span></p> <p> Comments: <span>${b}</span></p> <p> Downloads: <span>${P}</span></p></div>
            </li>
        `).join("");p.insertAdjacentHTML("beforeend",a),B.refresh()}function E(){w.classList.remove("hidden"),u.classList.add("hidden")}function f(){w.classList.add("hidden"),u.classList.remove("hidden")}function m(t){y.error({title:"Error",message:t,position:"topRight"})}function c(t){t?u.classList.remove("hidden"):u.classList.add("hidden")}function $(){y.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}const O=document.getElementById("search-form"),I=document.getElementById("search-input"),R=document.querySelector(".load-more");let d="",i=1;const l=15;let h=0;O.addEventListener("submit",async t=>{if(t.preventDefault(),d=I.value.trim(),!d){m("Please enter a search term!");return}i=1,c(!1),E();try{const{images:r,totalHits:a}=await L(d,i,l);h=a,v(r,!0),f(),r.length<l||h<=l?c(!1):c(!0)}catch{m("Failed to fetch images. Please try again later."),f()}});R.addEventListener("click",async()=>{i+=1,E();try{const{images:t}=await L(d,i,l);v(t),f();const r=Math.ceil(h/l);i>=r&&(c(!1),$());const a=document.querySelector(".gallery li");if(a){const{height:s}=a.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}}catch{m("Something went wrong while loading more images."),f()}});
//# sourceMappingURL=index.js.map
