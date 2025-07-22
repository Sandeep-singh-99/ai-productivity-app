import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice.ts';
import planSlice from './slice/planSlice.ts'
import blogSlice from './slice/blogSlice.ts'; 
import articleSlice from './slice/articleSlice.ts';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        plans: planSlice,
        blogs: blogSlice,
        articles: articleSlice,
    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch