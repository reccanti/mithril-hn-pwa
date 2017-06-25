import m from "mithril";

/**
 * A model to store the Top Stories list
 */
const topstories = {
    list: [],
    loadList: async () => {
        topstories.list = await m.request({
            method: "GET",
            url: "http://localhost:8000/api/"
        });
    }
};

export default topstories;