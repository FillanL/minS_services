import { Request, Response, NextFunction} from 'express';


// test case for: post_service/src/middlewares/index.ts
// Language: typescript
// Path: post_service/src/test/unit/middlewares/index.spec.ts
// test axios request to get all posts  
export function getAllPostsTest(req: Request, res: Response, next: NextFunction) {
    // mock
    // mock.post('/api/post/getAllPosts', {
    //     "code": 0,
    //     "data": [
    //         {
    //             "id": 1,
    //             "title": "test",
    //             "content": "test",
    //             "author": "test",
    //             "createTime": "2017-01-01",
    //             "updateTime": "2017-01-01"
    //         }
    //     ]
    // });
    // mock.post('/api/post/getAllPosts', {
    //     "code": 0,
    //     "data": [
    //         {
    //             "id": 1,
    //             "title": "test",
    //             "content": "test",
    //             "author": "test",
    //             "createTime": "2017-01-01",
    //             "updateTime": "2017-01-01"
    //         }
    //     ]
    // });
    // mock.post('/api/post/getAllPosts', {
    //     "code": 0,
    //     "data": [
    //         {
    //             "id": 1,
    //             "title": "test",
    //             "content": "test",
    //             "author": "test",
    //             "createTime": "2017-01-01",
    //             "updateTime": "2017-01-01"
    //         }
    //     ]
    // });
}
// describe("get posts", ()=>{
//     it("should return a list of posts", ()=>{
//         return axios.get(`${baseUrl}/posts`).then((response: Response) =>{
//             expect(response.data.length).toBeGreaterThan(0)
//         })
//     })
// }

// test case for: post_service/src/controllers/postContoller.ts
// Language: typescript
// Path: post_service/src/test/unit/controllers/postController.spec.ts
// creat mock test for Post request to post/allPosts route
// export function getAllPostsTest(req: Request, res: Response, next: NextFunction) {

// }