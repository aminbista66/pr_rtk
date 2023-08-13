import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  getPostError,
  getPostStatus,
  selectAllPosts,
  AsyncThunkAction,
} from "@/redux/postSlice";

type Props = {};

const index = (props: Props) => {
  const dispatch: any = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostStatus);
  const postError = useSelector(getPostError);

  const fetchPostsHandler = () => {
    dispatch(fetchPosts());
  };

  return (
    <div className={postStatus === "succeeded" ? "flex flex-col justify-start items-start" : "flex flex-col justify-center items-center"}>
      <div className="flex items-center justify-center w-full">

      <button
        onClick={fetchPostsHandler}
        className="border border-gray-700 py-2 px-4 hover:text-white hover:bg-gray-700 cursor-pointer active:bg-gray-900 duration-150"
        >
        Refresh
      </button>
        </div>
      {postStatus === "loading" ? (
        <div className="max-w-[500px] p-8 mt-[50px] border border-gray-700 rounded-lg flex justify-center items-center">Loading...</div>
      ) : postStatus === "failed" ? (
        <div className="max-w-[500px] p-8 mt-[50px] border border-gray-700 rounded-lg flex justify-center items-center">{postError}</div>
      ) : (
        <>
          {posts.map((post) => {
            return (
              <div key={post.id} className="py-[20px] px-2">
                <h2 className="font-semibold text-2xl text-gray-800">
                  {post.title}
                </h2>
                <p>{post.body}</p>
                <div className="bg-gray-300 h-[1px] w-full"></div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default index;
