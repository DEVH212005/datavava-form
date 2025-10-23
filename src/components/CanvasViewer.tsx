import React from "react";
import { startTransition, useEffect, useRef, useState } from "react";
import { MediaLogic, type CanvasSize } from "./CanvasViewerLogic";
import { useShortcut } from "./useShortcut";
import "./canvas-viewer.scss";
import { Button } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

interface Props {
  width?: number;
  height?: number;
  src: string;
}

export default function CanvasViewer({ src, width, height }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({
    width: 0,
    height: 0,
  });
  const logicRef = useRef<MediaLogic | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const resize = () => {
      const rect = canvasRef.current?.parentElement?.getBoundingClientRect();
      if (rect) setCanvasSize({ width: rect.width, height: rect.height });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (!canvasSize.height || !canvasSize.height) return;

    const logic = new MediaLogic(canvasSize, width, height);
    logic.canvas = canvasRef.current;
    logic.loadImage(src, () => {
      logic.fitImageToCanvas();
    });
    logicRef.current = logic;

    // Event listeners
    const canvas = canvasRef.current;
    const handleWheel = (e: WheelEvent) => logic.handleWheel(e);
    const handleMouseDown = (e: MouseEvent) => {
      startTransition(() => {
        logic.handleMouseDown(e);
        setIsDragging(true);
      });
    };

    const handleMouseMove = (e: MouseEvent) => logic.handleMouseMove(e);

    const handleMouseUp = (e: MouseEvent) => {
      logic.handleMouseUp();
      setIsDragging(false);
    };

    canvas.addEventListener("wheel", handleWheel);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseUp);

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [canvasSize, src]);

  useShortcut([
    {
      title: "Ctrl+X",
      key: ["Control", "x"],
      callback: () => console.log("Ctrl+x"),
    },
    {
      title: "Ctrl+N+V",
      key: ["Shift", "Control", "A"],
      callback: () => console.log("Shift+Control+A"),
    },
    {
      title: "Ctrl+Shift+R",
      key: ["Control", "Shift", "A"],
      callback: () => console.log("Ctrl+Shift+A"),
    },
    { title: "Alt+A", key: ["Alt", "a"], callback: () => console.log("Alt+A") },
    { title: "F1", key: ["F1"], callback: () => console.log("F1") },
  ]);

  return (
    <div className="canvas-wrapper">
      <canvas
        ref={canvasRef}
        className={`canvas-element ${isDragging ? "dragging" : ""}`}
      />
      <div className="canvas-controls">
        <Button size="small" onClick={() => logicRef.current?.zoomInCenter()}>
          +
        </Button>
        <Button size="small" onClick={() => logicRef.current?.zoomOutCenter()}>
          -
        </Button>
        <Button
          size="small"
          onClick={() => logicRef.current?.fitImageToCanvas()}
        >
          Reset
        </Button>
        <Button icon={<FileTextOutlined />} size="small" type="primary">
          SOP
        </Button>
      </div>
    </div>
  );
}
