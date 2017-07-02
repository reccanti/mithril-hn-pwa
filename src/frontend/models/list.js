import m from "mithril";
import 'isomorphic-fetch';

/**
 * A factory class that defines an object that fetches
 * data from an endpoint and stores it in a list;
 */
class List {

    /**
     * @param {string} endpoint - a url that references the API endpoint we will
     * fetch data from
     */
    constructor(endpoint) {
        this.endpoint = endpoint;
        this.list = [];
    }

    /**
     * Load the list from the specified endpoint
     */
    async loadList() {
        try {
            const res = await fetch(this.endpoint, { method: "GET" });
            const json = await res.json();
            this.list = json;
            m.redraw();
        } catch (e) {
            console.error(e);
            this.list = [];
        }
    }


}
// function listModel(endpoint) {
//     return {
//         list: [],
//         loadList: async () => {
//             try {
//                 const res = await fetch(endpoint, { method: "GET" });
//                 const json = await res.json();
//                 this.list = json;
//                 m.redraw();
//             } catch (e) {
//                 console.error(e);
//                 this.list = [];
//             }
//         }
//     }
// }

// const topstories = {
//     list: [],
//     loadList: async () => {
//         try {
//             const res = await fetch("http://localhost:8000/api/", { method: "GET" });
//             const json = await res.json();
//             topstories.list = json;
//             m.redraw();
//         } catch (e) {
//             console.error(e);
//             topstories.list = [];
//         }
//     }
// };

export default List;