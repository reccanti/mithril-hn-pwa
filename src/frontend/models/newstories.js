import m from "mithril";

/**
 * A model to store the New Stories list
 */
const newstories = {
    list: [],
    loadList: async () => {
        newstories.list = await m.request({
            method: "GET",
            url: "http://localhost:8000/api/newstories"
        });
    }
};

export default newstories;