import { atom } from "recoil";

export const notes_app = atom({
    key: 'notes',
    default: [],
})

export const note_name_app = atom({
    key: 'note_name',
    default: '',
})

export const note_description_app = atom({
    key: 'note_description',
    default: '',
})