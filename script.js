/* ===== YOUR WORK LIST =====
   Add, remove or edit items here. Each item has:
   t     = title
   k     = "render" or "animation" (used by the filter buttons)
   d     = short description
   c     = placeholder colors (used when there is no image)
   img   = (optional) image file, e.g. "images/neon-alley.jpg"
   video = (optional) YouTube video ID, e.g. "dQw4w9WgXcQ"
           (the part after v= in the YouTube link)
*/
const works = [
  { t: "Ground Up", k: "animation", d: "Blender animation", c: "#d4a017,#1a1408", video: "CXJU1yeT_pU", img: "https://img.youtube.com/vi/CXJU1yeT_pU/hqdefault.jpg" },

  { t: "Meomory of a loved one.",     k: "render",    d: "Cycles, 4K still",       c: "#d4a017,#1a1408", img: "images/Skull_1080p.png"},

  { t: "Waves", k: "animation", d: "Loop", c: "#8a6a10,#0a0a0a", video: "Q45jcbPekY0", img: "https://img.youtube.com/vi/Q45jcbPekY0/hqdefault.jpg" },

  { t: "Glass Bars",  k: "render",    d: "Product-style lighting", c: "#f5c84c,#5a4410", img: "images/Glass_Bars.png" },

  { t: "Artifact",    k: "animation", d: "Geometry Nodes",         c: "#b8860b,#2a1f06", video: "ylle1E2LayI", img: "https://img.youtube.com/vi/ylle1E2LayI/hqdefault.jpg" },
  
  { t: "Toy Vent",   k: "render",    d: "Environment scene",      c: "#6b5410,#0f0d08", img: "images/Toy_Vent.png" },
  
  { t: "Box Rain",    k: "animation", d: "Motion graphics",        c: "#fff1b8,#a67c00", video: "eNSCdxTVPU0", img: "https://img.youtube.com/vi/eNSCdxTVPU0/hqdefault.jpg" }
];

const grid = document.getElementById("grid");
const dlg = document.getElementById("dlg");
const big = document.getElementById("dBig");

function background(w) {
  return w.img ? "url('" + w.img + "')" : "linear-gradient(135deg," + w.c + ")";
}

works.forEach(function (w) {
  const b = document.createElement("button");
  b.className = "tile";
  b.dataset.k = w.k;
  b.innerHTML = '<div class="thumb"></div><div class="cap"><b></b><span></span></div>';
  const thumb = b.querySelector(".thumb");
  thumb.style.background = background(w);
  thumb.style.backgroundSize = "cover";
  thumb.style.backgroundPosition = "center";
  if (!w.img) thumb.textContent = (w.k === "animation" ? "Animation" : "Render") + " placeholder";
  b.querySelector("b").textContent = w.t;
  b.querySelector("span").textContent = w.d;

  b.onclick = function () {
    big.innerHTML = "";
    big.style.background = background(w);
    big.style.backgroundSize = "cover";
    big.style.backgroundPosition = "center";
    if (w.video) {
      big.innerHTML = '<iframe src="https://www.youtube.com/embed/' + w.video +
        '" allow="accelerometer; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="' + w.t + '"></iframe>';
    } else if (!w.img) {
      big.textContent = "Add your " + (w.k === "animation" ? "video" : "image") + " in script.js";
    }
    document.getElementById("dT").textContent = w.t;
    document.getElementById("dD").textContent = w.d;
    dlg.showModal();
  };
  grid.appendChild(b);
});

/* Filter buttons */
document.querySelectorAll(".filters button").forEach(function (btn) {
  btn.onclick = function () {
    document.querySelectorAll(".filters button").forEach(function (x) {
      x.setAttribute("aria-pressed", x === btn);
    });
    grid.querySelectorAll(".tile").forEach(function (t) {
      t.hidden = btn.dataset.f !== "all" && t.dataset.k !== btn.dataset.f;
    });
  };
});

/* Close popup (and stop any playing video) */
function closeDialog() { dlg.close(); big.innerHTML = ""; }
document.getElementById("close").onclick = closeDialog;
dlg.addEventListener("click", function (e) { if (e.target === dlg) closeDialog(); });
dlg.addEventListener("cancel", function () { big.innerHTML = ""; });
