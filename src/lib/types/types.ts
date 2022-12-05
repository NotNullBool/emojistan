import {
  CONDITION_BG,
  CONTAINER_W,
  EVENT_BG,
  EVENT_H,
  EVENT_W,
} from "$src/constants";
import type { XYPosition, Position } from "./utils";

export type NodeComponent = "container" | "condition" | "event" | "spawner";

export interface Node<T = any> {
  id: number;
  component: NodeComponent;
  position: XYPosition;
  data: T;
  width: number;
  height: number;
  bgColor?: string;
  fontSize?: number;
  borderColor?: string;
  borderRadius?: number;
  textColor?: string;
  clickCallback?: Function;
  image?: boolean;
  src?: string;
  sourcePosition?: "left" | "right" | "top" | "bottom";
  targetPosition?: "left" | "right" | "top" | "bottom";
}

export class Node<T = any> {
  constructor(
    id: number,
    component: NodeComponent,
    position: { x: number; y: number },
    receiver: boolean
  ) {
    this.id = id;
    this.component = component;
    this.position = position;

    switch (component) {
      case "spawner":
      case "condition":
      case "event":
        this.width = EVENT_W;
        this.height = EVENT_H;
        break;
      case "container":
        this.width = CONTAINER_W;
        this.height = CONTAINER_W;
        break;
    }

    switch (component) {
      case "spawner":
      case "condition":
        this.borderColor = "#cfc0e3";
        this.bgColor = CONDITION_BG;
        break;
      case "event":
        this.borderColor = "#f6fafd";
        this.bgColor = EVENT_BG;
        break;
      case "container":
        this.borderColor = "#f6fafd";
        this.bgColor = "#ffc83d";
        break;
    }

    if (component == "spawner") return;

    if (receiver) {
      this.targetPosition = "left";
    } else {
      this.sourcePosition = "right";
    }
  }
}

export interface Edge {
  id: string;
  source: number;
  target: number;
  label?: string;
  labelBgColor?: string;
  labelTextColor?: string;
  edgeColor?: string;
  type?: string;
  animate?: boolean;
  noHandle?: boolean;
  arrow?: boolean;
}

export interface DerivedEdge extends Edge {
  sourceX: number;
  sourceY: number;
  sourcePosition: Position;
  targetX: number;
  targetY: number;
  targetPosition: Position;
}

export interface EdgeProps extends DerivedEdge {
  path: string;
  centerX: number;
  centerY: number;
}

export interface EdgeTextProps {
  label?: any;
  labelBgColor?: string;
  labelTextColor?: string;
  centerX: number;
  centerY: number;
}

export type HandleType = "source" | "target";
