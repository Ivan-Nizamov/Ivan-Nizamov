/* ---------- 1) Background glyph matrix (efficient canvas) ---------- */
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-=<>/*πλψΩφβκσґЖЯƒψνµ∆Σ';
let w, h, cols, rows, cell, t = 0;

function resize(){
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width  = Math.floor(innerWidth * dpr);
  canvas.height = Math.floor(innerHeight * dpr);
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
  cell = Math.max(14, Math.min(22, innerWidth/50));
  cols = Math.ceil(innerWidth / cell);
  rows = Math.ceil(innerHeight / cell);
}
resize(); addEventListener('resize', resize);

function randGlyph(){ return glyphs[(Math.random() * glyphs.length)|0]; }

const grid = [];
for(let y=0;y<2000;y++) grid.push(randGlyph());

let last = 0;
function frame(ms){
  const dt = Math.min(60, ms - last); last = ms; t += dt;
  if (t < 50) { requestAnimationFrame(frame); return; } // ~20 fps cap
  t = 0;

  ctx.clearRect(0,0,innerWidth,innerHeight);

  // subtle gradient wash behind tiles
  const g = ctx.createLinearGradient(0,0,innerWidth,innerHeight);
  g.addColorStop(0,'rgba(60,120,255,0.08)');
  g.addColorStop(1,'rgba(140,60,255,0.06)');
  ctx.fillStyle = g; ctx.fillRect(0,0,innerWidth,innerHeight);

  ctx.font = `${cell-2}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
  ctx.textBaseline = 'top';
  for(let y=0;y<rows;y++){
    for(let x=0;x<cols;x++){
      // mutate ~1% of glyphs per frame
      if (Math.random() < 0.01) grid[(y*cols + x) % grid.length] = randGlyph();
      const ch = grid[(y*cols + x) % grid.length];
      ctx.fillStyle = 'rgba(180,220,255,0.10)';
      ctx.fillText(ch, x*cell, y*cell);
    }
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

/* ---------- 2) QR code with face/logo ---------- */
const qr = new QRCodeStyling({
  width: 160, height: 160,
  type: "canvas",
  data: location.origin + "/resume.pdf",
  image: "assets/placeholder-face.svg",
  dotsOptions: { type: "rounded", color: "#E8F3FF" },
  cornersSquareOptions: { type: "extra-rounded", color: "#E8F3FF" },
  backgroundOptions: { color: "transparent" },
  imageOptions: { crossOrigin: "anonymous", margin: 4, imageSize: 0.26 }, // keep <30%
  qrOptions: { errorCorrectionLevel: "H" }
});
qr.append(document.getElementById("qr"));
