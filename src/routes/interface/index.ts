import React from "react";

export interface MetaProps {
  keepAlive?: boolean;
  requiresAuth?: boolean;
  title: string;
  key?: string;
}

export interface RouteObject {
  meta?: MetaProps;
  element?: React.ReactNode;
  path?: string;
  children?: RouteObject[];
}

export interface IMenuObject {
  active: boolean;
  title: string;
  element: React.ReactElement;

}