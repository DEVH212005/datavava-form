import "./canvas-viewer.scss";

import React from "react";
import { Button, Modal } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { startTransition, useEffect, useRef, useState } from "react";

import { MediaLogic, type CanvasSize } from "./CanvasViewerLogic";

import { useShortcut } from "./useShortcut";

import SOP_IMG from "../assets/SOP.png"

interface Props {
  width?: number;
  height?: number;
  src: string;
}

export default function CanvasViewer({ src, width, height }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        <Button
          icon={<FileTextOutlined />}
          size="small"
          type="primary"
          onClick={() => setIsModalVisible(true)}
        >
          SOP
        </Button>

        <Modal
          title="SOP Hướng Dẫn"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          centered
          width={700}
        >
          <img
            src={SOP_IMG}
            alt="SOP"
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Modal>
      </div>
    </div>
  );
}
