/* Nuvaryn demo core: i18n, formatting, store, router, shell, tables, forms, modals, charts. Shared by erp.html and crm.html */
(function(){
"use strict";
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const ls={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}},del(k){try{localStorage.removeItem(k)}catch(e){}}};

/* ---------- icons (lucide-style strokes) ---------- */
const IC={
home:'<path d="M3 10.5 12 3l9 7.5V21H3z"/><path d="M9 21v-6h6v6"/>',
users:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.4 3-5.4 6-5.4s5.4 2 6 5.4"/><path d="M16 4.5a3 3 0 0 1 0 6M18.5 14.5c1.4.8 2.3 2.6 2.5 5.5"/>',
building:'<path d="M3 21h18M5 21V5l7-2v18M12 8h7v13"/><path d="M8 9h1M8 13h1M8 17h1M15 12h1M15 16h1"/>',
box:'<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
warehouse:'<path d="M3 21V8l9-5 9 5v13"/><path d="M7 21v-8h10v8M7 17h10"/>',
cart:'<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 7H6"/>',
file:'<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
invoice:'<path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
bank:'<path d="M3 10h18L12 4zM5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18"/>',
factory:'<path d="M3 21V10l5 3V10l5 3V7l8 4v10z"/><path d="M7 17h2M12 17h2M17 17h2"/>',
layers:'<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
hr:'<circle cx="12" cy="7" r="4"/><path d="M4 21c.8-4 4-6.5 8-6.5s7.2 2.5 8 6.5"/>',
chart:'<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-6"/>',
pie:'<path d="M21 12A9 9 0 1 1 12 3v9z"/><path d="M15 3.5A9 9 0 0 1 20.5 9H15z"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
sun:'<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2 12h2.5M19.5 12H22M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/>',
moon:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.3 6.3 0 0 0 10.5 10.5z"/>',
menu:'<path d="M4 7h16M4 12h16M4 17h10"/>',
x:'<path d="M18 6 6 18M6 6l12 12"/>',
check:'<path d="M20 6 9 17l-5-5"/>',
edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
trash:'<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>',
download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
printer:'<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v7H6z"/>',
arrowR:'<path d="M5 12h14M13 6l6 6-6 6"/>',
arrowL:'<path d="M19 12H5M11 18l-6-6 6-6"/>',
truck:'<path d="M1 4h13v12H1zM14 8h4l4 4v4h-8z"/><circle cx="5.5" cy="18.5" r="2"/><circle cx="17.5" cy="18.5" r="2"/>',
money:'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 12h.01M18 12h.01"/>',
alert:'<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
cal:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"/>',
mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
meet:'<circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M2 20c.5-3 2.8-5 6-5s5.5 2 6 5M14 15.3c.6-.2 1.3-.3 2-.3 3.2 0 5.5 2 6 5"/>',
target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
funnel:'<path d="M3 4h18l-7 9v6l-4 2v-8z"/>',
kanban:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18"/>',
ticket:'<path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z"/><path d="M13 6v12"/>',
send:'<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
star:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z"/>',
tool:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
play:'<path d="M6 4l14 8-14 8z"/>',
refresh:'<path d="M21 12a9 9 0 1 1-2.6-6.4M21 4v4h-4"/>',
move:'<path d="M5 9 2 12l3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"/>',
info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
note:'<path d="M4 4h16v12l-4 4H4z"/><path d="M16 20v-4h4M8 9h8M8 13h5"/>',
lead:'<path d="M12 2a5 5 0 0 1 5 5c0 3-2 4.5-2 7H9c0-2.5-2-4-2-7a5 5 0 0 1 5-5zM9 18h6M10 22h4"/>',
award:'<circle cx="12" cy="8" r="6"/><path d="M8.2 13 7 22l5-3 5 3-1.2-9"/>',
external:'<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
shield:'<path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
};
const icon=(n,cls="i")=>`<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${IC[n]||IC.info}</svg>`;

/* ---------- i18n ---------- */
const DICT={es:{
 demo_ribbon:"Demo interactiva con datos ficticios. Lo que cambies se guarda solo en este navegador.",reset:"Restablecer datos",back_site:"Volver a Nuvaryn",
 search_ph:"Buscar en todo…",no_results:"Sin resultados",new:"Nuevo",save:"Guardar",cancel:"Cancelar",edit:"Editar",del:"Eliminar",close:"Cerrar",
 confirm:"Confirmar",export:"Exportar CSV",all:"Todos",search:"Buscar…",rows:"registros",of:"de",prev:"Anterior",next:"Siguiente",empty:"No hay registros que coincidan.",
 saved:"Cambios guardados",created:"Registro creado",deleted:"Registro eliminado",reset_done:"Datos de ejemplo restablecidos",
 total:"Total",subtotal:"Subtotal",tax:"IVA 21%",qty:"Cant.",price:"Precio",disc:"Desc.",amount:"Importe",product:"Producto",desc:"Descripción",
 status:"Estado",date:"Fecha",ref:"Ref.",customer:"Cliente",supplier:"Proveedor",actions:"Acciones",notes:"Notas",owner:"Responsable",
 req_err:"Completá los campos obligatorios.",notif:"Notificaciones",theme:"Cambiar tema",lang:"Idioma",user_role:"Usuario demo",
 add_line:"Agregar línea",print:"Vista de impresión",view:"Ver",today:"Hoy",yes:"Sí",no:"No",confirm_del:"¿Eliminar este registro? Esta acción no se puede deshacer en la demo.",
 menu:"Menú",dashboard:"Panel",
},en:{
 demo_ribbon:"Interactive demo with sample data. Your changes are saved only in this browser.",reset:"Reset data",back_site:"Back to Nuvaryn",
 search_ph:"Search everything…",no_results:"No results",new:"New",save:"Save",cancel:"Cancel",edit:"Edit",del:"Delete",close:"Close",
 confirm:"Confirm",export:"Export CSV",all:"All",search:"Search…",rows:"records",of:"of",prev:"Previous",next:"Next",empty:"No matching records.",
 saved:"Changes saved",created:"Record created",deleted:"Record deleted",reset_done:"Sample data restored",
 total:"Total",subtotal:"Subtotal",tax:"VAT 21%",qty:"Qty",price:"Price",disc:"Disc.",amount:"Amount",product:"Product",desc:"Description",
 status:"Status",date:"Date",ref:"Ref.",customer:"Customer",supplier:"Supplier",actions:"Actions",notes:"Notes",owner:"Owner",
 req_err:"Please fill in the required fields.",notif:"Notifications",theme:"Toggle theme",lang:"Language",user_role:"Demo user",
 add_line:"Add line",print:"Print preview",view:"View",today:"Today",yes:"Yes",no:"No",confirm_del:"Delete this record? This can't be undone in the demo.",
 menu:"Menu",dashboard:"Dashboard",
}};
function detectLang(){const s=ls.get("nv-lang");if(s==="es"||s==="en")return s;const l=(navigator.languages&&navigator.languages[0])||navigator.language||"es";return l.slice(0,2).toLowerCase()==="es"?"es":(l.slice(0,2).toLowerCase()==="pt"?"es":"en");}
let LANG=detectLang();
const t=k=>(DICT[LANG]&&DICT[LANG][k])??DICT.es[k]??k;
const L=v=>Array.isArray(v)?(LANG==="en"?v[1]:v[0]):v;
const locale=()=>LANG==="en"?"en-US":"es-AR";

/* ---------- format ---------- */
const money=(n,dec=0)=>"US$ "+Number(n||0).toLocaleString(locale(),{minimumFractionDigits:dec,maximumFractionDigits:dec});
const num=(n,dec=0)=>Number(n||0).toLocaleString(locale(),{minimumFractionDigits:dec,maximumFractionDigits:dec});
const kfmt=n=>{n=Number(n||0);const a=Math.abs(n);return a>=1e6?(n/1e6).toLocaleString(locale(),{maximumFractionDigits:1})+"M":a>=1e3?(n/1e3).toLocaleString(locale(),{maximumFractionDigits:1})+"k":num(n)};
const D=s=>s instanceof Date?s:new Date(s+(String(s).length===10?"T12:00:00":""));
const date=s=>s?D(s).toLocaleDateString(locale(),{day:"2-digit",month:"2-digit",year:"numeric"}):"—";
const dateL=s=>s?D(s).toLocaleDateString(locale(),{day:"numeric",month:"short",year:"numeric"}):"—";
const time=s=>D(s).toLocaleTimeString(locale(),{hour:"2-digit",minute:"2-digit"});
const iso=d=>{const x=D(d);return x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0")};
const addDays=(d,n)=>{const x=new Date(D(d));x.setDate(x.getDate()+n);return x};
const TODAY=new Date();TODAY.setHours(12,0,0,0);
const monthName=(m,short=true)=>new Date(2026,m,1).toLocaleDateString(locale(),{month:short?"short":"long"});
const initials=s=>String(s).split(/\s+/).filter(Boolean).slice(0,2).map(w=>w[0]).join("").toUpperCase();

/* ---------- seeded random ---------- */
function rng(seed){let a=seed>>>0;const r=()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
  r.int=(a,b)=>Math.floor(r()*(b-a+1))+a;r.pick=arr=>arr[Math.floor(r()*arr.length)];r.chance=p=>r()<p;return r;}

/* ---------- store ---------- */
const store={key:null,db:null,seed:null,
  init(key,seed){this.key=key;this.seed=seed;const raw=ls.get(key);let db=null;try{db=raw?JSON.parse(raw):null}catch(e){}
    if(!db||db.__v!==seed.version){db=seed.make();db.__v=seed.version;}this.db=db;this.save();return db;},
  save(){ls.set(this.key,JSON.stringify(this.db))},
  reset(){ls.del(this.key);this.db=this.seed.make();this.db.__v=this.seed.version;this.save();NV.db=this.db;}};
const uid=p=>p+Date.now().toString(36)+Math.random().toString(36).slice(2,6);

/* ---------- toast / modal ---------- */
function toast(msg){let w=$(".toasts");if(!w){w=document.createElement("div");w.className="toasts";document.body.appendChild(w)}
  const el=document.createElement("div");el.className="toast";el.innerHTML=icon("check")+"<span>"+esc(msg)+"</span>";w.appendChild(el);setTimeout(()=>{el.style.opacity="0";el.style.transition="opacity .3s";setTimeout(()=>el.remove(),300)},2600);}
function modal({title,body,actions=[],wide=false,onOpen}){
  const bg=document.createElement("div");bg.className="modal-bg";
  bg.innerHTML=`<div class="modal ${wide?"wide":""}" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modal-h"><h3>${esc(title)}</h3><button class="ibtn" data-x aria-label="${t("close")}">${icon("x")}</button></div><div class="modal-b"></div><div class="modal-f"></div></div>`;
  const b=$(".modal-b",bg);if(typeof body==="string")b.innerHTML=body;else if(body)b.appendChild(body);
  const close=()=>{bg.remove();document.removeEventListener("keydown",onKey)};
  const onKey=e=>{if(e.key==="Escape")close()};document.addEventListener("keydown",onKey);
  const f=$(".modal-f",bg);
  if(!actions.length)actions=[{label:t("close")}];
  actions.forEach(a=>{const btn=document.createElement("button");btn.className="btn "+(a.cls||(a.primary?"pri":""));btn.innerHTML=(a.icon?icon(a.icon):"")+esc(a.label);btn.onclick=()=>{if(a.onClick){if(a.onClick(close)===false)return;}close()};f.appendChild(btn)});
  if(!actions.length)f.remove();
  bg.addEventListener("mousedown",e=>{if(e.target===bg)close()});$("[data-x]",bg).onclick=close;
  document.body.appendChild(bg);const first=$("input,select,textarea",b);if(first)setTimeout(()=>first.focus(),50);if(onOpen)onOpen(b,close);return {el:bg,close,body:b};}
function confirmBox(msg,onYes,label){modal({title:t("confirm"),body:`<p style="margin:0">${esc(msg)}</p>`,actions:[{label:t("cancel")},{label:label||t("confirm"),primary:true,onClick:()=>{onYes()}}]});}

/* ---------- forms ---------- */
function form(fields,vals={}){
  const el=document.createElement("div");el.className="fg";
  el.innerHTML=fields.map(f=>{const id="f_"+f.k,v=vals[f.k]??f.def??"";
    let input;
    if(f.type==="select")input=`<select id="${id}" name="${f.k}">${(typeof f.options==="function"?f.options():f.options).map(o=>{const [val,lab]=Array.isArray(o)?o:[o,o];return `<option value="${esc(val)}" ${String(val)===String(v)?"selected":""}>${esc(L(lab))}</option>`}).join("")}</select>`;
    else if(f.type==="textarea")input=`<textarea id="${id}" name="${f.k}">${esc(v)}</textarea>`;
    else input=`<input id="${id}" name="${f.k}" type="${f.type||"text"}" value="${esc(v)}" ${f.step?`step="${f.step}"`:""} ${f.min!=null?`min="${f.min}"`:""} ${f.ph?`placeholder="${esc(f.ph)}"`:""}>`;
    return `<div class="fld ${f.full?"full":""}"><label for="${id}">${esc(f.label)}${f.req?' <span class="req">*</span>':""}</label>${input}</div>`}).join("");
  return {el,values(){const o={};let ok=true;fields.forEach(f=>{const x=$("#f_"+f.k,el);let v=x.value;if(f.type==="number")v=v===""?0:Number(v);if(f.req&&(v===""||v==null)){ok=false;x.style.borderColor="var(--bad)"}else x.style.borderColor="";o[f.k]=v});if(!ok)toast(t("req_err"));return ok?o:null}};
}
function formModal({title,fields,vals,onSave,wide}){const f=form(fields,vals);modal({title,body:f.el,wide,actions:[{label:t("cancel")},{label:t("save"),primary:true,icon:"check",onClick:()=>{const v=f.values();if(!v)return false;onSave(v)}}]});}

/* ---------- badges ---------- */
const badge=(label,tone="")=>`<span class="bd ${tone}">${esc(label)}</span>`;

/* ---------- table ---------- */
function table(host,cfg){
  const st={q:"",f:{},sort:cfg.sort||null,dir:cfg.dir||1,page:0,...(cfg.state||{})};const ps=cfg.pageSize||12;
  const wrap=document.createElement("div");wrap.className="card";host.appendChild(wrap);
  function rows(){let r=(typeof cfg.rows==="function"?cfg.rows():cfg.rows).slice();
    if(st.q){const q=st.q.toLowerCase();r=r.filter(x=>cfg.columns.some(c=>String(c.text?c.text(x):(x[c.k]??"")).toLowerCase().includes(q)))}
    (cfg.filters||[]).forEach(fl=>{const v=st.f[fl.k];if(v)r=r.filter(x=>String(fl.get?fl.get(x):x[fl.k])===v)});
    if(st.sort){const c=cfg.columns.find(c=>c.k===st.sort);const g=c&&c.sv?c.sv:(x=>x[st.sort]);r.sort((a,b)=>{const A=g(a),B=g(b);return (typeof A==="number"&&typeof B==="number"?A-B:String(A??"").localeCompare(String(B??""),locale(),{numeric:true}))*st.dir})}
    return r;}
  function draw(){const all=rows();const pages=Math.max(1,Math.ceil(all.length/ps));if(st.page>=pages)st.page=pages-1;const r=all.slice(st.page*ps,st.page*ps+ps);
    const foot=cfg.footer?cfg.footer(all):"";
    wrap.innerHTML=`<div class="tbar"><div class="srch">${icon("search")}<input type="search" placeholder="${t("search")}" value="${esc(st.q)}" aria-label="${t("search")}"></div>
      ${(cfg.filters||[]).map(fl=>`<select data-f="${fl.k}" aria-label="${esc(fl.label)}"><option value="">${esc(fl.label)}: ${t("all")}</option>${fl.options.map(o=>{const [v,l]=Array.isArray(o)?o:[o,o];return `<option value="${esc(v)}" ${st.f[fl.k]===String(v)?"selected":""}>${esc(L(l))}</option>`}).join("")}</select>`).join("")}
      <span class="sp"></span>${cfg.toolbar||""}<button class="btn sm" data-csv>${icon("download")}${t("export")}</button></div>
      <div class="tbl-w"><table class="t"><thead><tr>${cfg.columns.map(c=>`<th class="${c.nosort?"":"s"} ${c.r?"r":""}" data-k="${c.k}">${esc(c.label)}${st.sort===c.k?`<span class="ar">${st.dir>0?"▲":"▼"}</span>`:""}</th>`).join("")}</tr></thead>
      <tbody>${r.length?r.map((x,i)=>`<tr class="${cfg.onRow?"click":""}" data-i="${i}">${cfg.columns.map(c=>`<td class="${c.r?"num":""} ${c.cls||""}">${c.render?c.render(x):esc(x[c.k]??"")}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${cfg.columns.length}"><div class="empty">${t("empty")}</div></td></tr>`}</tbody>
      ${foot?`<tfoot>${foot}</tfoot>`:""}</table></div>
      <div class="pager"><span>${num(all.length)} ${t("rows")}${pages>1?` · ${st.page+1} ${t("of")} ${pages}`:""}</span><div class="pg"><button class="btn sm" data-p="-1" ${st.page===0?"disabled":""}>${t("prev")}</button><button class="btn sm" data-p="1" ${st.page>=pages-1?"disabled":""}>${t("next")}</button></div></div>`;
    const inp=$(".srch input",wrap);inp.oninput=()=>{st.q=inp.value;st.page=0;const pos=inp.selectionStart;draw();const ni=$(".srch input",wrap);ni.focus();try{ni.setSelectionRange(pos,pos)}catch(e){}};
    $$("[data-f]",wrap).forEach(s=>s.onchange=()=>{st.f[s.dataset.f]=s.value;st.page=0;draw()});
    $$("th.s",wrap).forEach(th=>th.onclick=()=>{const k=th.dataset.k;if(st.sort===k)st.dir*=-1;else{st.sort=k;st.dir=1}draw()});
    $$("[data-p]",wrap).forEach(b=>b.onclick=()=>{st.page+=Number(b.dataset.p);draw()});
    if(cfg.onRow)$$("tbody tr[data-i]",wrap).forEach(tr=>tr.onclick=e=>{if(e.target.closest("a,button,input,select"))return;cfg.onRow(r[Number(tr.dataset.i)])});
    $("[data-csv]",wrap).onclick=()=>{const cols=cfg.columns.filter(c=>!c.nocsv);const lines=[cols.map(c=>c.label)].concat(all.map(x=>cols.map(c=>c.text?c.text(x):(x[c.k]??""))));
      const csv=lines.map(l=>l.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(";")).join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["﻿"+csv],{type:"text/csv"}));a.download=(cfg.name||"export")+".csv";document.body.appendChild(a);a.click();a.remove();toast(t("export"))};
    if(cfg.after)cfg.after(wrap);}
  draw();return {redraw:draw,state:st,el:wrap};
}

/* ---------- charts ---------- */
let charts=[];
const css=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const PAL=()=>[css("--blue"),css("--blue-2"),"#7A5AF8","#12A06A","#D98200","#E0457B","#0FB5C9","#64739A"];
function chart(canvas,cfg){if(typeof Chart==="undefined")return null;
  const grid=css("--line-2"),ink=css("--muted");Chart.defaults.font.family=css("--f-body")||"Manrope";Chart.defaults.color=ink;
  const isArc=["doughnut","pie","polarArea"].includes(cfg.type);
  const opt={responsive:true,maintainAspectRatio:false,interaction:{mode:"index",intersect:false},
    plugins:{legend:{display:isArc||cfg.legend!==false&&cfg.data.datasets.length>1,position:isArc?"right":"top",labels:{boxWidth:10,boxHeight:10,usePointStyle:true,pointStyle:"circle",padding:14}},
      tooltip:{backgroundColor:css("--top"),titleColor:"#fff",bodyColor:"#DCE6FF",padding:10,cornerRadius:8,callbacks:cfg.money?{label:c=>" "+(c.dataset.label?c.dataset.label+": ":"")+money(c.parsed.y??c.parsed)}:{}}},
    scales:isArc?{}:{x:{grid:{display:false},ticks:{color:ink},stacked:!!cfg.stacked,border:{display:false}},y:{grid:{color:grid},border:{display:false},stacked:!!cfg.stacked,ticks:{color:ink,callback:v=>cfg.money?"$"+kfmt(v):kfmt(v)},beginAtZero:true}},...(cfg.options||{})};
  if(cfg.horizontal){opt.indexAxis="y";const x=opt.scales.x;opt.scales.x=opt.scales.y;opt.scales.y=x;opt.scales.x.grid={color:grid};opt.scales.y.grid={display:false};}
  const pal=PAL();cfg.data.datasets.forEach((d,i)=>{const c=d.color||pal[i%pal.length];
    if(isArc){d.backgroundColor=d.backgroundColor||cfg.data.labels.map((_,j)=>pal[j%pal.length]);d.borderWidth=2;d.borderColor=css("--surface")}
    else if((d.type||cfg.type)==="line"){d.borderColor=c;d.backgroundColor=d.fill?(ctx=>{const g=ctx.chart.ctx.createLinearGradient(0,0,0,ctx.chart.height);g.addColorStop(0,c+"55");g.addColorStop(1,c+"00");return g}):c;d.tension=.35;d.pointRadius=d.pointRadius??0;d.pointHoverRadius=5;d.borderWidth=2.4}
    else{d.backgroundColor=d.backgroundColor||c;d.borderRadius=6;d.maxBarThickness=34}});
  const ch=new Chart(canvas,{type:cfg.type,data:cfg.data,options:opt});charts.push(ch);return ch;}

/* ---------- router + shell ---------- */
const NV={$,$$,esc,icon,t,L,money,num,kfmt,date,dateL,time,iso,addDays,TODAY,monthName,initials,rng,store,uid,toast,modal,confirmBox,form,formModal,badge,table,chart,css,ls,
  get lang(){return LANG}, db:null, app:null,
  addI18n(d){Object.keys(d).forEach(l=>Object.assign(DICT[l]||(DICT[l]={}),d[l]))},
  go(h){location.hash=h},
  mount(app){this.app=app;this.db=store.init(app.storeKey,app.seed);
    const th=ls.get("nv-theme");if(th==="dark"||th==="light")document.documentElement.setAttribute("data-theme",th);
    document.documentElement.lang=LANG;
    window.addEventListener("hashchange",()=>this.render());this.render();},
  current:null,
  render(){const app=this.app;charts.forEach(c=>c.destroy());charts=[];
    const h=(location.hash||"#/").replace(/^#\/?/,"");const parts=h.split("?")[0].split("/").filter(Boolean);
    let match=null,params={};
    for(const [pat,fn] of app.routes){const pp=pat.split("/").filter(Boolean);if(pp.length!==parts.length)continue;let ok=true,pr={};pp.forEach((p,i)=>{if(p[0]===":")pr[p.slice(1)]=decodeURIComponent(parts[i]);else if(p!==parts[i])ok=false});if(ok){match=fn;params=pr;break}}
    if(!match){match=app.routes[0][1];}
    const modId=parts[0]||app.modules[0].id;const mod=app.modules.find(m=>m.id===modId)||app.modules[0];
    this.current={mod,parts,params};
    document.title=app.name+" · Nuvaryn";
    document.body.innerHTML=`
      <div class="ribbon">${icon("info")}<span>${t("demo_ribbon")}</span><button type="button" id="rst">${icon("refresh","i")} ${t("reset")}</button><a href="../index.html">${t("back_site")}</a></div>
      <header class="top">
        <button class="top-btn menu-t" id="mt" aria-label="${t("menu")}" style="align-self:center">${icon("menu")}</button>
        <a class="brand" href="#/"><img src="../logo/nuvaryn-isotipo.svg" alt=""><b>Nuvaryn</b><small>${app.short}</small></a>
        <nav class="mods" aria-label="Módulos">${app.modules.map(m=>`<a href="#/${m.id}" class="${m===mod?"on":""}">${icon(m.icon)}<span>${esc(L(m.label))}</span></a>`).join("")}</nav>
        <div class="top-r">
          <div class="gsearch">${icon("search")}<input id="gs" type="search" placeholder="${t("search_ph")}" aria-label="${t("search_ph")}" autocomplete="off"></div>
          <div class="seg" role="group" aria-label="${t("lang")}"><button data-l="es" aria-pressed="${LANG==="es"}">ES</button><button data-l="en" aria-pressed="${LANG==="en"}">EN</button></div>
          <button class="top-btn" id="thm" aria-label="${t("theme")}" title="${t("theme")}">${icon(this.isDark()?"sun":"moon")}</button>
          <button class="top-btn" id="ntf" aria-label="${t("notif")}" title="${t("notif")}">${icon("bell")}<span class="dot"></span></button>
          <div class="me"><div class="av">${app.user.ini}</div><span>${esc(app.user.name)}<small>${t("user_role")}</small></span></div>
        </div>
      </header>
      <div class="layout"><aside class="side" id="side"></aside><main class="main" id="main"></main></div>`;
    const side=$("#side");
    side.innerHTML=`<div class="mob"><h4>${esc(t("menu"))}</h4>${app.modules.map(m=>`<a href="#/${m.id}" class="${m===mod?"on":""}">${icon(m.icon)}<span>${esc(L(m.label))}</span></a>`).join("")}</div>`+(mod.menu||[]).map(sec=>`<h4>${esc(L(sec.t))}</h4>`+sec.items.map(it=>{const on=("#/"+parts.join("/"))===it.href||(it.match&&it.match(parts));return `<a href="${it.href||"#"}" class="${on?"on":""} ${it.newbtn?"new":""}" ${it.act?`data-act="${it.act}"`:""}>${icon(it.icon||"list")}<span>${esc(L(it.label))}</span>${it.count!=null?`<span class="cnt">${typeof it.count==="function"?it.count():it.count}</span>`:""}</a>`}).join("")).join("");
    $$("[data-act]",side).forEach(a=>a.onclick=e=>{e.preventDefault();app.actions[a.dataset.act]&&app.actions[a.dataset.act]()});
    $("#rst").onclick=()=>confirmBox(t("reset")+"?",()=>{store.reset();this.db=store.db;toast(t("reset_done"));this.render()},t("reset"));
    $$(".seg button").forEach(b=>b.onclick=()=>{LANG=b.dataset.l;ls.set("nv-lang",LANG);document.documentElement.lang=LANG;this.render()});
    $("#thm").onclick=()=>{const m=this.isDark()?"light":"dark";document.documentElement.setAttribute("data-theme",m);ls.set("nv-theme",m);this.render()};
    $("#ntf").onclick=()=>{const items=app.notifications?app.notifications():[];modal({title:t("notif"),body:`<ul class="list-mini" style="margin:-18px -20px">${items.map(n=>`<li><div class="l"><span class="kpi"><span class="ki ${n.tone||""}" style="width:34px;height:34px">${icon(n.icon||"bell")}</span></span><div><b>${esc(n.title)}</b><small>${esc(n.sub||"")}</small></div></div>${n.href?`<a class="btn sm" href="${n.href}" data-closem>${t("view")}</a>`:""}</li>`).join("")}</ul>`,onOpen:(b,close)=>$$("[data-closem]",b).forEach(a=>a.addEventListener("click",close))})};
    const mt=$("#mt");mt.onclick=()=>{side.classList.add("open");$$("a",side).forEach(a=>a.addEventListener("click",()=>{side.classList.remove("open");const sc=$(".scrim");if(sc)sc.remove()}));const s=document.createElement("div");s.className="scrim";s.onclick=()=>{side.classList.remove("open");s.remove()};document.body.appendChild(s)};
    // global search
    const gs=$("#gs");let res=null;gs.oninput=()=>{const q=gs.value.trim().toLowerCase();if(res)res.remove();if(q.length<2)return;
      const hits=(app.search?app.search():[]).filter(x=>(x.label+" "+(x.sub||"")).toLowerCase().includes(q)).slice(0,10);
      res=document.createElement("div");res.className="gres";res.innerHTML=hits.length?hits.map(x=>`<a href="${x.href}">${icon(x.icon||"file")}<div><b>${esc(x.label)}</b><small>${esc(x.sub||"")}</small></div></a>`).join(""):`<div class="empty" style="padding:16px">${t("no_results")}</div>`;
      gs.parentElement.appendChild(res);$$("a",res).forEach(a=>a.onclick=()=>{res.remove();gs.value=""})};
    gs.onblur=()=>setTimeout(()=>{if(res)res.remove()},200);
    const main=$("#main");match(main,params);window.scrollTo(0,0);},
  isDark(){const a=document.documentElement.getAttribute("data-theme");return a?a==="dark":matchMedia("(prefers-color-scheme: dark)").matches},
  /* page header helper */
  head(main,{crumbs=[],icon:ic="file",title,sub="",actions=""}){const el=document.createElement("div");
    el.innerHTML=`<div class="crumb">${[`<a href="#/">${esc(this.app.name)}</a>`].concat(crumbs.map(c=>Array.isArray(c)?`<a href="${c[1]}">${esc(c[0])}</a>`:esc(c))).join(" <span>›</span> ")}</div>
    <div class="ph"><div class="tt"><span class="ic">${icon(ic)}</span><div style="min-width:0"><h1>${esc(title)}</h1>${sub?`<div class="sub">${sub}</div>`:""}</div></div><div class="acts">${actions}</div></div>`;
    while(el.firstChild)main.appendChild(el.firstChild);},
  el(html){const d=document.createElement("div");d.innerHTML=html.trim();return d.childElementCount===1?d.firstElementChild:d},
  kpi(ic,label,value,tone="",delta=""){return `<div class="card kpi"><span class="ki ${tone}">${icon(ic)}</span><div style="min-width:0"><small>${esc(label)}</small><b>${value}</b>${delta?`<span class="d ${delta.startsWith("-")?"down":"up"}">${esc(delta)}</span>`:""}</div></div>`},
  tabs(host,list,onChange,active){const bar=document.createElement("div");bar.className="tabs";const body=document.createElement("div");host.appendChild(bar);host.appendChild(body);
    const sel=id=>{$$("button",bar).forEach(b=>b.classList.toggle("on",b.dataset.id===id));body.innerHTML="";onChange(id,body)};
    bar.innerHTML=list.map(x=>`<button data-id="${x.id}">${x.icon?icon(x.icon):""}${esc(x.label)}${x.count!=null?` <span class="cnt">${x.count}</span>`:""}</button>`).join("");
    $$("button",bar).forEach(b=>b.onclick=()=>sel(b.dataset.id));sel(active||list[0].id);},
};
window.NV=NV;
})();
