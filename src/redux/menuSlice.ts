import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
    openMenu: string | null;
    loading: boolean;
}

const initialState: MenuState = {
    openMenu: 'dashboard',
    loading: false,
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setOpenMenu: (state, action: PayloadAction<string | null>) => {
            state.openMenu = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setOpenMenu, setLoading } = menuSlice.actions;
export default menuSlice.reducer;
