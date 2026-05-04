/* eslint-disable */
import {
  ActionCtx as GenericActionCtx,
  MutationCtx as GenericMutationCtx,
  QueryCtx as GenericQueryCtx,
  ApiAndInternalApi,
} from "convex/server";
import { DataModel } from "./dataModel";

export type ActionCtx = GenericActionCtx<DataModel>;
export type MutationCtx = GenericMutationCtx<DataModel>;
export type QueryCtx = GenericQueryCtx<DataModel>;

export declare function query<Args extends Record<string, any>, Return>(
  definition: { args?: Args; handler: (ctx: QueryCtx, args: any) => Promise<Return> | Return }
): any;

export declare function mutation<Args extends Record<string, any>, Return>(
  definition: { args?: Args; handler: (ctx: MutationCtx, args: any) => Promise<Return> | Return }
): any;

export declare function action<Args extends Record<string, any>, Return>(
  definition: { args?: Args; handler: (ctx: ActionCtx, args: any) => Promise<Return> | Return }
): any;

export declare const internalMutation: typeof mutation;
export declare const internalQuery: typeof query;
export declare const internalAction: typeof action;
