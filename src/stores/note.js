export default {
    namespaced: true,
    state: {
        notes: JSON.parse(localStorage.getItem('notes'))
    },
    mutations: {
        getItem(state) {
            state.notes = JSON.parse(localStorage.getItem('notes'))
        },
        updateNote(state, payload) {

            const newObj = state.notes;
            const index = state.notes.findIndex((note) => {
                return note.id == payload.id
            })

            newObj.splice(index, 1)
            newObj.unshift(payload)
            console.log(newObj);
            localStorage.setItem('notes', JSON.stringify(newObj));
        },
        deleteNote(state, id) {
            const newObj = state.notes;
            const index = state.notes.findIndex((note) => {
                return note.id == id
            })

            newObj.splice(index, 1)
            localStorage.setItem('notes', JSON.stringify(newObj));
        },
        setItem(state) {

            const obj = [{
                id: '12asdsad',
                title: 'Judul Satu',
                body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo minus, earum aliquid accusantium, nam a voluptatibus neque cumque perferendis natus provident sit sapiente necessitatibus? Enim nisi amet beatae tempore odit minima dolorem corporis, corrupti impedit.'
            }, {
                id: '13asdsad',
                title: 'Judul Dua',
                body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. consectetur, ad Explicabo minus, earum aliquid accusantium, nam a voluptatibus neque cumque perferendis natus provident sit sapiente necessitatibus? Enim nisi amet beatae tempore odit minima dolorem corporis, corrupti impedit.'
            }, {
                id: '14asdsad',
                title: 'Judul Tiga',
                body: 'Lorem ipsum dolor sit amet rovident sit sapient consectetur, adipisicing elit. Explicabo minus, earum aliquid accusantium, nam a voluptatibus neque cumque perferendis natus provident sit sapiente necessitatibus? Enim nisi amet beatae tempore odit minima dolorem corporis, corrupti impedit.'
            }]
            localStorage.setItem('notes', JSON.stringify(obj))
            state.notes = JSON.parse(localStorage.getItem('notes'))
        }
    }
}