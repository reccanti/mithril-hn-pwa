import m from "mithril";

/**
 * A model to store the Top Stories list
 */
const topstories = {
    list: [],
    loadList: async () => {
        return await m.request({
            method: "GET",
            background: true,
            url: "http://localhost:8000/api/"
        });
    }
};

export default topstories;