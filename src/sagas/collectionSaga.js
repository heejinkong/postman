import axios from "axios";
import history from "../utils/history";

export function* registerCollectionAsync(action) {
    const data = action.payload;

    yield axios.post(`http://localhost:4000/collection/`,data);

    history.go(0);
}