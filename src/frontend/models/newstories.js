import m from "mithril";

/**
 * A model to store the New Stories list
 */
const newstories = {
    list: [],
    loadList: async () => {
        return await m.request({
            method: "GET",
            background: true,
            url: "http://localhost:8000/api/newstories"
        });
    }
};

export default newstories;