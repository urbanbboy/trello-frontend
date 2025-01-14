import { RootState } from "@/app/providers/store";


export const getCurrentUser = (state: RootState) => state.user.user
export const getCurrentUserEmail = (state: RootState) => state.user.user?.email
export const getCurrentUserId = (state: RootState) => state.user.user?.id
export const getCurrentUserUsername = (state: RootState) => state.user.user?.username