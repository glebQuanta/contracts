import {create} from 'zustand';

export const useStore = create((set) => ({
    account: null,
    setAccount: (account) => set({account}),
}));
