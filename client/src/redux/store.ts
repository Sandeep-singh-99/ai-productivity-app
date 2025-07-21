import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice.ts';
import planSlice from './slice/planSlice.ts'
import blogSlice from './slice/blogSlice.ts'; // Import the blogSlice

export const store = configureStore({
    reducer: {
        auth: authSlice,
        plans: planSlice,
        blogs: blogSlice,
    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch