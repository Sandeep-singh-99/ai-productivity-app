import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice.ts';
import planSlice from './slice/planSlice.ts'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        plans: planSlice
    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch