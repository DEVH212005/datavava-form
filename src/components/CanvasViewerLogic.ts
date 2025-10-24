export interface Translate {
  x: number;
  y: number;
}

export interface CanvasSize {
  width: number;
  height: number;
}

export class MediaLogic {
  img: HTMLImageElement | null = null;
  canvas: HTMLCanvasElement | null = null;

  scale = 1;
  translating: Translate = { x: 0, y: 0 };
  lastTranslate: Translate = { x: 0, y: 0 };

  isDragging = false;
  dragStart: Translate | null = null;

  minScale = 0.1;
  maxScale = 10;
  zoomFactor = 1.2;

  constructor(
    public canvasSize: CanvasSize,
    public width?: number,
    public height?: number
  ) { }

  loadImage(src: string, callback: () => void) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      this.img = img;
      callback();
    };
  }

  fitImageToCanvas() {
    if (!this.canvas || !this.img) return;

    // canva sizes
    const cw = this.canvasSize.width;
    const ch = this.canvasSize.height;

    // image sizes
    const iw = this.width || this.img.naturalWidth;
    const ih = this.height || this.img.naturalHeight;

    let s = 1;
    if (iw > cw || ih > ch) s = Math.min(cw / iw, ch / ih);
    this.scale = s;

    const tx = (cw - iw * s) / 2;
    const ty = (ch - ih * s) / 2;
    this.translating = { x: tx, y: ty };
    this.lastTranslate = { x: tx, y: ty };

    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = cw * dpr;
    this.canvas.height = ch * dpr;
    this.canvas.style.width = `${cw}px`;
    this.canvas.style.height = `${ch}px`;

    this.draw();
  }

  clampTranslate(tx: number, ty: number, s: number): Translate {
    if (!this.canvas || !this.img) return { x: tx, y: ty };
    const cw = this.canvasSize.width;
    const ch = this.canvasSize.height;
    const iw = (this.width || this.img.naturalWidth) * s;
    const ih = (this.height || this.img.naturalHeight) * s;

    const minX = Math.min(0, cw - iw);
    const maxX = Math.max(0, cw - iw);
    const minY = Math.min(0, ch - ih);
    const maxY = Math.max(0, ch - ih);

    return {
      x: Math.min(maxX, Math.max(minX, tx)),
      y: Math.min(maxY, Math.max(minY, ty)),
    };
  }

  draw() {
    if (!this.canvas || !this.img) return;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const s = this.scale * dpr;
    const tx = this.translating.x * dpr;
    const ty = this.translating.y * dpr;

    ctx.setTransform(s, 0, 0, s, tx, ty);
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width || this.img.naturalWidth,
      this.height || this.img.naturalHeight
    );
  }

  zoomAt(clientX: number, clientY: number, factor: number) {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();

    const cx = clientX - rect.left;
    const cy = clientY - rect.top;

    const worldX = (cx - this.translating.x) / this.scale;
    const worldY = (cy - this.translating.y) / this.scale;

    const newScale = Math.max(this.minScale, Math.min(this.maxScale, this.scale * factor));
    let newTx = cx - worldX * newScale;
    let newTy = cy - worldY * newScale;

    const clamped = this.clampTranslate(newTx, newTy, newScale);
    this.scale = newScale;
    this.translating = clamped;
    this.lastTranslate = { ...clamped };
    this.draw();
  }

  handleWheel(e: WheelEvent) {
    e.preventDefault();
    const factor = e.deltaY < 0 ? this.zoomFactor : 1 / this.zoomFactor;
    this.zoomAt(e.clientX, e.clientY, factor);
  }

  handleMouseDown(e: MouseEvent) {
    this.isDragging = true;
    this.dragStart = { x: e.clientX, y: e.clientY };
  }

  handleMouseMove(e: MouseEvent) {
    if (!this.isDragging || !this.dragStart) return;
    const dx = e.clientX - this.dragStart.x;
    const dy = e.clientY - this.dragStart.y;

    const newTx = this.lastTranslate.x + dx;
    const newTy = this.lastTranslate.y + dy;

    this.translating = this.clampTranslate(newTx, newTy, this.scale);
    this.draw();
  }

  handleMouseUp() {
    this.isDragging = false;
    this.lastTranslate = { ...this.translating };
  }

  zoomInCenter() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, this.zoomFactor);
  }

  zoomOutCenter() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, 1 / this.zoomFactor);
  }
}
