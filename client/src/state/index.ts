import { Tab, Table, User } from "../types/server";
import { createDocSyncState, createDocsSyncState } from "./createSyncStore";

export const useAuth = createDocSyncState<User>();
export const useTables = createDocsSyncState<Table>();
export const useTabs = createDocsSyncState<Tab>();
