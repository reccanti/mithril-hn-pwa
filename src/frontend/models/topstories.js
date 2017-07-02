import m from "mithril";
import 'isomorphic-fetch';

/**
 * A model to store the Top Stories list
 */
const topstories = {
    list: [],
    loadList: async () => {
        try {
            const res = await fetch("http://localhost:8000/api/", { method: "GET" });
            const json = await res.json();
            topstories.list = json;
            m.redraw();
        } catch (e) {
            console.error(e);
            topstories.list = [];
        }
    }
};

export default topstories;