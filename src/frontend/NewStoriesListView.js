// import m from "mithril"
// import ListView from "./ListView"
// import NewStories from "./NewStoriesList"

// /**
//  * A mithril component that uses the list view to 
//  * display the New Stories
//  */
// const NewStoriesListView = {
//     oninit: () => {
//         NewStories.loadList()
//     },
//     view: vnode => {
//         const items = NewStories.list;
//         return [
//             <ListView list={items} />
//         ]
//     }
// }
// export default NewStoriesListView