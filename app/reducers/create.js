const initialState = {
    isNew: false,
    student: {
        first_name: "",
        last_name: "",
        age: "",
        grade: "",
        email: ""
    }
};

export default function create(state = initialState, action) {
    return initialState;
}
