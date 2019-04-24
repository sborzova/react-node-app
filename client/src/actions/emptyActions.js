import * as actionTypes from '../constants/actions';

// function newsItemReceived(newsItem){
//     return {
//         type: actionTypes.NEWSITEM_RECEIVED,
//         newsItem: newsItem
//     }
// }
//
// function newsReceived(news){
//     return {
//         type: actionTypes.NEWS_RECEIVED,
//         news: news
//     }
// }
//
// export function fetchNews(){
//     return dispatch => {
//         return fetch(`/news`)
//             .then( (response) => response.json() )
//             .then( (data) => dispatch(newsReceived(data.data)))
//             .catch( (e) => console.log(e) );
//     }
// }
//
// export function fetchList() {
//     return dispatch => {}
// }
//
// export function fetchNewsItem(id){
//     return dispatch => {
//         return fetch(`/news/${id}`)
//             .then( (response) => response.json() )
//             .then( (data) => dispatch(newsItemReceived(data.data)))
//             .catch( (e) => console.log(e) );
//     }
// }
//
